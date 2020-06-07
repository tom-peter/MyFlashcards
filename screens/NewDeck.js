import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { addNewDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import Button from '../components/Button';
import Colors from '../constants/Colors'

class NewDeck extends Component {
  state = {
    title: '',
    deckID: null
  }

  // handle input field
  handleInput = (title) => this.setState({ title })

  // show submit button only if field not empty
  submitButton = () => {
    if (this.state.title !== '') {
      return (
        <View style={styles.buttonContainer} >
          <Button
            icon="md-add"
            label="Create new deck"
            onPress={this.handleSubmit}
          />
        </View>
      )
    }
  }

  // save data to async storage and redux store
  handleSubmit = () => {
    const title = this.state.title;

    // add deck to async storage
    saveDeckTitle(title)
    .then((id) => {
      // add deck to redux store
      this.props.dispatch(addNewDeck(id, title));
      this.setState({ deckID: id });
    })
    .then(() => {
      // reset fields and go to the new deck
      this.setState({ title: '' });
      this.state.deckID 
        ? this.props.navigation.navigate('SingleDeck', { deckID : this.state.deckID})
        : this.props.navigation.goBack();
    })   
  }

  render() {
  
  return (
    <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>What should be the title of your new deck?</Text>
    </View>
    <KeyboardAvoidingView style={styles.inputContainer} behavior='padding'>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={this.handleInput}
          multiline={false}
          placeholder="Deck title"
          autoFocus={true}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
      </KeyboardAvoidingView>

      { this.submitButton() }

  </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.fontGrey,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: 'space-around',
    marginHorizontal: 20
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.inputBorder,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default connect()(NewDeck)