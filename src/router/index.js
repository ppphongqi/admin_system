/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/findPwd',
    component: () => import('@/views/findPwd/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/VirtualProduct',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '虚拟产品', icon: 'box-open' },
    children: [
      {
        path: 'VirtualProduct',
        name: 'VirtualProduct',
        // alwaysShow: true,
        component: () => import('@/views/VirtualProduct/children/list/index'),
        meta: {
          title: '虚拟产品',
          icon: 'cloud',
          // affix: true,
        },
      },
      {
        path: 'VirtualSetMenu',
        name: 'VirtualSetMenu',
        // alwaysShow: true,
        component: () =>
          import('@/views/VirtualProduct/children/setMenu/index'),
        meta: {
          title: '套餐业务',
          icon: 'cloud',
          // affix: true,
        },
      },
      // {
      //   path: 'telephone',
      //   name: 'telephone',
      //   // alwaysShow: true,
      //   component: () =>
      //     import('@/views/VirtualProduct/children/telephone/index'),
      //   meta: {
      //     title: '话费业务',
      //     icon: 'cloud',
      //     // affix: true,
      //   },
      // },
    ],
  },
  {
    path: '/PhysicalProducts',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '实物产品', icon: 'box-open' },
    children: [
      {
        path: 'ProductList',
        name: 'ProductList',
        component: () =>
          import('@/views/PhysicalProducts/children/list/index.vue'),
        meta: {
          title: '产品列表',
          icon: 'cart-plus',
          // affix: true,
        },
        // hidden: true,
      },
      {
        path: 'ProductAdd',
        name: 'ProductAdd',
        component: () =>
          import('@/views/PhysicalProducts/children/add/index.vue'),
        meta: {
          title: '商品内容',
          // affix: true,
        },
        hidden: true,
      },
      {
        path: 'ProductKinds',
        name: 'ProductKinds',
        component: () =>
          import('@/views/PhysicalProducts/children/kinds/index.vue'),
        meta: {
          title: '产品分类',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'ProductTable',
        name: 'ProductTable',
        component: () =>
          import('@/views/PhysicalProducts/children/table/index.vue'),
        meta: {
          title: '数据报表',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'ProductSetting',
        name: 'ProductSetting',
        component: () =>
          import('@/views/PhysicalProducts/children/setting/index.vue'),
        meta: {
          title: '规格设置',
          icon: 'cart-plus',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/OrderManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '订单管理', icon: 'box-open' },
    children: [
      {
        path: 'OrderList',
        name: 'OrderList',
        component: () =>
          import('@/views/OrderManagement/children/list/index.vue'),
        meta: {
          title: '订单列表',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'OrderLend',
        name: 'OrderLend',
        component: () =>
          import('@/views/OrderManagement/children/lend/index.vue'),
        meta: {
          title: '借货单列表',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'OperatorOrder',
        name: 'OperatorOrder',
        component: () =>
          import('@/views/OrderManagement/children/operator/index.vue'),
        meta: {
          title: '运营商任务订单列表',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'OrderRefund',
        name: 'OrderRefund',
        component: () =>
          import('@/views/OrderManagement/children/refund/index.vue'),
        meta: {
          title: '退款单',
          icon: 'cart-plus',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/FinancialDetails',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '财务明细', icon: 'box-open' },
    children: [
      {
        path: 'Screening',
        name: 'Screening',
        component: () =>
          import('@/views/FinancialDetails/children/screening/index.vue'),
        meta: {
          title: '财务数据筛选',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'Detail',
        name: 'Detail',
        component: () =>
          import('@/views/FinancialDetails/children/detail/index.vue'),
        meta: {
          title: '充值明细',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'PhyDetail',
        name: 'PhyDetail',
        component: () =>
          import('@/views/FinancialDetails/children/phyDetail/index.vue'),
        meta: {
          title: '实物产品明细',
          icon: 'cart-plus',
          // affix: true,
        },
      },
      {
        path: 'VirDetail',
        name: 'VirDetail',
        component: () =>
          import('@/views/FinancialDetails/children/virDetail/index.vue'),
        meta: {
          title: '虚拟产品明细',
          icon: 'cart-plus',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/UserManage',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '用户管理', icon: 'user-cog' },
    children: [
      {
        path: 'UserList',
        name: 'UserList',
        component: () => import('@/views/UserManage/children/list/index'),
        meta: {
          title: '用户列表',
          icon: 'user-cog',
          // affix: true,
        },
      },
      {
        path: 'LevelList',
        name: 'LevelList',
        component: () => import('@/views/UserManage/children/userLevel/index'),
        meta: {
          title: '等级管理',
          icon: 'user-plus',
          // affix: true,
        },
      },
      {
        path: 'AdminList',
        name: 'AdminList',
        component: () => import('@/views/UserManage/children/adminList/index'),
        meta: {
          title: '管理员列表',
          icon: 'user-plus',
          // affix: true,
        },
      },
      {
        path: 'Merchants',
        name: 'Merchants',
        component: () => import('@/views/UserManage/children/merchants/index'),
        meta: {
          title: '商家认证',
          icon: 'user-cog',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/ChannelManage',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '通道管理', icon: 'box-open' },
    children: [
      {
        path: 'ChannelList',
        name: 'ChannelList',
        component: () => import('@/views/ChannelManage/children/list/index'),
        meta: {
          title: '通道管理',
          icon: 'cube',
          // affix: true,
        },
      },
      // {
      // path: 'ChannelList',
      // name: 'ChannelList',
      // component: () => import('@/views/ChannelManage/children/list/index'),
      // meta: {
      //   title: '通道管理',
      //   icon: 'cube',
      //   // affix: true,
      // },
      // },
    ],
  },
  //运营商管理src\views\OperatorManage\children\kids\index.vue
  {
    path: '/OperatorManage',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '运营商任务管理', icon: 'box-open' },
    children: [
      {
        path: 'OperatorList',
        name: 'OperatorList',
        component: () => import('@/views/OperatorManage/children/list/index'),
        meta: {
          title: '运营商任务列表',
          icon: 'tasks',
          // affix: true,
        },
      },
      {
        path: 'OperatorKinds',
        name: 'OperatorKinds',
        component: () => import('@/views/OperatorManage/children/kinds/index'),
        meta: {
          title: '运营商任务分类',
          icon: 'tasks',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/RoleManage',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '角色管理', icon: 'box-open' },
    children: [
      {
        path: 'RoleList',
        name: 'RoleList',
        component: () => import('@/views/RoleManage/children/list/index'),
        meta: {
          title: '角色管理',
          icon: 'user-plus',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/PowerManage',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '权限管理', icon: 'box-open' },
    children: [
      {
        path: 'PowerList',
        name: 'PowerList',
        component: () => import('@/views/powerManagement/children/list/index'),
        meta: {
          title: '权限管理',
          icon: 'cube',
          // affix: true,
        },
      },
      {
        path: 'PowerKinds',
        name: 'PowerKinds',
        component: () => import('@/views/powerManagement/children/kinds/index'),
        meta: {
          title: '权限分类',
          icon: 'cube',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/TaskManage',
    component: Layout,
    redirect: 'TaskManage',
    meta: { title: '任务管理', icon: 'tasks' },
    children: [
      {
        path: 'TaskKinds',
        name: 'TaskKinds',
        component: () => import('@/views/TaskManage/children/kinds/index'),
        meta: {
          title: '任务分类',
          icon: 'tasks',
          // affix: true,
        },
      },
      {
        path: 'TaskManage',
        name: 'TaskManage',
        component: () => import('@/views/TaskManage/children/manage/index'),
        meta: {
          title: '任务管理',
          icon: 'tasks',
          // affix: true,
        },
      },
      {
        path: 'TaskCode',
        name: 'TaskCode',
        component: () => import('@/views/TaskManage/children/code/index'),
        meta: {
          title: '二维码库',
          icon: 'tasks',
          // affix: true,
        },
      },
      {
        path: 'TaskInfo',
        name: 'TaskInfo',
        component: () => import('@/views/TaskManage/children/info/index'),
        meta: {
          title: '任务情况',
          icon: 'tasks',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/RotationManage',
    component: Layout,
    redirect: 'RotationManage',
    meta: { title: '轮播图管理', icon: 'tasks' },
    children: [
      {
        path: 'RotationKinds',
        name: 'RotationKinds',
        component: () => import('@/views/RotationManage/children/kinds/index'),
        meta: {
          title: '轮播图分类',
          icon: 'tasks',
          // affix: true,
        },
      },
      {
        path: 'RotationList',
        name: 'RotationList',
        component: () => import('@/views/RotationManage/children/list/index'),
        meta: {
          title: '轮播图管理',
          icon: 'tasks',
          // affix: true,
        },
      },
    ],
  },
  {
    path: '/SystemManage',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: '系统设置', icon: 'box-open' },
    children: [
      {
        path: 'sysDomainName',
        name: 'sysDomainName',
        component: () => import('@/views/SystemManage/DomainName/index'),
        meta: {
          title: '域名设置',
          icon: 'tools',
          // affix: true,
        },
      },
      {
        path: 'userHome',
        name: 'UserHome',
        component: () => import('@/views/userHome/index'),
        meta: {
          title: '个人中心',
          icon: 'home',
        },
      },
      {
        path: 'sysSmsModal',
        name: 'sysSmsModal',
        component: () => import('@/views/SystemManage/SmsModal/index'),
        meta: {
          title: '短信设置',
          icon: 'tools',
          // affix: true,
        },
      },
      {
        path: 'config',
        name: 'SystemConfig',
        component: () => import('@/views/SystemManage/SystemConfig/index'),
        meta: {
          title: '系统配置',
          icon: 'tools',
          // affix: true,
        },
      },
    ],
  },
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */

  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'Vab',
  //   alwaysShow: true,
  //   meta: { title: '组件', icon: 'box-open' },
  //   children: [
  //     {
  //       path: 'permissions',
  //       name: 'Permission',
  //       component: () => import('@/views/vab/permissions/index'),
  //       meta: {
  //         title: '角色权限',
  //         permissions: ['admin', 'editor'],
  //       },
  //     },
  //     {
  //       path: 'icon',
  //       component: EmptyLayout,
  //       redirect: 'noRedirect',
  //       name: 'Icon',
  //       meta: {
  //         title: '图标',
  //         permissions: ['admin'],
  //       },
  //       children: [
  //         {
  //           path: 'awesomeIcon',
  //           name: 'AwesomeIcon',
  //           component: () => import('@/views/vab/icon/index'),
  //           meta: { title: '常规图标' },
  //         },
  //         {
  //           path: 'colorfulIcon',
  //           name: 'ColorfulIcon',
  //           component: () => import('@/views/vab/icon/colorfulIcon'),
  //           meta: { title: '多彩图标' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'table',
  //       component: () => import('@/views/vab/table/index'),
  //       name: 'Table',
  //       meta: {
  //         title: '表格',
  //         permissions: ['admin'],
  //       },
  //     },
  //     {
  //       path: 'map',
  //       component: () => import('@/views/vab/map/index'),
  //       name: 'Map',
  //       meta: {
  //         title: '地图',
  //         permissions: ['admin'],
  //       },
  //     },

  //     {
  //       path: 'webSocket',
  //       name: 'WebSocket',
  //       component: () => import('@/views/vab/webSocket/index'),
  //       meta: { title: 'webSocket', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'form',
  //       name: 'Form',
  //       component: () => import('@/views/vab/form/index'),
  //       meta: { title: '表单', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'element',
  //       name: 'Element',
  //       component: () => import('@/views/vab/element/index'),
  //       meta: { title: '常用组件', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/vab/tree/index'),
  //       meta: { title: '树', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'verify',
  //       name: 'Verify',
  //       component: () => import('@/views/vab/verify/index'),
  //       meta: { title: '验证码', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/vab/nested/menu1/index'),
  //       name: 'Menu1',
  //       alwaysShow: true,
  //       meta: {
  //         title: '嵌套路由 1',
  //         permissions: ['admin'],
  //       },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           name: 'Menu1-1',
  //           alwaysShow: true,
  //           meta: { title: '嵌套路由 1-1' },
  //           component: () => import('@/views/vab/nested/menu1/menu1-1/index'),

  //           children: [
  //             {
  //               path: 'menu1-1-1',
  //               name: 'Menu1-1-1',
  //               meta: { title: '嵌套路由 1-1-1' },
  //               component: () =>
  //                 import('@/views/vab/nested/menu1/menu1-1/menu1-1-1/index'),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'magnifier',
  //       name: 'Magnifier',
  //       component: () => import('@/views/vab/magnifier/index'),
  //       meta: { title: '放大镜', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'loading',
  //       name: 'Loading',
  //       component: () => import('@/views/vab/loading/index'),
  //       meta: { title: 'loading', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'player',
  //       name: 'Player',
  //       component: () => import('@/views/vab/player/index'),
  //       meta: { title: '视频播放器', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'markdownEditor',
  //       name: 'MarkdownEditor',
  //       component: () => import('@/views/vab/markdownEditor/index'),
  //       meta: { title: 'markdown编辑器', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'backToTop',
  //       name: 'BackToTop',
  //       component: () => import('@/views/vab/backToTop/index'),
  //       meta: { title: '返回顶部', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'lodash',
  //       name: 'Lodash',
  //       component: () => import('@/views/vab/lodash/index'),
  //       meta: { title: 'lodash', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'smallComponents',
  //       name: 'SmallComponents',
  //       component: () => import('@/views/vab/smallComponents/index'),
  //       meta: { title: '小组件', permissions: ['admin'] },
  //     },

  //     {
  //       path: 'upload',
  //       name: 'Upload',
  //       component: () => import('@/views/vab/upload/index'),
  //       meta: { title: '上传', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'log',
  //       name: 'Log',
  //       component: () => import('@/views/vab/errorLog/index'),
  //       meta: { title: '错误日志模拟', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
  //       name: 'ExternalLink',
  //       meta: {
  //         title: '外链',
  //         target: '_blank',
  //         permissions: ['admin', 'editor'],
  //         badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'more',
  //       name: 'More',
  //       component: () => import('@/views/vab/more/index'),
  //       meta: { title: '关于', permissions: ['admin'] },
  //     },
  //   ],
  // },
  // {
  //   path: '/personnelManagement',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'PersonnelManagement',
  //   meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
  //   children: [
  //     {
  //       path: 'userManagement',
  //       name: 'UserManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/userManagement/index'),
  //       meta: { title: '用户管理' },
  //     },
  //     {
  //       path: 'roleManagement',
  //       name: 'RoleManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/roleManagement/index'),
  //       meta: { title: '角色管理' },
  //     },
  //     {
  //       path: 'menuManagement',
  //       name: 'MenuManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/menuManagement/index'),
  //       meta: { title: '菜单管理', badge: 'New' },
  //     },
  //   ],
  // },
  {
    path: '/mall',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Mall',
    meta: {
      title: '商城',
      icon: 'shopping-cart',
      permissions: ['admin'],
    },

    children: [
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('@/views/mall/pay/index'),
        meta: {
          title: '支付',
          noKeepAlive: true,
        },
        children: null,
      },
    ],
  },
  // {
  //   path: '/error',
  //   component: EmptyLayout,
  //   redirect: 'noRedirect',
  //   name: 'Error',
  //   meta: { title: '错误页', icon: 'bug' },
  //   children: [
  //     {
  //       path: '401',
  //       name: 'Error401',
  //       component: () => import('@/views/401'),
  //       meta: { title: '401' },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: { title: '404' },
  //     },
  //   ],
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
