import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

// dev: reset decks in async storage
import { resetDecks } from '../utils/api'

class DeckList extends Component {
  // state = {
  //   decks: null
  // }

  componentDidMount() {
    
    // dev: reset decks in async storage
    // resetDecks()
    getDecks()
    .then((decks) => {
      this.props.dispatch(receiveDecks(decks))      
    });
    
  }

  listDecks() {
    const { navigation, decks } = this.props;

    return (
      <View>
      { Object.keys(decks).map((id) => (
        <RectButton 
          key={id} 
          style={[styles.button]} 
          onPress={() => navigation.navigate('SingleDeck', { deckID : id})}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.buttonIconContainer}>
              <MaterialCommunityIcons name="cards" size={32} color="rgba(0,0,0,0.35)" />
            </View>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>{decks[id].title}</Text>
              <Text style={styles.buttonText}>{decks[id].questions.length} card{decks[id].questions.length > 1 && 's'}</Text>
            </View>
          </View>
        </RectButton>
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
        <View style={styles.welcomeContainer}>
          <Text style={styles.getStartedText}>Decks</Text>
          <Text style={styles.getStartedText}>Select a deck or create a new one.</Text>
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
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },


  button: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  buttonIconContainer: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },

});

function mapStateToProps(state) {
  console.log('mapStateToProps: ', state);
  return ( state === null ) ? { decks: null } : { decks: state };
}

export default connect(mapStateToProps)(DeckList)