import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import dashboardVue from "../views/dashboard.vue";

const routesData: RouteRecordRaw[] = [
    { path: '', redirect: '/dashborad' },
    { path: '/dashborad', component: dashboardVue }
];

export const routes = createRouter({
    routes: routesData,
    history: createWebHistory(),
})