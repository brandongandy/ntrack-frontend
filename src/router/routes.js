import Index from '@/pages/Index'
// import Account from '@/pages/Account'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/Main.vue'),
    children: [
      { path: '', redirect: 'index' },
      {
        path: '/index',
        component: Index
      },
      {
        path: '/projects',
        component: () => import('@/pages/Projects.vue')
      },
      {
        path: '/project/:id',
        component: () => import('@/pages/Project.vue')
      }
    ]
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('../components/Callback.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/Login.vue')
  }
]

export default routes
