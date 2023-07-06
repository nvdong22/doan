import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/ProductSlide';
import userReducer from './slides/userSlide';

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    },
});
