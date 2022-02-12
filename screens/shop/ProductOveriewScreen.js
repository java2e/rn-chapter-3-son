import { FlatList,Text } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartActions from '../../store/actions/Cart';
import { Ionicons } from "@expo/vector-icons";


const ProductOverViewScreen = props => {


    const product = useSelector(state => state.products.avaiableProducts);

    const dispatch= useDispatch();

    return <FlatList
            data={product}
            keyExtractor = {item => item.id}
            renderItem= {
                itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={()=>{
                    props.navigation.navigate('ProductDetail',{productId:itemData.item.id,productTitle:itemData.item.title})
                }}
                onAddToCart={()=>{
                    dispatch(cartActions.onAddToCart(itemData.item))
                }}
                />
            }
    />

}

ProductOverViewScreen.navigationOptions = navData => {
    return {
    headerTitle : "Bütün Ürünler",
    headerLeft : (<Ionicons name="menu" size={23} color="white" onPress={() => {
        navData.navigation.toggleDrawer();
    }} />),
    headerRight: () => ( <Ionicons name="cart" size={23} color='white' onPress={()=> {
        navData.navigation.navigate('Cart')
    }} />)
}
}

export default ProductOverViewScreen;