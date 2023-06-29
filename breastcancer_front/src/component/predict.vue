<template>
    <div class="predict">
        <!-- 肝气郁结 -->
        <div>
            <h4>肝气郁结证型</h4>
            <div>
                <span>1、乳房出现肿块，感到胀痛。</span>
                <el-rate v-model="gqyj.q1" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>2、情绪忧郁、急躁易怒。</span>
                <el-rate v-model="gqyj.q2" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>3、失眠多梦。</span>
                <el-rate v-model="gqyj.q3" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>4、苔薄白或薄黄。</span>
                <el-rate v-model="gqyj.q4" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>5、眼睛发红、胀痛、干涩。</span>
                <el-rate v-model="gqyj.q5" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>6、口干口臭。</span>
                <el-rate v-model="gqyj.q6" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>7、胁肋胀痛，时痛时歇，情绪波动时则疼痛加剧。</span>
                <el-rate v-model="gqyj.q7" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>8、食欲不佳、腹胀、打嗝、腹痛、腹泻。</span>
                <el-rate v-model="gqyj.q8" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>9、胸闷气短，喜欢叹气。</span>
                <el-rate v-model="gqyj.q9" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>10、脉弦滑。</span>
                <el-rate v-model="gqyj.q10" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
        </div>

        <!-- 热毒蕴结 -->
        <div>
            <h4>热毒蕴结证型</h4>
            <div>
                <span>1、乳房的肿块增大迅速，肿块疼痛。</span>
                <el-rate v-model="rdyj.q1" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>2、乳房肿块溃烂、恶臭。</span>
                <el-rate v-model="rdyj.q2" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>3、恶寒发热。</span>
                <el-rate v-model="rdyj.q3" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>4、便秘。</span>
                <el-rate v-model="rdyj.q4" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>5、小便短赤。</span>
                <el-rate v-model="rdyj.q5" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>6、舌暗红、有瘀斑。</span>
                <el-rate v-model="rdyj.q6" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>7、苔黄腻、舌苔增厚。</span>
                <el-rate v-model="rdyj.q7" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>8、颌部局部红肿，焮热疼痛。</span>
                <el-rate v-model="rdyj.q8" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>9、出现湿疹。</span>
                <el-rate v-model="rdyj.q9" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>10、脉弦数。</span>
                <el-rate v-model="rdyj.q10" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
        </div>

        <!-- 冲任失调 -->
        <div>
            <h4>冲任失调证型</h4>
            <div>
                <span>1、乳房肿块与胸壁粘连，推之不动。</span>
                <el-rate v-model="crst.q1" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>2、头晕目眩、精神疲惫。</span>
                <el-rate v-model="crst.q2" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>3、少气懒话、气短乏力。</span>
                <el-rate v-model="crst.q3" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>4、月经量少、色淡。</span>
                <el-rate v-model="crst.q4" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>5、脸色苍白或枯黄。</span>
                <el-rate v-model="crst.q5" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>6、消瘦纳呆。</span>
                <el-rate v-model="crst.q6" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>7、心悸。</span>
                <el-rate v-model="crst.q7" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>8、失眠。</span>
                <el-rate v-model="crst.q8" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>9、舌淡、舌质薄。</span>
                <el-rate v-model="crst.q9" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>10、脉沉细无力。</span>
                <el-rate v-model="crst.q10" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
        </div>

        <!-- 气血两虚 -->
        <div>
            <h4>气血两虚证型</h4>
            <div>
                <span>1、乳房肿块在月经前胀痛明显。</span>
                <el-rate v-model="qxlx.q1" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>2、月经不调。</span>
                <el-rate v-model="qxlx.q2" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>3、小腹胀痛。</span>
                <el-rate v-model="qxlx.q3" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>4、经闭。</span>
                <el-rate v-model="qxlx.q4" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>5、月经崩漏。</span>
                <el-rate v-model="qxlx.q5" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>6、吐血。</span>
                <el-rate v-model="qxlx.q6" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>7、腰腿酸软、烦劳体倦。</span>
                <el-rate v-model="qxlx.q7" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>8、五心烦热、口干咽燥。</span>
                <el-rate v-model="qxlx.q8" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>9、舌淡、苔少。</span>
                <el-rate v-model="qxlx.q9" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>10、脉细无力。</span>
                <el-rate v-model="qxlx.q10" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
        </div>

        <!-- 脾胃虚弱 -->
        <div>
            <h4>脾胃虚弱证型</h4>
            <div>
                <span>1、纳呆。</span>
                <el-rate v-model="pwxr.q1" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>2、腹胀或者腹痛。</span>
                <el-rate v-model="pwxr.q2" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>3、小便不利。</span>
                <el-rate v-model="pwxr.q3" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>4、便溏。</span>
                <el-rate v-model="pwxr.q4" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>5、便秘。</span>
                <el-rate v-model="pwxr.q5" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>6、形态消瘦。</span>
                <el-rate v-model="pwxr.q6" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>7、肢体困倦、肢体浮肿。</span>
                <el-rate v-model="pwxr.q7" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>8、舌淡。</span>
                <el-rate v-model="pwxr.q8" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>9、苔白腻。</span>
                <el-rate v-model="pwxr.q9" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>10、脉细弱。</span>
                <el-rate v-model="pwxr.q10" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
        </div>

        <!-- 肝肾阴虚 -->
        <div>
            <h4>肝肾阴虚证型</h4>
            <div>
                <span>1、头晕眼花、双眼干涩、视力下降。</span>
                <el-rate v-model="gsyx.q1" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>2、肋骨隐隐灼痛、腰膝酸软，伴随腰痛。</span>
                <el-rate v-model="gsyx.q2" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>3、面部潮红发热、手脚心发热、盗汗。</span>
                <el-rate v-model="gsyx.q3" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>4、耳鸣。</span>
                <el-rate v-model="gsyx.q4" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>5、牙齿松动。</span>
                <el-rate v-model="gsyx.q5" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>6、脱发。</span>
                <el-rate v-model="gsyx.q6" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>7、大便干结。</span>
                <el-rate v-model="gsyx.q7" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>8、小便短黄。</span>
                <el-rate v-model="gsyx.q8" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>9、舌红少苔、舌质干燥。</span>
                <el-rate v-model="gsyx.q9" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
            <div>
                <span>10、脉细数。</span>
                <el-rate v-model="gsyx.q10" :texts="['从不', '极少', '有时', '经常', '总是']" show-text />
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="predictData">预测</button>


    </div>

    <!-- 预测弹出框 -->
    <div class="predictData">
        <van-dialog v-model:show="predictDialog" title="数据预测" show-cancel-button width="500px" @click="subData">
            <div class="auditedBox">
                <div>
                    <span>肝气郁结证型得分(满分40)：{{ this.gqyj.sum }}</span>
                    <span class="item-2">证型系数为：{{ this.gqyj.coefficient }}</span>
                </div>
                <div>
                    <span>热毒蕴结证型得分(满分40)：{{ this.rdyj.sum }}</span>
                    <span class="item-2">证型系数为：{{ this.rdyj.coefficient }}</span>
                </div>
                <div>
                    <span>冲任失调证型得分(满分40)：{{ this.crst.sum }}</span>
                    <span class="item-2">证型系数为：{{ this.crst.coefficient }}</span>
                </div>
                <div>
                    <span>气血两虚证型得分(满分40)：{{ this.qxlx.sum }}</span>
                    <span class="item-2">证型系数为：{{ this.qxlx.coefficient }}</span>
                </div>
                <div>
                    <span>脾胃虚弱证型得分(满分40)：{{ this.pwxr.sum }}</span>
                    <span class="item-2">证型系数为：{{ this.pwxr.coefficient }}</span>
                </div>
                <div>
                    <span>肝肾阴虚证型得分(满分40)：{{ this.gsyx.sum }}</span>
                    <span class="item-2">证型系数为：{{ this.gsyx.coefficient }}</span>
                </div>
                <div class="item">
                    <div>
                        <span>使用kmeans聚类离散后的关联结果：</span>
                        <p v-for="item in this.kmeansResult" :key="item">{{ item }}</p>
                    </div>
                    <div>
                        <span>使用等宽分箱离散后的关联结果：</span>
                        <p v-for="item in this.distantResult" :key="item">{{ item }}</p>
                    </div>
                    <div>
                        <span>使用等频分箱离散后的关联结果：</span>
                        <p v-for="item in this.frequencyResult" :key="item">{{ item }}</p>
                    </div>
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import request from '../request/request'
export default {
    name: 'predict',
    data () {
        return {
            gqyj: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                sum: '',
                coefficient: ''
            },
            rdyj: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                sum: '',
                coefficient: ''
            },
            crst: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                sum: '',
                coefficient: ''
            },
            qxlx: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                sum: '',
                coefficient: ''
            },
            pwxr: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                sum: '',
                coefficient: ''
            },
            gsyx: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                sum: '',
                coefficient: ''
            },
            predictDialog: false,
            // 关联分析的结果解析
            kmeansResult: [],
            distantResult: [],
            frequencyResult: []
        }
    },
    methods: {
        predictData () {
            this.gqyj.sum = (this.gqyj.q1 + this.gqyj.q2 + this.gqyj.q3 + this.gqyj.q4 + this.gqyj.q5 + this.gqyj.q6 + this.gqyj.q7 + this.gqyj.q8 + this.gqyj.q9 + this.gqyj.q10) - 10
            this.gqyj.coefficient = (this.gqyj.sum / 40).toFixed(3)
            this.rdyj.sum = (this.rdyj.q1 + this.rdyj.q2 + this.rdyj.q3 + this.rdyj.q4 + this.rdyj.q5 + this.rdyj.q6 + this.rdyj.q7 + this.rdyj.q8 + this.rdyj.q9 + this.rdyj.q10) - 10
            this.rdyj.coefficient = (this.rdyj.sum / 40).toFixed(3)
            this.crst.sum = (this.crst.q1 + this.crst.q2 + this.crst.q3 + this.crst.q4 + this.crst.q5 + this.crst.q6 + this.crst.q7 + this.crst.q8 + this.crst.q9 + this.crst.q10) - 10
            this.crst.coefficient = (this.crst.sum / 40).toFixed(3)
            this.qxlx.sum = (this.qxlx.q1 + this.qxlx.q2 + this.qxlx.q3 + this.qxlx.q4 + this.qxlx.q5 + this.qxlx.q6 + this.qxlx.q7 + this.qxlx.q8 + this.qxlx.q9 + this.qxlx.q10) - 10
            this.qxlx.coefficient = (this.qxlx.sum / 40).toFixed(3)
            this.pwxr.sum = (this.pwxr.q1 + this.pwxr.q2 + this.pwxr.q3 + this.pwxr.q4 + this.pwxr.q5 + this.pwxr.q6 + this.pwxr.q7 + this.pwxr.q8 + this.pwxr.q9 + this.pwxr.q10) - 10
            this.pwxr.coefficient = (this.pwxr.sum / 40).toFixed(3)
            this.gsyx.sum = (this.gsyx.q1 + this.gsyx.q2 + this.gsyx.q3 + this.gsyx.q4 + this.gsyx.q5 + this.gsyx.q6 + this.gsyx.q7 + this.gsyx.q8 + this.gsyx.q9 + this.gsyx.q10) - 10
            this.gsyx.coefficient = (this.gsyx.sum / 40).toFixed(3)
            if (this.gqyj.q1 == 0 || this.gqyj.q2 == 0 || this.gqyj.q3 == 0 || this.gqyj.q4 == 0 || this.gqyj.q5 == 0 || this.gqyj.q6 == 0 || this.gqyj.q7 == 0 || this.gqyj.q8 == 0 || this.gqyj.q9 == 0 || this.gqyj.q10 == 0) {
                alert('您还有问题尚未回答！')
            } else if (this.rdyj.q1 == 0 || this.rdyj.q2 == 0 || this.rdyj.q3 == 0 || this.rdyj.q4 == 0 || this.rdyj.q5 == 0 || this.rdyj.q6 == 0 || this.rdyj.q7 == 0 || this.rdyj.q8 == 0 || this.rdyj.q9 == 0 || this.rdyj.q10 == 0) {
                alert('您还有问题尚未回答！')
            } else if (this.crst.q1 == 0 || this.crst.q2 == 0 || this.crst.q3 == 0 || this.crst.q4 == 0 || this.crst.q5 == 0 || this.crst.q6 == 0 || this.crst.q7 == 0 || this.crst.q8 == 0 || this.crst.q9 == 0 || this.crst.q10 == 0) {
                alert('您还有问题尚未回答！')
            } else if (this.qxlx.q1 == 0 || this.qxlx.q2 == 0 || this.qxlx.q3 == 0 || this.qxlx.q4 == 0 || this.qxlx.q5 == 0 || this.qxlx.q6 == 0 || this.qxlx.q7 == 0 || this.qxlx.q8 == 0 || this.qxlx.q9 == 0 || this.qxlx.q10 == 0) {
                alert('您还有问题尚未回答！')
            } else if (this.pwxr.q1 == 0 || this.pwxr.q2 == 0 || this.pwxr.q3 == 0 || this.pwxr.q4 == 0 || this.pwxr.q5 == 0 || this.pwxr.q6 == 0 || this.pwxr.q7 == 0 || this.pwxr.q8 == 0 || this.pwxr.q9 == 0 || this.pwxr.q10 == 0) {
                alert('您还有问题尚未回答！')
            } else if (this.gsyx.q1 == 0 || this.gsyx.q2 == 0 || this.gsyx.q3 == 0 || this.gsyx.q4 == 0 || this.gsyx.q5 == 0 || this.gsyx.q6 == 0 || this.gsyx.q7 == 0 || this.gsyx.q8 == 0 || this.gsyx.q9 == 0 || this.gsyx.q10 == 0) {
                alert('您还有问题尚未回答！')
            } else {
                this.predictDialog = true
                this.kmeansResult = []
                this.distantResult = []
                this.frequencyResult = []
                // 组装关联结果说明的语句
                this.getAprioriResult()
            }
        },
        // 提交到预测历史用，这里就用到belong了
        subData () {
            request.post('/api/userPredictData', { gqyj: this.gqyj.coefficient, rdyj: this.rdyj.coefficient, crst: this.crst.coefficient, qxlx: this.qxlx.coefficient, pwxr: this.pwxr.coefficient, gsyx: this.gsyx.coefficient, belong: this.id }).then(res => {
                console.log(res.message);
                this.gqyj = {}
                this.rdyj = {}
                this.crst = {}
                this.qxlx = {}
                this.pwxr = {}
                this.gsyx = {}
            })
        },
        // 组装关联结果说明的语句
        getAprioriResult () {
            // 判断是否符合kmeans聚类的强关联规则
            // 用标识（ABCDEF）表示数据——获取kmeansRange中的数据，用来判断范围
            // 将标识存进数组
            // 获取关联规则
            // 判断字符串中是否含有关联规则的那几个标识
            // 有,则显示有关联
            // 否则,显示无关联
            var k1 = ''
            var k2 = ''
            var k3 = ''
            var k4 = ''
            var k5 = ''
            var k6 = ''
            // 肝气郁结
            if (this.gqyj.coefficient >= this.kmeansRange[0][1] && this.gqyj.coefficient <= this.kmeansRange[0][2]) {
                k1 = 'A1'
            } else if (this.gqyj.coefficient > this.kmeansRange[0][2] && this.gqyj.coefficient <= this.kmeansRange[0][3]) {
                k1 = 'A2'
            }
            else if (this.gqyj.coefficient > this.kmeansRange[0][3] && this.gqyj.coefficient <= this.kmeansRange[0][4]) {
                k1 = 'A3'
            }
            else if (this.gqyj.coefficient > this.kmeansRange[0][4] && this.gqyj.coefficient <= this.kmeansRange[0][5]) {
                k1 = 'A4'
            }
            // 热毒蕴结
            if (this.rdyj.coefficient >= this.kmeansRange[1][1] && this.rdyj.coefficient <= this.kmeansRange[1][2]) {
                k2 = 'B1'
            } else if (this.rdyj.coefficient > this.kmeansRange[1][2] && this.rdyj.coefficient <= this.kmeansRange[1][3]) {
                k2 = 'B2'
            }
            else if (this.rdyj.coefficient > this.kmeansRange[1][3] && this.rdyj.coefficient <= this.kmeansRange[1][4]) {
                k2 = 'B3'
            }
            else if (this.rdyj.coefficient > this.kmeansRange[1][4] && this.rdyj.coefficient <= this.kmeansRange[1][5]) {
                k2 = 'B4'
            }
            // 冲任失调
            if (this.crst.coefficient >= this.kmeansRange[2][1] && this.crst.coefficient <= this.kmeansRange[2][2]) {
                k3 = 'C1'
            } else if (this.crst.coefficient > this.kmeansRange[2][2] && this.crst.coefficient <= this.kmeansRange[2][3]) {
                k3 = 'C2'
            }
            else if (this.crst.coefficient > this.kmeansRange[2][3] && this.crst.coefficient <= this.kmeansRange[2][4]) {
                k3 = 'C3'
            }
            else if (this.crst.coefficient > this.kmeansRange[2][4] && this.crst.coefficient <= this.kmeansRange[2][5]) {
                k3 = 'C4'
            }
            // 气血两虚
            if (this.qxlx.coefficient >= this.kmeansRange[3][1] && this.qxlx.coefficient <= this.kmeansRange[3][2]) {
                k4 = 'D1'
            } else if (this.qxlx.coefficient > this.kmeansRange[3][2] && this.qxlx.coefficient <= this.kmeansRange[3][3]) {
                k4 = 'D2'
            }
            else if (this.qxlx.coefficient > this.kmeansRange[3][3] && this.qxlx.coefficient <= this.kmeansRange[3][4]) {
                k4 = 'D3'
            }
            else if (this.qxlx.coefficient > this.kmeansRange[3][4] && this.qxlx.coefficient <= this.kmeansRange[3][5]) {
                k4 = 'D4'
            }
            // 脾胃虚弱
            if (this.pwxr.coefficient >= this.kmeansRange[4][1] && this.pwxr.coefficient <= this.kmeansRange[4][2]) {
                k5 = 'E1'
            } else if (this.pwxr.coefficient > this.kmeansRange[4][2] && this.pwxr.coefficient <= this.kmeansRange[4][3]) {
                k5 = 'E2'
            }
            else if (this.pwxr.coefficient > this.kmeansRange[4][3] && this.pwxr.coefficient <= this.kmeansRange[4][4]) {
                k5 = 'E3'
            }
            else if (this.pwxr.coefficient > this.kmeansRange[4][4] && this.pwxr.coefficient <= this.kmeansRange[4][5]) {
                k5 = 'E4'
            }
            // 肝肾阴虚
            if (this.gsyx.coefficient >= this.kmeansRange[5][1] && this.gsyx.coefficient <= this.kmeansRange[5][2]) {
                k6 = 'F1'
            } else if (this.gsyx.coefficient > this.kmeansRange[5][2] && this.gsyx.coefficient <= this.kmeansRange[5][3]) {
                k6 = 'F2'
            }
            else if (this.gsyx.coefficient > this.kmeansRange[5][3] && this.gsyx.coefficient <= this.kmeansRange[5][4]) {
                k6 = 'F3'
            }
            else if (this.gsyx.coefficient > this.kmeansRange[5][4] && this.gsyx.coefficient <= this.kmeansRange[5][5]) {
                k6 = 'F4'
            }
            var ks = [k1, k2, k3, k4, k5, k6]
            for (var k = 0; k < this.kmeansApriori.length; k++) {
                var str1 = this.kmeansApriori[k].result.substring(0, this.kmeansApriori[k].result.length - 3).split("_")
                var res1 = this.getResult(str1, ks)
                if (res1) {
                    var kr1 = ''
                    var kr2 = ''
                    var kr3 = ''
                    var kr4 = ''
                    var kr5 = ''
                    var kr6 = ''
                    for (var m = 0; m < str1.length; m++) {
                        switch (str1[m]) {
                            case "A1":
                                kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][1] + ',' + this.kmeansRange[0][2] + ']范围内, '
                                break
                            case "A2":
                                kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][2] + ',' + this.kmeansRange[0][3] + ']范围内, '
                                break
                            case "A3":
                                kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][3] + ',' + this.kmeansRange[0][4] + ']范围内, '
                                break
                            case "A4":
                                kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][4] + ',' + this.kmeansRange[0][5] + ']范围内, '
                                break
                            case "B1":
                                kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][1] + ',' + this.kmeansRange[1][2] + ']范围内, '
                                break
                            case "B2":
                                kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][2] + ',' + this.kmeansRange[1][3] + ']范围内, '
                                break
                            case "B3":
                                kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][3] + ',' + this.kmeansRange[1][4] + ']范围内, '
                                break
                            case "B4":
                                kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][4] + ',' + this.kmeansRange[1][5] + ']范围内, '
                                break
                            case "C1":
                                kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][1] + ',' + this.kmeansRange[2][2] + ']范围内, '
                                break
                            case "C2":
                                kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][2] + ',' + this.kmeansRange[2][3] + ']范围内, '
                                break
                            case "C3":
                                kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][3] + ',' + this.kmeansRange[2][4] + ']范围内, '
                                break
                            case "C4":
                                kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][4] + ',' + this.kmeansRange[2][5] + ']范围内, '
                                break
                            case "D1":
                                kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][1] + ',' + this.kmeansRange[3][2] + ']范围内, '
                                break
                            case "D2":
                                kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][2] + ',' + this.kmeansRange[3][3] + ']范围内, '
                                break
                            case "D3":
                                kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][3] + ',' + this.kmeansRange[3][4] + ']范围内, '
                                break
                            case "D4":
                                kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][4] + ',' + this.kmeansRange[3][5] + ']范围内, '
                                break
                            case "E1":
                                kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][1] + ',' + this.kmeansRange[4][2] + ']范围内, '
                                break
                            case "E2":
                                kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][2] + ',' + this.kmeansRange[4][3] + ']范围内, '
                                break
                            case "E3":
                                kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][3] + ',' + this.kmeansRange[4][4] + ']范围内, '
                                break
                            case "E4":
                                kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][4] + ',' + this.kmeansRange[4][5] + ']范围内, '
                                break
                            case "F1":
                                kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][1] + ',' + this.kmeansRange[5][2] + ']范围内, '
                                break
                            case "F2":
                                kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][2] + ',' + this.kmeansRange[5][3] + ']范围内, '
                                break
                            case "F3":
                                kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][3] + ',' + this.kmeansRange[5][4] + ']范围内, '
                                break
                            case "F4":
                                kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][4] + ',' + this.kmeansRange[5][5] + ']范围内, '
                                break
                        }
                    }
                    var kr = kr1 + kr2 + kr3 + kr4 + kr5 + kr6
                    var krr = kr + 'TNM分期诊断为H4期的可能性为' + (this.kmeansApriori[k].confidence * 100).toFixed(1) + '%,而这种情况发生的可能性为' + (this.kmeansApriori[k].support * 100).toFixed(1) + '%。'
                    this.kmeansResult.push(krr)
                }
            }

            // 判断是否符合distant聚类的强关联规则
            var d1 = ''
            var d2 = ''
            var d3 = ''
            var d4 = ''
            var d5 = ''
            var d6 = ''
            // 肝气郁结
            if (this.gqyj.coefficient > this.distantRange[0][0] && this.gqyj.coefficient <= this.distantRange[0][1]) {
                d1 = 'A1'
            } else if (this.gqyj.coefficient > this.distantRange[0][1] && this.gqyj.coefficient <= this.distantRange[0][2]) {
                d1 = 'A2'
            }
            else if (this.gqyj.coefficient > this.distantRange[0][2] && this.gqyj.coefficient <= this.distantRange[0][3]) {
                d1 = 'A3'
            }
            else if (this.gqyj.coefficient > this.distantRange[0][3] && this.gqyj.coefficient <= this.distantRange[0][4]) {
                d1 = 'A4'
            }
            // 热毒蕴结
            if (this.rdyj.coefficient > this.distantRange[1][0] && this.rdyj.coefficient <= this.distantRange[1][1]) {
                d2 = 'B1'
            } else if (this.rdyj.coefficient > this.distantRange[1][1] && this.rdyj.coefficient <= this.distantRange[1][2]) {
                d2 = 'B2'
            }
            else if (this.rdyj.coefficient > this.distantRange[1][2] && this.rdyj.coefficient <= this.distantRange[1][3]) {
                d2 = 'B3'
            }
            else if (this.rdyj.coefficient > this.distantRange[1][3] && this.rdyj.coefficient <= this.distantRange[1][4]) {
                d2 = 'B4'
            }
            // 冲任失调
            if (this.crst.coefficient > this.distantRange[2][0] && this.crst.coefficient <= this.distantRange[2][1]) {
                d3 = 'C1'
            } else if (this.crst.coefficient > this.distantRange[2][1] && this.crst.coefficient <= this.distantRange[2][2]) {
                d3 = 'C2'
            }
            else if (this.crst.coefficient > this.distantRange[2][2] && this.crst.coefficient <= this.distantRange[2][3]) {
                d3 = 'C3'
            }
            else if (this.crst.coefficient > this.distantRange[2][3] && this.crst.coefficient <= this.distantRange[2][4]) {
                d3 = 'C4'
            }
            // 气血两虚
            if (this.qxlx.coefficient > this.distantRange[3][0] && this.qxlx.coefficient <= this.distantRange[3][1]) {
                d4 = 'D1'
            } else if (this.qxlx.coefficient > this.distantRange[3][1] && this.qxlx.coefficient <= this.distantRange[3][2]) {
                d4 = 'D2'
            }
            else if (this.qxlx.coefficient > this.distantRange[3][2] && this.qxlx.coefficient <= this.distantRange[3][3]) {
                d4 = 'D3'
            }
            else if (this.qxlx.coefficient > this.distantRange[3][3] && this.qxlx.coefficient <= this.distantRange[3][4]) {
                d4 = 'D4'
            }
            // 脾胃虚弱
            if (this.pwxr.coefficient > this.distantRange[4][0] && this.pwxr.coefficient <= this.distantRange[4][1]) {
                d5 = 'E1'
            } else if (this.pwxr.coefficient > this.distantRange[4][1] && this.pwxr.coefficient <= this.distantRange[4][1]) {
                d5 = 'E2'
            }
            else if (this.pwxr.coefficient > this.distantRange[4][1] && this.pwxr.coefficient <= this.distantRange[4][2]) {
                d5 = 'E3'
            }
            else if (this.pwxr.coefficient > this.distantRange[4][3] && this.pwxr.coefficient <= this.distantRange[4][4]) {
                d5 = 'E4'
            }
            // 肝肾阴虚
            if (this.gsyx.coefficient > this.distantRange[5][0] && this.gsyx.coefficient <= this.distantRange[5][1]) {
                d6 = 'F1'
            } else if (this.gsyx.coefficient > this.distantRange[5][1] && this.gsyx.coefficient <= this.distantRange[5][2]) {
                d6 = 'F2'
            }
            else if (this.gsyx.coefficient > this.distantRange[5][2] && this.gsyx.coefficient <= this.distantRange[5][3]) {
                d6 = 'F3'
            }
            else if (this.gsyx.coefficient > this.distantRange[5][3] && this.gsyx.coefficient <= this.distantRange[5][4]) {
                d6 = 'F4'
            }
            var ds = [d1, d2, d3, d4, d5, d6]
            for (var i = 0; i < this.distantApriori.length; i++) {
                var str2 = this.distantApriori[i].result.substring(0, this.distantApriori[i].result.length - 3).split("_")
                var res2 = this.getResult(str2, ds)
                if (res2) {
                    var dr1 = ''
                    var dr2 = ''
                    var dr3 = ''
                    var dr4 = ''
                    var dr5 = ''
                    var dr6 = ''
                    // 这里出了大问题,因为上一个循环用了变量i,这里忘记了,还是用了i,所以陷入死循环
                    for (var j = 0; j < str2.length; j++) {
                        switch (str2[j]) {
                            case "A1":
                                dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][0] + ',' + this.distantRange[0][1] + ']范围内, '
                                break
                            case "A2":
                                dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][1] + ',' + this.distantRange[0][2] + ']范围内, '
                                break
                            case "A3":
                                dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][2] + ',' + this.distantRange[0][3] + ']范围内, '
                                break
                            case "A4":
                                dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][3] + ',' + this.distantRange[0][4] + ']范围内, '
                                break
                            case "B1":
                                dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][0] + ',' + this.distantRange[1][1] + ']范围内, '
                                break
                            case "B2":
                                dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][1] + ',' + this.distantRange[1][2] + ']范围内, '
                                break
                            case "B3":
                                dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][2] + ',' + this.distantRange[1][3] + ']范围内, '
                                break
                            case "B4":
                                dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][3] + ',' + this.distantRange[1][4] + ']范围内, '
                                break
                            case "C1":
                                dr3 = '冲任失调证型系数处于(' + this.distantRange[2][0] + ',' + this.distantRange[2][1] + ']范围内, '
                                break
                            case "C2":
                                dr3 = '冲任失调证型系数处于(' + this.distantRange[2][1] + ',' + this.distantRange[2][2] + ']范围内, '
                                break
                            case "C3":
                                dr3 = '冲任失调证型系数处于(' + this.distantRange[2][2] + ',' + this.distantRange[2][3] + ']范围内, '
                                break
                            case "C4":
                                dr3 = '冲任失调证型系数处于(' + this.distantRange[2][3] + ',' + this.distantRange[2][4] + ']范围内, '
                                break
                            case "D1":
                                dr4 = '气血两虚证型系数处于(' + this.distantRange[3][0] + ',' + this.distantRange[3][1] + ']范围内, '
                                break
                            case "D2":
                                dr4 = '气血两虚证型系数处于(' + this.distantRange[3][1] + ',' + this.distantRange[3][2] + ']范围内, '
                                break
                            case "D3":
                                dr4 = '气血两虚证型系数处于(' + this.distantRange[3][2] + ',' + this.distantRange[3][3] + ']范围内, '
                                break
                            case "D4":
                                dr4 = '气血两虚证型系数处于(' + this.distantRange[3][3] + ',' + this.distantRange[3][4] + ']范围内, '
                                break
                            case "E1":
                                dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][0] + ',' + this.distantRange[4][1] + ']范围内, '
                                break
                            case "E2":
                                dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][1] + ',' + this.distantRange[4][2] + ']范围内, '
                                break
                            case "E3":
                                dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][2] + ',' + this.distantRange[4][3] + ']范围内, '
                                break
                            case "E4":
                                dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][3] + ',' + this.distantRange[4][4] + ']范围内, '
                                break
                            case "F1":
                                dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][0] + ',' + this.distantRange[5][1] + ']范围内, '
                                break
                            case "F2":
                                dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][1] + ',' + this.distantRange[5][2] + ']范围内, '
                                break
                            case "F3":
                                dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][2] + ',' + this.distantRange[5][3] + ']范围内, '
                                break
                            case "F4":
                                dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][3] + ',' + this.distantRange[5][4] + ']范围内, '
                                break
                        }
                    }
                    var dr = dr1 + dr2 + dr3 + dr4 + dr5 + dr6
                    var drr = dr + 'TNM分期诊断为H4期的可能性为' + (this.distantApriori[i].confidence * 100).toFixed(1) + '%,而这种情况发生的可能性为' + (this.distantApriori[i].support * 100).toFixed(1) + '%。'
                    this.distantResult.push(drr)
                }
            }

            // 判断是否符合frequency聚类的强关联规则
            var f1 = ''
            var f2 = ''
            var f3 = ''
            var f4 = ''
            var f5 = ''
            var f6 = ''
            // 肝气郁结
            if (this.gqyj.coefficient > this.frequencyRange[0][0] && this.gqyj.coefficient <= this.frequencyRange[0][1]) {
                f1 = 'A1'
            } else if (this.gqyj.coefficient > this.frequencyRange[0][1] && this.gqyj.coefficient <= this.frequencyRange[0][2]) {
                f1 = 'A2'
            }
            else if (this.gqyj.coefficient > this.frequencyRange[0][2] && this.gqyj.coefficient <= this.frequencyRange[0][3]) {
                f1 = 'A3'
            }
            else if (this.gqyj.coefficient > this.frequencyRange[0][3] && this.gqyj.coefficient <= this.frequencyRange[0][4]) {
                f1 = 'A4'
            }
            // 热毒蕴结
            if (this.rfyj > this.frequencyRange[1][0] && this.rfyj <= this.frequencyRange[1][1]) {
                f2 = 'B1'
            } else if (this.rfyj > this.frequencyRange[1][1] && this.rfyj <= this.frequencyRange[1][2]) {
                f2 = 'B2'
            }
            else if (this.rfyj > this.frequencyRange[1][2] && this.rfyj <= this.frequencyRange[1][3]) {
                f2 = 'B3'
            }
            else if (this.rfyj > this.frequencyRange[1][3] && this.rfyj <= this.frequencyRange[1][4]) {
                f2 = 'B4'
            }
            // 冲任失调
            if (this.crst.coefficient > this.frequencyRange[2][0] && this.crst.coefficient <= this.frequencyRange[2][1]) {
                f3 = 'C1'
            } else if (this.crst.coefficient > this.frequencyRange[2][1] && this.crst.coefficient <= this.frequencyRange[2][2]) {
                f3 = 'C2'
            }
            else if (this.crst.coefficient > this.frequencyRange[2][2] && this.crst.coefficient <= this.frequencyRange[2][3]) {
                f3 = 'C3'
            }
            else if (this.crst.coefficient > this.frequencyRange[2][3] && this.crst.coefficient <= this.frequencyRange[2][4]) {
                f3 = 'C4'
            }
            // 气血两虚
            if (this.qxlx.coefficient > this.frequencyRange[3][0] && this.qxlx.coefficient <= this.frequencyRange[3][1]) {
                f4 = 'D1'
            } else if (this.qxlx.coefficient > this.frequencyRange[3][1] && this.qxlx.coefficient <= this.frequencyRange[3][2]) {
                f4 = 'D2'
            }
            else if (this.qxlx.coefficient > this.frequencyRange[3][2] && this.qxlx.coefficient <= this.frequencyRange[3][3]) {
                f4 = 'D3'
            }
            else if (this.qxlx.coefficient > this.frequencyRange[3][3] && this.qxlx.coefficient <= this.frequencyRange[3][4]) {
                f4 = 'D4'
            }
            // 脾胃虚弱
            if (this.pwxr.coefficient > this.frequencyRange[4][0] && this.pwxr.coefficient <= this.frequencyRange[4][1]) {
                f5 = 'E1'
            } else if (this.pwxr.coefficient > this.frequencyRange[4][1] && this.pwxr.coefficient <= this.frequencyRange[4][1]) {
                f5 = 'E2'
            }
            else if (this.pwxr.coefficient > this.frequencyRange[4][1] && this.pwxr.coefficient <= this.frequencyRange[4][2]) {
                f5 = 'E3'
            }
            else if (this.pwxr.coefficient > this.frequencyRange[4][3] && this.pwxr.coefficient <= this.frequencyRange[4][4]) {
                f5 = 'E4'
            }
            // 肝肾阴虚
            if (this.gsyx.coefficient > this.frequencyRange[5][0] && this.gsyx.coefficient <= this.frequencyRange[5][1]) {
                f6 = 'F1'
            } else if (this.gsyx.coefficient > this.frequencyRange[5][1] && this.gsyx.coefficient <= this.frequencyRange[5][2]) {
                f6 = 'F2'
            }
            else if (this.gsyx.coefficient > this.frequencyRange[5][2] && this.gsyx.coefficient <= this.frequencyRange[5][3]) {
                f6 = 'F3'
            }
            else if (this.gsyx.coefficient > this.frequencyRange[5][3] && this.gsyx.coefficient <= this.frequencyRange[5][4]) {
                f6 = 'F4'
            }
            var fs = [f1, f2, f3, f4, f5, f6]
            for (var n = 0; n < this.frequencyApriori.length; n++) {
                var str3 = this.frequencyApriori[n].result.substring(0, this.frequencyApriori[n].result.length - 3).split("_")
                var res3 = this.getResult(str3, fs)
                if (res3) {
                    var fr1 = ''
                    var fr2 = ''
                    var fr3 = ''
                    var fr4 = ''
                    var fr5 = ''
                    var fr6 = ''
                    // 这里出了大问题,因为上一个循环用了变量i,这里忘记了,还是用了i,所以陷入死循环
                    for (var p = 0; p < str3.length; p++) {
                        switch (str3[p]) {
                            case "A1":
                                fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][0] + ',' + this.frequencyRange[0][1] + ']范围内, '
                                break
                            case "A2":
                                fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][1] + ',' + this.frequencyRange[0][2] + ']范围内, '
                                break
                            case "A3":
                                fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][2] + ',' + this.frequencyRange[0][3] + ']范围内, '
                                break
                            case "A4":
                                fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][3] + ',' + this.frequencyRange[0][4] + ']范围内, '
                                break
                            case "B1":
                                fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][0] + ',' + this.frequencyRange[1][1] + ']范围内, '
                                break
                            case "B2":
                                fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][1] + ',' + this.frequencyRange[1][2] + ']范围内, '
                                break
                            case "B3":
                                fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][2] + ',' + this.frequencyRange[1][3] + ']范围内, '
                                break
                            case "B4":
                                fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][3] + ',' + this.frequencyRange[1][4] + ']范围内, '
                                break
                            case "C1":
                                fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][0] + ',' + this.frequencyRange[2][1] + ']范围内, '
                                break
                            case "C2":
                                fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][1] + ',' + this.frequencyRange[2][2] + ']范围内, '
                                break
                            case "C3":
                                fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][2] + ',' + this.frequencyRange[2][3] + ']范围内, '
                                break
                            case "C4":
                                fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][3] + ',' + this.frequencyRange[2][4] + ']范围内, '
                                break
                            case "D1":
                                fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][0] + ',' + this.frequencyRange[3][1] + ']范围内, '
                                break
                            case "D2":
                                fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][1] + ',' + this.frequencyRange[3][2] + ']范围内, '
                                break
                            case "D3":
                                fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][2] + ',' + this.frequencyRange[3][3] + ']范围内, '
                                break
                            case "D4":
                                fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][3] + ',' + this.frequencyRange[3][4] + ']范围内, '
                                break
                            case "E1":
                                fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][0] + ',' + this.frequencyRange[4][1] + ']范围内, '
                                break
                            case "E2":
                                fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][1] + ',' + this.frequencyRange[4][2] + ']范围内, '
                                break
                            case "E3":
                                fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][2] + ',' + this.frequencyRange[4][3] + ']范围内, '
                                break
                            case "E4":
                                fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][3] + ',' + this.frequencyRange[4][4] + ']范围内, '
                                break
                            case "F1":
                                fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][0] + ',' + this.frequencyRange[5][1] + ']范围内, '
                                break
                            case "F2":
                                fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][1] + ',' + this.frequencyRange[5][2] + ']范围内, '
                                break
                            case "F3":
                                fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][2] + ',' + this.frequencyRange[5][3] + ']范围内, '
                                break
                            case "F4":
                                fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][3] + ',' + this.frequencyRange[5][4] + ']范围内, '
                                break
                        }
                    }
                    var fr = fr1 + fr2 + fr3 + fr4 + fr5 + fr6
                    var frr = fr + 'TNM分期诊断为H4期的可能性为' + (this.frequencyApriori[n].confidence * 100).toFixed(1) + '%,而这种情况发生的可能性为' + (this.frequencyApriori[n].support * 100).toFixed(1) + '%。'
                    this.frequencyResult.push(frr)
                }
            }
        },
        // 判断一个数组是否为另一个数组的子集
        getResult (arr1, arr2) {
            return arr1.every(item => {
                return arr2.includes(item);
            })
        },
    },
    computed: {
        id () {
            return localStorage.getItem('id') || this.$store.state.id || ''
        },
        kmeansRange () {
            return JSON.parse(localStorage.getItem('kmeansRange'))
        },
        kmeansApriori () {
            return JSON.parse(localStorage.getItem('kmeansApriori'))

        },
        distantRange () {
            return JSON.parse(localStorage.getItem('distantRange'))
        },
        distantApriori () {
            return JSON.parse(localStorage.getItem('distantApriori'))

        },
        frequencyRange () {
            return JSON.parse(localStorage.getItem('frequencyRange'))
        },
        frequencyApriori () {
            return JSON.parse(localStorage.getItem('frequencyApriori'))
        },
    },
}
</script>

<style lang="less">
.predict {
    >div {
        margin-bottom: 20px;

        >div {
            height: 40px;
            line-height: 40px;

            .el-rate {
                margin-left: 10px;
            }
        }

    }

    .btn {
        margin-top: 20px;
        margin-left: 40%;
    }

    th {
        font-weight: 400;
    }


}

// 预测弹出框
.predictData {
    .van-dialog {
        padding: 10px;
        font-size: 16px;

        .auditedBox {
            padding: 10px;
            height: 400px;
            overflow-x: hidden;
            overflow-y: auto;

            .item-2 {
                margin-left: 40px;
            }

            .item {
                margin-top: 20px;

                div {
                    margin-top: 10px;

                    span {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>