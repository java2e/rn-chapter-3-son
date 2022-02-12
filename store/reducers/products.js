import PRODUCTS from "../../data/dummy-data"
import Product from "../../models/Product";
import { CREATE_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
    avaiableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {

    switch (action.type) {

        case LOAD_PRODUCTS :
            return{
                avaiableProducts:action.products,
                userProducts:action.products.filter(prod => prod.ownerId === 'u1')
            }

        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );

            return {
                ...state,
                avaiableProducts: state.avaiableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:

            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );

            const updateProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );

            const updateUserProducts = [...state.userProducts];

            updateUserProducts[productIndex] = updateProduct;

            const updatedAvaiableProductIndex = state.avaiableProducts.findIndex(
                prod => prod.id === action.pid
            )

            const updatedAvaiableProducts = [...state.avaiableProducts];
            updatedAvaiableProducts[updatedAvaiableProductIndex] = updateProduct;

            return {
                ...state,
                userProducts: updateUserProducts,
                avaiableProducts: updatedAvaiableProducts
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    prod => prod.id !== action.pid
                ),
                avaiableProducts: state.avaiableProducts.filter(
                    prod => prod.id !== action.pid
                )
            }

    }





    return state;
}