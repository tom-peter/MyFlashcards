import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Colors from '../constants/Colors'

// DEV: reset decks in async storage
import { resetDecks, checkAsyncStorage } from '../utils/api'

class DeckList extends Component {

  componentDidMount() {
    
    // DEV: reset decks in async storage
    // resetDecks()
    getDecks()
    .then((decks) => {
      this.props.dispatch(receiveDecks(decks))      
    });
    
    checkAsyncStorage();
  }

  listDecks() {
    const { navigation, decks } = this.props;

    return (
      <View>
      { Object.keys(decks).map((id) => (
        <View style={styles.listContainer} key={id}>
          <RectButton 
            key={id} 
            style={styles.list}
            onPress={() => navigation.navigate('SingleDeck', { deckID : id})}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.listIconContainer}>
                <MaterialCommunityIcons name="cards" size={32} color={Colors.mainColor1} />
              </View>
              <View style={styles.listTextContainer}>
                <Text style={styles.listHeader}>{decks[id].title}</Text>
                <Text style={styles.listText}>{decks[id].questions.length} card{decks[id].questions.length > 1 && 's'}</Text>
              </View>
            </View>
          </RectButton>
        </View>
      ))}  
      </View>
    )
  }

  render() {

  console.log('DeckList props: ', this.props);
  const { navigation, decks } = this.props;


  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.h2}>Decks</Text>
          <Text style={styles.text}>Select a deck or create a new one.</Text>
        </View>

        {decks !== null && this.listDecks()}

      </ScrollView>
    </View>
  );

  }
}

DeckList.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
  },
  contentContainer: {
    paddingTop: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  h2: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.fontGrey,
    lineHeight: 20,
    textAlign: 'center',
  },

  listContainer: {
    backgroundColor: Colors.bgWhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#cccccc',
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  listIconContainer: {
    justifyContent: 'center',
    marginRight: 15,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: "700",
    alignSelf: 'flex-start',
  },
  listText: {
    fontSize: 15,
    color: Colors.fontGrey,
    alignSelf: 'flex-start',
  },
});

function mapStateToProps(state) {
  console.log('mapStateToProps: ', state);
  return ( state === null ) ? { decks: null } : { decks: state };
}

export default connect(mapStateToProps)(DeckList)