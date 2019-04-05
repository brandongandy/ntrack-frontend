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
        path: '/projects/all',
        component: () => import('@/pages/ProjectList.vue')
      },
      {
        path: '/projects/view/:id',
        component: () => import('@/pages/Project.vue')
      },
      {
        path: '/projects/edit/:id',
        component: () => import('@/pages/ProjectEdit.vue')
      },
      {
        path: '/projects/new',
        component: () => import('@/pages/ProjectEdit.vue')
      },
      {
        path: '/users/me',
        component: () => import('@/pages/Account.vue')
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
