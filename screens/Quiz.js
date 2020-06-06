import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import CardFlip from 'react-native-card-flip';



class QuizCard extends Component {
  state = {
    qSide: true
  }

  flipCard = () => {
    this.card.flip();
    this.setState((prevState) => ({ qSide: !prevState.qSide }));
  }

  render() {

    return (
      <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Question:</Text>
            <Text style={styles.text}>??? out of ZZZ</Text>
          </View>

            <CardFlip 
              style={styles.cardContainer} 
              ref={card => (this.card = card)} 
              duration={333}
              flipZoom={0.2} 
              perspective={1500}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.card, styles.card1]}
                onPress={this.flipCard}>
                <Text style={styles.cardText}>Very-very-very very-very very-very-very very-very very-very-very long question?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.card, styles.card2]}
                onPress={this.flipCard}>
                <Text style={styles.cardText}>CD</Text>
              </TouchableOpacity>
            </CardFlip>
            
          <View style={styles.textContainer}>
            <Text style={styles.text}>Tap the card to see the 
              { this.state.qSide ? ' answer.' : ' question.' }
            </Text>
          </View>

      </View>
      
    );
  }
}


export default class Quiz extends Component {
  // state = {
  //   qSide: true
  // }


  render() {

    return (
      <View style={styles.container}>
        <QuizCard/>

          <View>
            <TouchableOpacity onPress={() => alert('click!')} >
              <Text>Yes</Text>
            </TouchableOpacity>
          </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 18,
    textAlign: 'center',
  },
  cardContainer: {
    // flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    minHeight: 160,
    marginTop: 0,
    marginBottom: 0,
  },
  card: {
    width: Dimensions.get('window').width * 0.8,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,

    backgroundColor: '#FE474C',
    borderRadius: 5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  cardText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },

})
