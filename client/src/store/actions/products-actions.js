import axios from 'axios';
import { productsActions } from '../products-slice';
import api from '../../utils/api';


export const getProducts = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8000/api/products');

            const data = await response.data;
            return data;
        };

        try {
            const products = await fetchData();

            dispatch(productsActions.replaceProducts(products));
            
        } catch (error) {
            console.log('failed to fetch products');
        }
    }
};


export const getProductDetails = (id) => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/api/products/${id}`);

            const data = await response.data;
            return data;
        };

        try {
            const productDetails = await fetchData();
            dispatch(productsActions.setProductDetails(productDetails));
        } catch (error) {
            console.log('failed to fetch product details');
        }
    }

};


export const addProduct = ({ product, token }) => {
    return async dispatch => {
        await api.get('/sanctum/csrf-cookie');
        

        const postData = async () => {
            const response = await axios.post('http://localhost:8000/api/products', product, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,
                    },
                    withCredentials: true
                });
            const data = response.data;
            return data;
        };

        try {
            const message = await postData();
            console.log('message : ', message);
            dispatch(getProducts());
            // dispatch(productsActions.addProduct(product));
            
        } catch (error) {
            console.log(error);
        }
    };
};





export const updateProduct = ({ product, id, token }) => {
    return async dispatch => {

        await api.get('/sanctum/csrf-cookie');
        console.log('product : ', product);
        console.log('id : ', id);
        console.log('token : ', token);

        const putData = async () => {
            const response = await api.put(`/api/products/${id}`, product, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const data = response.data;
            return data;
        };

        try {
            const product = await putData();
            console.log(product);
            dispatch(getProducts());
            
        } catch (error) {
            console.log(error);
        }

    };
};














