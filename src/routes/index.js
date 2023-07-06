import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Produce from '~/pages/Produce';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Admin from '~/pages/Admin';
import NotFoundPage from '~/pages/NotFoundPage';
import SearchPage from '~/pages/SearchPage';
import Category from '~/pages/Category';

const publishRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/product/:id', component: Produce },
    { path: '/profile', component: Profile },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/search', component: SearchPage },
    { path: '/category/:type', component: Category },

    { path: '*', component: NotFoundPage, layout: null },
];
const privateRoutes = [{ path: '/system/admin', component: Admin, layout: null, isPrivate: true }];

export { publishRoutes, privateRoutes };
