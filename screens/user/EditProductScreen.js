import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput,View } from "react-native";
import { useSelector } from "react-redux";


const EditProductScreen = props => {

  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId));


  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');

  return (

    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={text => setTitle(text)}
            style={styles.input} />
        </View>
      </View>
    </ScrollView>

  )
}


const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }

})

export default EditProductScreen;