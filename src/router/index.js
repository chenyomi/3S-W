import { createRouter, createWebHistory } from 'vue-router'

export const constRouter =  [
  {
    path: '/monitor',
    meta: {
      name: '监控',
    },
    icon: 'bxl-deezer',
    component: () => import('../pages/monitor-machine.vue'),
  },
  {
    path: '/tasklist',
    meta: {
      name: '任务列表',
    },
    icon: 'bx-sidebar',
    component: () => import('../pages/task-list.vue'),
  },
  {
    path: '/task',
    meta: {
      name: '任务',
    },
    icon: 'bxs-zap',
    component: () => import('../pages/task-type.vue'),
  },
  {
    path: '/drawer',
    meta: {
      name: '储位',
    },
    icon: 'bx-shape-square',
    component: () => import('../pages/drawer.vue'),
  },
  {
    path: '/pallet',
    meta: {
      name: '托盘',
    },
    icon: 'bxs-hard-hat',
    component: () => import('../pages/pallet.vue'),
  },
]
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/monitor' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        ...constRouter,
        {
          path: '/process',
          meta: {
            name: '加工',
            menuActiveName: '任务',
          },
          children: [
            {
              path: 'product',
              meta: {
                name: '物料',
              },
              component: () => import('../pages/task-product.vue'),
            },
            {
              path: 'eqpt',
              meta: {
                name: '设备',
              },
              component: () => import('../pages/task-eqpt.vue'),
            },
            {
              path: 'frock',
              meta: {
                name: '工装',
              },
              component: () => import('../pages/task-frock.vue'),
            },
            {
              path: 'drawer',
              meta: {
                name: '储位',
              },
              component: () => import('../pages/task-drawer.vue'),
            },
          ],
        },
        {
          path: '/setting',
          meta: {
            name: '设置',
          },
          children: [
            {
              path: 'eqpt',
              meta: {
                name: '设备',
              },
              component: () => import('../pages/setting-eqpt.vue'),
            },
            {
              path: 'drawer',
              meta: {
                name: '储位',
              },
              component: () => import('../pages/setting-drawer.vue'),
            },
            {
              path: 'clamp',
              meta: {
                name: '夹具',
              },
              component: () => import('../pages/setting-clamp.vue'),
            },
            {
              path: 'pallet',
              meta: {
                name: '托盘',
              },
              component: () => import('../pages/setting-pallet.vue'),
            },
            {
              path: 'secure',
              meta: {
                name: '安全',
              },
              component: () => import('../pages/setting-secure.vue'),
            },
          ],
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
       
      ],
    },
  ],
})

