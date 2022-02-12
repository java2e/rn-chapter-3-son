import { FlatList, Text, Button, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartActions from '../../store/actions/Cart';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import * as productActions from '../../store/actions/products';


const ProductOverViewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const product = useSelector(state => state.products.avaiableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            await dispatch(productActions.fetchProducts());
            setIsLoading(false)
        }
        loadProducts();
    }, [dispatch])

    if(isLoading) {
        return (
            <View>
                <Text>Loading!!!</Text>
            </View>
        )
    }

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }


    return <FlatList
        data={product}
        keyExtractor={item => item.id}
        renderItem={
            itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button
                    color={Colors.color1}
                    title="Detay"
                    onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                />
                <Button
                    color={Colors.color1}
                    title="Sepete At"
                    onPress={() => {
                        dispatch(cartActions.onAddToCart(itemData.item));
                    }}
                />


            </ProductItem>
        }
    />

}

ProductOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: "Bütün Ürünler",
        headerLeft: (<Ionicons name="menu" size={23} color="white" onPress={() => {
            navData.navigation.toggleDrawer();
        }} />),
        headerRight: () => (<Ionicons name="cart" size={23} color='white' onPress={() => {
            navData.navigation.navigate('Cart')
        }} />)
    }
}

export default ProductOverViewScreen;