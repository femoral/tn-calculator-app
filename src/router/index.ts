import { createRouter, createWebHistory } from 'vue-router';
import guard from './guard';

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
];

const router = guard(
  createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })
);

export { router };
