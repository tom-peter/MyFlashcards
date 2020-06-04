import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import SingleDeck from './screens/SingleDeck';
import NewCard from './screens/NewCard';
import Quiz from './screens/Quiz';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#ff6600',
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
