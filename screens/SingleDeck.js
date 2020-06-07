import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';

import Button from '../components/Button';
import Colors from '../constants/Colors'

class SingleDeck extends Component {

  render() {

    const { navigation, decks } = this.props;
    const deckID = this.props.route.params.deckID;
    const deck = decks[deckID];

    // set the header based on the deck name
    // set the back button to go back to DeckList, even if came from NewDeck
    navigation.setOptions({ 
      title: `${deck.title} deck`,
      headerLeft: () => (<HeaderBackButton onPress={() => navigation.navigate('Decks')} />) 
    })

    // console.log('single props: ', this.props);
    console.log('single / deckID: ', deckID);
    console.log('single deck: ', deck);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>You have {deck.questions.length} card{deck.questions.length > 1 && 's'} in the {deck.title} deck.</Text>
      </View>
      <View style={styles.buttonContainer} >
        <Button
          icon="md-add"
          label="Add a new card"
          onPress={() => navigation.navigate('NewCard', { deckID : deckID})}
          color="#fff"
          bgColor="#66f"
        />
      </View>
      <View style={styles.buttonContainer} >
        <Button
          icon="ios-school"
          label="Start quiz"
          onPress={() => navigation.navigate('Quiz', { deckID : deckID})}
        />
      </View>
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
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.fontGrey,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
})

function mapStateToProps(state) {
  console.log('mapStateToProps: ', state);

  return ( state === null ) ? { decks: null } : { decks: state };
}

export default connect(mapStateToProps)(SingleDeck)
