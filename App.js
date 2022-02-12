import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import * as Font from 'expo-font';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders';

import ShopNavigator from './navigation/ShopNavigator';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';

import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  orders:orderReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts =()=> {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {


  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded){
    return (
      <AppLoading startAsync={fetchFonts} onFinish={()=> {
        setFontLoaded(true)
      }} onError={console.warn} />
    )
  }

  return (
    <Provider store={store}>
        <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
