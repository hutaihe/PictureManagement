import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import('@/views/index'),
    children: [
      {
        path: "",
        component: () => import('@/components/home')
      },
      {
        path: "/user/webuser",
        component: () => import('@/components/user/WebUser')
      },
      {
        path: "/user/adminuser",
        component: () => import('@/components/user/AdminUser')
      },
      {
        path: "/user/rolelist",
        component: () => import('@/components/user/RoleList')
      },
      {
        path: "/user/aaa",
        component: () => import('@/components/user/aaa')
      }
    ]
  }

];
const router = new VueRouter({
  routes
});

export default router;
