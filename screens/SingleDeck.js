import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from '../components/Button';

export default function SingleDeck({ navigation }) {
  return (
    <View style={styles.container}>
        <View>
          <Text>Sample text</Text>
        </View>
      <View style={styles.buttonContainer} >
        <Button
          icon="ios-chatboxes"
          label="Add a new card"
          onPress={() => navigation.navigate('NewCard')}
          bgColor="#ff0000"
        />

        <Button
          icon="ios-chatboxes"
          label="Start quiz"
          onPress={() => navigation.navigate('Quiz')}
        />
      </View>
        <View>
          <TouchableOpacity onPress={() => alert('click!')} >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
})
