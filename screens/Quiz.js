import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Quiz() {
  return (
    <View style={styles.container}>
        <View>
          <Text>Sample text</Text>
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
  }
})
