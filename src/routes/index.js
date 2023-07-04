import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Produce from '~/pages/Produce';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Admin from '~/pages/Admin';
import NotFoundPage from '~/pages/NotFoundPage';
import Detail from '~/pages/Detail';

import Category from '~/pages/category';
const publishRoutes = [
    { path: '/', component: Home },
    { path: '/category', component: Category },

    { path: '/cart', component: Cart },
    { path: '/produce', component: Produce },
    { path: '/profile', component: Profile },
    { path: '/detail', component: Detail },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '*', component: NotFoundPage, layout: null },
];
const privateRoutes = [{ path: '/system/admin', component: Admin, layout: null, isPrivate: true }];

export { publishRoutes, privateRoutes };
