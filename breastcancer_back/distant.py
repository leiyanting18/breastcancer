from __future__ import print_function
import pandas as pd
import pymysql
from sqlalchemy import create_engine
import warnings
import sys

warnings.filterwarnings("ignore")


def runDistant(sup, conf):
    # 打开数据库连接，db为数据库名称
    db = pymysql.connect(host="localhost",
                         user="root",
                         passwd="root",
                         db="breastcancer")

    # 定义获取函数
    def get_df_from_db(sql):
        cursor = db.cursor()
        cursor.execute(sql)
        data = cursor.fetchall()
        columnDes = cursor.description
        columnNames = [columnDes[i][0] for i in range(len(columnDes))]
        df = pd.DataFrame([list(i) for i in data], columns=columnNames)
        cursor.close()
        db.close()
        return df

# 获取未被删除的数据

    sql1 = "SELECT gqyj,rdyj,crst,qxlx,pwxr,gsyx,TNM FROM bcdataset where isDelete=0"
    data = get_df_from_db(sql1)

    # 距离分箱（距离区间法）
    # pd.cut()主要用于对数据从最大值到最小值进行等距划分
    # pandas.cut(x, bins, right=True, labels=None, retbins=False, precision=3, include_lowest=False)
    # x——要进行划分的数据
    # bins——分成几组
    # right——区间是否包括右边的数据
    # labels——每一组的标签（别名）
    # retbins——是否显示分箱的分界值。默认为False，当bins取整数时可以设置retbins=True以显示分界值，得到划分后的区间
    # precision——数据以几位小数显示
    # include_lowest——表示区间的左边是开还是闭，默认为false，也就是左开右闭。
    v1, c1 = pd.cut(x=data['gqyj'],
                    bins=4,
                    labels=['A1', 'A2', 'A3', 'A4'],
                    retbins=True)
    r1 = v1.to_frame()
    r1.columns = ['gqyj']

    v2, c2 = pd.cut(x=data['rdyj'],
                    bins=4,
                    labels=['B1', 'B2', 'B3', 'B4'],
                    retbins=True)
    r2 = v2.to_frame()
    r2.columns = ['rdyj']

    v3, c3 = pd.cut(x=data['crst'],
                    bins=4,
                    labels=['C1', 'C2', 'C3', 'C4'],
                    retbins=True)
    r3 = v3.to_frame()
    r3.columns = ['crst']

    v4, c4 = pd.cut(x=data['qxlx'],
                    bins=4,
                    labels=['D1', 'D2', 'D3', 'D4'],
                    retbins=True)
    r4 = v4.to_frame()
    r4.columns = ['qxlx']

    v5, c5 = pd.cut(x=data['pwxr'],
                    bins=4,
                    labels=['E1', 'E2', 'E3', 'E4'],
                    retbins=True)
    r5 = v5.to_frame()
    r5.columns = ['pwxr']

    v6, c6 = pd.cut(x=data['gsyx'],
                    bins=4,
                    labels=['F1', 'F2', 'F3', 'F4'],
                    retbins=True)
    r6 = v6.to_frame()
    r6.columns = ['gsyx']

    c1 = pd.DataFrame(
        c1,
        index=None,
    ).T
    c2 = pd.DataFrame(
        c2,
        index=None,
    ).T
    c3 = pd.DataFrame(
        c3,
        index=None,
    ).T
    c4 = pd.DataFrame(
        c4,
        index=None,
    ).T
    c5 = pd.DataFrame(
        c5,
        index=None,
    ).T
    c6 = pd.DataFrame(
        c6,
        index=None,
    ).T

    rangeresult = pd.concat([c1, c2, c3, c4, c5, c6])
    engine = create_engine(
        "mysql+pymysql://root:root@localhost:3306/breastcancer?charset=utf8")
    rangeresult.to_sql(name='distantrange',
                       con=engine,
                       if_exists='append',
                       index=False)
    data = pd.concat([v1, v2, v3, v4, v5, v6, data['TNM']], axis=1)

    # 获取频繁项集
    def connect_string(x, ms):
        x = list(map(lambda i: sorted(i.split(ms)), x))
        leg = len(x[0])
        r = []
        for i in range(len(x)):
            for j in range(i, len(x)):
                if x[i][:leg -
                        1] == x[j][:leg -
                                   1] and x[i][leg - 1] != x[j][leg - 1]:
                    r.append(x[i][:leg - 1] +
                             sorted([x[j][leg - 1], x[i][leg - 1]]))
        return r

#  寻找关联规则的函数

    def find_rule(d, support, confidence, ms=u'-'):
        result = pd.DataFrame(index=['support', 'confidence'])
        support_series = 1.0 * d.sum() / len(d)
        column = list(support_series[support_series > support].index)
        while len(column) > 1:
            column = connect_string(column, ms)

            # 新一批支持度的计算函数
            def sf(i):
                return d[i].prod(axis=1, numeric_only=True)

        # 创建连接数据，这一步耗时、耗内存最严重。当数据集较大时，可以考虑并行运算优化。

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
            for i in column2:
                cofidence_series[ms.join(i)] = support_series[ms.join(
                    sorted(i))] / support_series[ms.join(i[:len(i) - 1])]
            for i in cofidence_series[cofidence_series > confidence].index:
                result[i] = 0.0
                result[i]['confidence'] = cofidence_series[i]
                result[i]['support'] = support_series[ms.join(
                    sorted(i.split(ms)))]
        t1 = result.T.index
        t2 = []
        for i in t1:
            t2.append(i)
        result.loc['result'] = t2
        result1 = result.T
        print(result1)
        result1.to_sql(name='distantapriori',
                       con=engine,
                       if_exists='append',
                       index=False)
        return result1


# 转换0-1矩阵的过渡函数

    def ct(x):
        return pd.Series(1, index=x[pd.notnull(x)])

    b = map(ct, data.values)
    c = list(b)
    data = pd.DataFrame(c).fillna(0)
    del b
    support = float(sup)
    confidence = float(conf)
    ms = '_'
    find_rule(data, support, confidence, ms)

runDistant(sys.argv[1], sys.argv[2])
