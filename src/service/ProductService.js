import axios from 'axios';

export const getAllProducts = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getall`, data);
    return res.data;
};
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};
