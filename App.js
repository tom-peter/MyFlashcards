import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { setLocalNotification } from './utils/notifications';
import reducer from './reducers'
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import SingleDeck from './screens/SingleDeck';
import NewCard from './screens/NewCard';
import Quiz from './screens/Quiz';
import Colors from './constants/Colors'

const Stack = createStackNavigator();

export default class App extends Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {

    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: Colors.mainColor1,
                },
                headerTitleAlign: 'center',
                headerTintColor: '#ffffff'
              }}
            >
              <Stack.Screen name="Root" component={BottomTabNavigator} />
              <Stack.Screen name="SingleDeck" component={SingleDeck} />
              <Stack.Screen name="NewCard" component={NewCard} options={{ title: 'Add new card' }} />
              <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }

  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
  },
});
