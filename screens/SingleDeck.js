import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Button from '../components/Button';

class SingleDeck extends Component {

  render() {

    const { navigation, decks } = this.props;
    const deckID = this.props.route.params.deckID;
    const deck = decks[deckID];

    // set the header based on the deck name
    navigation.setOptions({ title: `${deck.title} deck` })

    // console.log('single props: ', this.props);
    console.log('single / deckID: ', deckID);
    console.log('single deck: ', deck);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.buttonText}>{deck.questions.length} card{deck.questions.length > 1 && 's'} in the deck</Text>
      </View>
      <View style={styles.buttonContainer} >
        <Button
          icon="ios-chatboxes"
          label="Add a new card"
          onPress={() => navigation.navigate('NewCard', { deckID : deckID})}
          bgColor="#ff0000"
        />

        <Button
          icon="ios-chatboxes"
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
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
})

function mapStateToProps(state) {
  console.log('mapStateToProps: ', state);
  

  return ( state === null ) ? { decks: null } : { decks: state };
}

export default connect(mapStateToProps)(SingleDeck)
