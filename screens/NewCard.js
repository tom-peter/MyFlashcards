import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { addNewCard } from '../actions';
import { addCardToDeck } from '../utils/api';
import Button from '../components/Button';
import Colors from '../constants/Colors'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  
  // handle input fields
  handleQuestion = (question) => this.setState({ question })
  handleAnswer = (answer) => this.setState({ answer })

  // show submit button only if field not empty
  submitButton = () => {
    if ( ['', '\r', '\n'].includes(this.state.question) ) return;
    if ( ['', '\r', '\n'].includes(this.state.answer) ) return;
    return (
      <View style={styles.buttonContainer} >
        <Button
          icon="md-add"
          label="Add card to the deck"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }

  // save data to async storage and redux store
  handleSubmit = () => {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    const deckID = this.props.route.params.deckID;

    // add card to async storage
    addCardToDeck(deckID, card)
    .then(() => {
      // add card to redux store
      this.props.dispatch(addNewCard(deckID, card));
    })
    // reset fields and go back
    this.setState({ question: '', answer: '' });
    this.props.navigation.goBack();
  }

  render() {

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.inputContainer} behavior='padding'>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestion}
              multiline={true}
              numberOfLines={2}
              textAlignVertical="top" 
              placeholder="Question"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswer}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Answer"
              returnKeyType="done"
              ref={(input) => { this.secondTextInput = input; }}
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
    alignItems: 'stretch',
    backgroundColor: Colors.bgWhite,
  },
  inputContainer: {
    justifyContent: 'space-around'
  },
  input: {
    fontSize: 18,
    margin: 15,
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
})

export default connect()(NewCard)
