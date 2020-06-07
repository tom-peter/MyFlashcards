import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';


export default function Button({ icon, label, onPress, color, bgColor }) {
  const colorStyles = { 
    color: color || Colors.fontWhite,
    backgroundColor: bgColor || Colors.buttonBg
  }

  return (
    <RectButton style={[styles.button, colorStyles]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.buttonIconContainer}>
          <Ionicons name={icon} size={22} color={colorStyles.color} />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.buttonText, colorStyles]}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 7,
    borderColor: '#ededed',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginRight: 12,
  },
  buttonText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

