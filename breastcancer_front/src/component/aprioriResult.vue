<template>
    <div class="aprioriResult">
        <van-tabs>
            <van-tab title="kmeans聚类">
                <Kmeans />
            </van-tab>
            <van-tab title="等宽分箱">
                <Distant />
            </van-tab>
            <van-tab title="等频分箱">
                <Frequency />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Kmeans from '../component/kmeans.vue'
import Distant from '../component/distant.vue'
import Frequency from '../component/frequency.vue'

export default {
    name: 'data',
    components: {
        Kmeans,
        Distant,
        Frequency,
    }
}
</script>

<style lang="less">
.aprioriResult {
    .van-tab {
        font-size: 16px;
        height: 30px;
    }

    .van-tabs__nav--line {
        height: 80%;
        width: 100%;
    }

    .van-tabs__line {
        width: 30%;
        height: 5px;
        background-color: #a7c4cc;
    }

    .van-tabs__wrap {
        margin-bottom: 20px;
    }
}
</style>