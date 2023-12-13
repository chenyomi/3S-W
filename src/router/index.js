import { createRouter, createWebHistory } from 'vue-router'

export const constRouter =  [
  {
    path: 'monitor',
    meta: {
      name: '监控',
    },
    icon: 'bxl-deezer',
    redirect: '/monitor/machine',
    children: [
      {
        path: 'machine',
        meta: {
          name: '监控',
        },
        component: () => import('../pages/monitor-machine.vue'),
      },
    ],
  },
  {
    path: 'tasklist',
    meta: {
      name: '任务列表',
    },
    component: () => import('../pages/tasklist.vue'),
  },
  {
    path: 'task',
    meta: {
      name: '任务',
    },
    component: () => import('../pages/task.vue'),
  },
  {
    path: 'drawer',
    meta: {
      name: '储位',
    },
    component: () => import('../pages/drawer.vue'),
  },
  {
    path: 'pallet',
    meta: {
      name: '托盘',
    },
    component: () => import('../pages/pallet.vue'),
  },
]


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/monitor/machine' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        ...constRouter,

        {
          path: 'setting',
          meta: {
            name: '设置',
          },
          children: [
            {
              path: 'drawer',
              meta: {
                name: '储位',
              },
              component: () => import('../pages/setting-drawer.vue'),
            },
            {
              path: 'eqpt',
              meta: {
                name: '设备',
              },
              component: () => import('../pages/setting-eqpt.vue'),
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

