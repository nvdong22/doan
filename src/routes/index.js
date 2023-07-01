import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Produce from '~/pages/Produce';
import Profile from '~/pages/Profile';
import Category from '~/pages/category';
const publishRoutes = [
    { path: '/', component: Category },
    { path: '/cart', component: Cart },
    { path: '/produce', component: Produce },
    { path: '/profile', component: Profile },
];
const privareRoutes = [];

export { publishRoutes, privareRoutes };
