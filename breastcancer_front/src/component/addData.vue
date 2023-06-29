<template>
  <!-- 用户添加数据页面 -->
  
  <div class="addData">
    <van-tabs>
      <van-tab title="添加数据">
        <unaudit />
      </van-tab>
      <van-tab title="审核中">
        <auditing />
      </van-tab>
      <van-tab title="已审核">
        <audited />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import unaudit from '../component/unaudit.vue'
import auditing from '../component/auditing.vue'
import audited from '../component/audited.vue'

export default {
  name: 'addData',
  components: {
    unaudit,
    auditing,
    audited,
  }
}
</script>

<style lang="less">
.addData {

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