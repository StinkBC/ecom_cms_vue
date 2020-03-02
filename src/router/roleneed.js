export default [
  // 商品
  {
    path: '/goods',
    component: () => import('@views/Index'),
    name: '商品管理',
    hidden: false,
    children: [
      {
        path: '/item',
        name: '宝贝管理',
        hidden: false,
        meta: { keepAlive: true },
        children: [
          {
            path: '/item/list',
            name: '宝贝列表',
            hidden: false,
            meta: { keepAlive: true },
            component: () => import('@views/item/item_list.vue')
          },
          {
            path: '/item/editor/:id',
            name: '宝贝编辑',
            hidden: true,
            meta: { keepAlive: true },
            component: () => import('@views/item/item_editor.vue')
          },
          {
            path: '/item/price',
            name: '价格管理',
            hidden: false,
            meta: { keepAlive: true },
            component: () => import('@views/item/price_admin.vue')
          }
        ]
      }

    ]
  },
  // 营销
  {
    path: '/activity',
    component: () => import('@views/Index'),
    name: '营销管理',
    hidden: false,
    children: [
      {
        path: '/coupon',
        name: '优惠券管理',
        hidden: false,
        meta: { keepAlive: true },
        children: [
          {
            path: '/coupon/list',
            name: '优惠券列表',
            hidden: false,
            meta: { keepAlive: true },
            component: () => import('@views/coupon/coupon_list.vue')
          },
          {
            path: '/coupon/editor/:id',
            name: '优惠券编辑',
            hidden: true,
            meta: { keepAlive: true },
            component: () => import('@views/coupon/coupon_editor.vue')
          }
        ]
      },
      {
        path: '/group',
        name: '营销商品组',
        hidden: false,
        meta: { keepAlive: true },
        children: [
          {
            path: '/group/list',
            name: '商品组列表',
            hidden: false,
            meta: { keepAlive: true },
            component: () => import('@views/activity_group/group_list.vue')
          },
          {
            path: '/group/editor/:id',
            name: '商品组编辑',
            hidden: true,
            meta: { keepAlive: true },
            component: () => import('@views/activity_group/group_list.vue')
          }
        ]
      },

      {
        path: '/h',
        name: '页面制作工具',
        hidden: false,
        meta: { keepAlive: true },
        children: [
          {
            path: '/h/list',
            name: '营销页面',
            hidden: false,
            meta: { keepAlive: true },
            component: () => import('@views/html_buliter/pages_list.vue')
          },
          {
            path: '/h/template',
            name: '营销模板',
            hidden: false,
            meta: { keepAlive: true },
            component: () => import('@views/html_buliter/template_list.vue')
          }
        ]
      }
    ]
  },
  //   数据中心
  {
    path: '/data',
    component: () => import('@views/Index'),
    name: '数据中心',
    hidden: false,
    children: [
      {
        path: '/data/sample',
        name: '数据展示样板',
        hidden: false,
        meta: { keepAlive: true },
        component: () => import('@views/data_center/datas_sample.vue')
      },
      {
        path: '/data/screen',
        name: '数据大屏',
        hidden: false,
        meta: { keepAlive: true },
        component: () => import('@views/data_center/big_screen.vue')
      }
    ]
  }
]
