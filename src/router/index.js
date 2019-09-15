
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login'
import Signup from '@/components/Signup'
// eslint-disable-next-line camelcase
import AssessmentPreparation_Main from '@/components/AssessmentPreparation_Main'
import storetest from '@/components/storetest'

Vue.use(VueRouter)

const blank = {template: ''}

const routes = [
  {path: '/', component: blank},
  {path: '/Login', component: Login},
  {path: '/Signup', component: Signup},
  {path: '/AssessmentPreparationMenu', component: AssessmentPreparation_Main},
  {path: '/storetest', component: storetest}
]

export default new VueRouter({
  routes
})
