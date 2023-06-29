# 导入常用的包
# 即使在python2.X，使用print就得像python3.X那样加括号使用
from __future__ import print_function
# kmeans聚类
from sklearn.cluster import KMeans
# 数据处理
import pandas as pd
# 连接数据库
import pymysql
from sqlalchemy import create_engine
import warnings
import numpy as np
# 查看python解释器信息及传递信息给python解释器
import sys

warnings.filterwarnings("ignore")


def runkmeans(sup, conf):
    # 打开数据库连接，db为数据库名称
    db = pymysql.connect(host="localhost",
                         user="root",
                         passwd="root",
                         db="breastcancer")

    # 定义获取数据库数据的函数
    def get_df_from_db(sql):
        # 创建游标对象cursor
        cursor = db.cursor()
        # 执行SQL语句
        cursor.execute(sql)
        # 查询内容
        data = cursor.fetchall()
        # 得到域的名字
        columnDes = cursor.description
        # 获取列名
        columnNames = [columnDes[i][0] for i in range(len(columnDes))]
        # 创建DataFrame，存放查询到的数据
        df = pd.DataFrame([list(i) for i in data], columns=columnNames)
        # 关闭cursor对象
        cursor.close()
        # 关闭connection对象
        db.close()
        return df

# 执行

    sql1 = "SELECT gqyj,rdyj,crst,qxlx,pwxr,gsyx,TNM FROM bcdataset where isDelete=0"
    data = get_df_from_db(sql1)

    # 用ABCDEF表示中医证型
    typelabel = {
        'gqyj': 'A',
        'rdyj': 'B',
        'crst': 'C',
        'qxlx': 'D',
        'pwxr': 'E',
        'gsyx': 'F',
    }
    # 分成4组
    k = 4
    keys = list(typelabel.keys())
    result = pd.DataFrame()

    # 只有在作为脚本时直接执行，import 到其他脚本中是不会被执行的
    if __name__ == '__main__':
        for i in range(len(keys)):
            # kmeans聚类
            kmodel = KMeans(n_clusters=k)
            # 训练模型
            kmodel.fit(data[[keys[i]]].values)
            # 创建DataFrame，存放每个簇的簇心
            r1 = pd.DataFrame(kmodel.cluster_centers_,
                              columns=[typelabel[keys[i]]])
            # 创建Series，存放每个簇拥有的样本数量
            r2 = pd.Series(kmodel.labels_).value_counts()
            r2 = pd.DataFrame(r2, columns=[typelabel[keys[i]] + 'n'])
            r = pd.concat([r1, r2], axis=1).sort_values(typelabel[keys[i]])
            r.index = [1, 2, 3, 4]
            # 计算每个簇的范围
            r[typelabel[keys[i]]] = r[typelabel[keys[i]]].rolling(2).mean()
            r[typelabel[keys[i]]][1] = 0.0
            result = result.append(r.T)
        result = result.sort_index()

    # 以上的得到的第四个簇没有写明上限
    # 上限是该证型系数的最大值
    # 以下代码是将上限添加到result中
    maxVal = data.max()
    maxVal = list(maxVal)
    maxVal.pop()
    maxVal = np.array(maxVal).reshape(1, 6)
    maxVal_frame = pd.DataFrame(maxVal,
                                index=None,
                                columns=['A', 'B', 'C', 'D', 'E', 'F']).T
    maxVal_frame.columns = [5]
    rangeresult = pd.DataFrame()
    rangeresult = result.iloc[[0, 2, 4, 6, 8, 10]]
    rangeresult = pd.concat([rangeresult, maxVal_frame], axis=1)
    # 存进数据库
    engine = create_engine(
        "mysql+pymysql://root:root@localhost:3306/breastcancer?charset=utf8")
    rangeresult.to_sql(name='kmeansrange',
                       con=engine,
                       if_exists='append',
                       index=False)

    # 用A1、A2等来替换原数据
    def replace_num(cols, num, result):
        typelabel = {
            'gqyj': 'A',
            'rdyj': 'B',
            'crst': 'C',
            'qxlx': 'D',
            'pwxr': 'E',
            'gsyx': 'F',
        }
        x = typelabel[cols]
        bins = list(result.loc[x])
        if bins[0] < num < bins[1]:
            return '%s1' % x
        elif bins[1] < num < bins[2]:
            return '%s2' % x
        elif bins[2] < num < bins[3]:
            return '%s3' % x
        else:
            return '%s4' % x

    for i in data.columns:
        if i == 'TNM':
            break
        for j in range(len(data)):
            data[i][j] = replace_num(i, data[i][j], result)

# 定义连接函数,用于实现从L_{k-1} 到 C_k 的连接
# 获取频繁项集

    def connect_string(x, ms):
        # 频繁项集的个数
        x = list(map(lambda i: sorted(i.split(ms)), x))
        # 每个频繁项集中元素的个数
        leg = len(x[0])
        r = []
        for i in range(len(x)):
            # 连接、剪枝、删除策略
            for j in range(i, len(x)):
                if x[i][:leg -
                        1] == x[j][:leg -
                                   1] and x[i][leg - 1] != x[j][leg - 1]:
                    r.append(x[i][:leg - 1] +
                             sorted([x[j][leg - 1], x[i][leg - 1]]))
        return r

#  寻找关联规则的函数

    def find_rule(d, support, confidence, ms=u'-'):
        # 创建DataFrame，存放支持度和置信度
        result = pd.DataFrame(index=['support', 'confidence'])
        # 求每一列的的支持度
        support_series = 1.0 * d.sum() / len(d)
        # 支持度筛选（大于最小支持度）
        column = list(support_series[support_series > support].index)
        while len(column) > 1:
            # 使用连接函数进行连接大于最小支持度的列的集合
            column = connect_string(column, ms)

            # 新一批支持度的计算函数
            def sf(i):
                return d[i].prod(axis=1, numeric_only=True)

            # 创建连接数据
            d_2 = pd.DataFrame(list(map(sf, column)),
                               index=[ms.join(i) for i in column]).T
            # 计算连接后的支持度
            support_series_2 = 1.0 * \
                d_2[[ms.join(i) for i in column]].sum()/len(d)
            # 新一轮支持度筛选
            column = list(support_series_2[support_series_2 > support].index)
            support_series = support_series.append(support_series_2)
            column2 = []
            # 遍历可能的推理，如{A,B,C}究竟是A+B-->C还是B+C-->A还是C+A-->B？
            for i in column:
                i = i.split(ms)
                for j in range(len(i)):
                    column2.append(i[:j] + i[j + 1:] + i[j:j + 1])
            cofidence_series = pd.Series(index=[ms.join(i) for i in column2])
            # 定义置信度序列
            for i in column2:
                cofidence_series[ms.join(i)] = support_series[ms.join(
                    sorted(i))] / support_series[ms.join(i[:len(i) - 1])]
            # 置信度筛选(筛选出置信度大于最小置信度阈值)
            for i in cofidence_series[cofidence_series > confidence].index:
                result[i] = 0.0
                result[i]['confidence'] = cofidence_series[i]
                result[i]['support'] = support_series[ms.join(
                    sorted(i.split(ms)))]
        # 关联结果作为index存在，存在数据库会丢失，所以这里新增一列，用于存放关联结果
        t1 = result.T.index
        t2 = []
        for i in t1:
            t2.append(i)
        result.loc['result'] = t2
        result1 = result.T
        print(result1)
        result1.to_sql(name='kmeansapriori',
                       con=engine,
                       if_exists='append',
                       index=False)
        return result1


# 转换0-1矩阵的过渡函数

    def ct(x):
        return pd.Series(1, index=x[pd.notnull(x)])

    # 用map方式执行
    b = map(ct, data.values)
    c = list(b)
    # 实现矩阵转换，空值用0填充
    data = pd.DataFrame(c).fillna(0)
    del b
    # 最小支持度
    support = float(sup)
    # 最小置信度
    confidence = float(conf)
    # 连接符
    ms = '_'

    find_rule(data, support, confidence, ms)

runkmeans(sys.argv[1], sys.argv[2])
