import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Register from '../views/register.vue'
import Data from '../views/data.vue'
import UserRight from '../component/right.vue'
import userInfo from '../component/userInfo.vue'
import aprioriResult from '../component/aprioriResult.vue'
import introduction from '../component/introduction.vue'
import addData from '../component/addData.vue'
import auditData from '../component/auditData.vue'
import predict from '../component/predict.vue'
import predictHistory from '../component/predictHistory.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: Login
  }, {
    path: '/index',
    name: 'index',
    component: Index,
    redirect: '/index/data',
    children: [{
        path: 'introduction',
        component: introduction,
        name: 'introduction'
      }, {
        path: 'data',
        component: Data,
        name: 'data',
        meta: {
          keepAlive: true,
        },
      }, {
        path: 'aprioriResult',
        component: aprioriResult,
        name: 'aprioriResult'
      },
      {
        path: 'predict',
        component: predict,
        name: 'predict'
      },
      {
        path: 'predictHistory',
        component: predictHistory,
        name: 'predictHistory'
      },
      {
        path: 'addData',
        component: addData,
        name: 'addData'
      }, {
        path: 'auditData',
        component: auditData,
        name: 'auditData'
      }, {
        path: 'userInfo',
        name: 'userInfo',
        component: userInfo,
      }, {
        path: 'userRight',
        component: UserRight,
        name: 'userRight',
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router