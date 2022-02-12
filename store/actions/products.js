import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';



export const fetchProducts = () => {
    return async dispatch => {

        console.log("fetch!!!")
        const response = await fetch("https://rntest-e8907-default-rtdb.firebaseio.com/products.json");

        const resData = await response.json();

        console.log(resData);

        const loadedProducts = [];

        for(const key in resData) {

            loadedProducts.push(
                new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                )
            );
        }

        dispatch({type: LOAD_PRODUCTS, products: loadedProducts});
    }
}


export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT, pid:productId}
}

export const createProduct = (title,description,imageUrl,price) => {

    return {
        type: CREATE_PRODUCT,
        productData : {
            title,
            description,
            imageUrl,
            price
        }
    }
}

export const updateProduct = (id,title,description,imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title,
            description,
            imageUrl
        }
    }
}