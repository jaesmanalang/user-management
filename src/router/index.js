import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/users/UserList.vue';
import AddUser from '../views/users/AddUser.vue';
import EditUser from '../views/users/EditUser.vue';

const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: AddUser,
  },
  {
    path: '/users/edit/:id',
    name: 'EditUser',
    component: EditUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
