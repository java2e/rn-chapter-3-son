
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import ProductOverViewScreen from "../screens/shop/ProductOveriewScreen";

import Colors from '../constants/Colors';

import { Platform } from "react-native";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CardScreen from "../screens/shop/CardScreen";
import { Ionicons } from "@expo/vector-icons";
import OrderScreen from "../screens/shop/OrderScreen";
import { createDrawerNavigator } from "react-navigation-drawer";


const defaulNavOptions = {
    headerStyle: {
        backgroundColor: Colors.color1
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
}


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CardScreen
},
    {

       navigationOptions: {
           drawerIcon : drawerConfig => (
               <Ionicons 
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
               />
           )
       },
       defaultNavigationOptions: defaulNavOptions
    }
)

const OrdersNavigator = createStackNavigator(
    {
        Orders : OrderScreen
    },
    {
    navigationOptions: {
        drawerIcon : drawerConfig => (
            <Ionicons 
                 name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                 size={23}
                 color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaulNavOptions
 }
)


const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders : OrdersNavigator
    },
    {
        contentOptions : {
            activeTintColor : 'red'
        }
    }
)

export default createAppContainer(ShopNavigator);