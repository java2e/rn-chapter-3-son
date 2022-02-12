import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";


const OrderScreen = props => {

    const orders = useSelector(state => state.orders.orders);

    return (

        <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem= {itemData => (
            <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />
        )}
        />
    )
}

OrderScreen.navigationOptions = navData => {
    return {
    
    headerTitle: 'Siparişler',
    headerLeft: (
        <Ionicons name="menu" size={23} color='white' onPress={()=> {
            navData.navigation.toggleDrawer();
        }} />)
    }
}

export default OrderScreen;