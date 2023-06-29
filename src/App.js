import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { privateRoutes, publishRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { isJsonString } from './ultil';
import * as UserService from '~/service/UserService';
import { updateUser } from '~/redux/slides/userSlide';
import Loading from './components/LoadingComponent';
function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user);
    console.log(user.isAdmin);

    useEffect(() => {
        setIsLoading(true);
        let { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailUser(decoded?.id, storageData);
        }
        setIsLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwt_decode(storageData);
        }
        return { decoded, storageData };
    };

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                config.headers['token'] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };
    return (
        <Loading isLoading={isLoading}>
            <Router>
                <div className="App">
                    <Routes>
                        {publishRoutes.map((route, index) => {
                            let Layout = route.layout || DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {privateRoutes.map((route, index) => {
                            let Layout = route.layout || DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const routePatch = route.path;

                            if (!route.isPrivate || !user.isAdmin || user.email === null) {
                                return routePatch;
                            }

                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={routePatch}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Loading>
    );
}

export default App;
