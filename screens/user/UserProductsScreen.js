import { Ionicons } from "@expo/vector-icons";
import { Alert, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import Colors from "../../constants/Colors";
import * as productActions from '../../store/actions/products';


const UserProductScreen = props => {

  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  }

  const deleteHandler = (id) => {

    Alert.alert("Eminmisiniz ?", " Ürünü silmek istiyormusunuz", [
      { text: 'Hayır', style: 'default' },
      {
        text: 'Evet',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        }
      }
    ])
  }

  return (

    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={
        itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >

            <Button color={Colors.color1} title="Düzenle" onPress={() => {
              editProductHandler(itemData.item.id)
            }} />
            <Button color={Colors.color1} title="Sil" onPress={deleteHandler.bind(this, itemData.item.id)} />

          </ProductItem>

        )
      }

    />

  )
}

UserProductScreen.navigationOptions = navData => {

  return {
    headerTitle: 'Ürünlerim',
    headerLeft: (<Ionicons name="menu" size={23} color="white" onPress={() => {
      navData.navigation.toggleDrawer();
    }} />),
    headerRight: () => (<Ionicons name="ios-create" size={23} color='white' onPress={() => {
      navData.navigation.navigate('EditProduct')
    }} />)
  }


}

export default UserProductScreen;