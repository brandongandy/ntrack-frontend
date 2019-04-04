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
        component: () => import('@/pages/ProjectList.vue')
      },
      {
        path: '/project/view/:id',
        component: () => import('@/pages/Project.vue')
      },
      {
        path: '/project/edit/:id',
        component: () => import('@/pages/ProjectEdit.vue')
      },
      {
        path: '/project/new',
        component: () => import('@/pages/ProjectEdit.vue')
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
