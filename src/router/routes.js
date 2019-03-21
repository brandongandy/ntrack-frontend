const routes = [
  {
    path: '/',
    component: () => import('../layouts/Main.vue'),
    children: [
      { path: '', redirect: 'index' },
      {
        path: '/index',
        component: () => import('../pages/Index.vue')
      },
      {
        path: '/projects',
        component: () => import('../pages/Projects.vue')
      },
      {
        path: '/new-project',
        component: () => import('../pages/ProjectEdit.vue')
      },
      {
        path: '/edit-project/:id',
        component: () => import('../pages/ProjectEdit.vue')
      },
      {
        path: '/project/:id',
        component: () => import('../pages/Project.vue')
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
