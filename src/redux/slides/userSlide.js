import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    city: '',
    access_token: '',
    isAdmin: false,
    refreshToken: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { _id = '', name = '', email = '', address = '', phone = '', avatar = '', access_token = '', city = '', isAdmin, refreshToken = '' } = action.payload;
            state.id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.city = city;
            state.avatar = avatar;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.refreshToken = refreshToken;
        },
        resetUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.access_token = '';
            state.city = '';
            state.isAdmin = false;
            state.refreshToken = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
