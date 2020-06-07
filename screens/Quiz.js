import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';

import Button from '../components/Button';
import Colors from '../constants/Colors'

class Quiz extends Component {
  state = {
    inProgress: true,
    index: 0,
    correct: 0,
    incorrect: 0,
    qSide: true
  }

  // ---------- QUIZ IN PROGRESS ----------

  // Flip the card and set its state
  flipCard = () => {
    this.card.flip();
    this.setState((prevState) => ({ qSide: !prevState.qSide }));
  }

  // Render view while the quiz is in progress
  quizCard(currentQuestion, qActual, qTotal) {
    let qRemaining = qTotal - qActual + 1;

    return (
      <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Questions remaining:</Text>
            <Text style={styles.text}>{`${qRemaining} (out of ${qTotal})`}</Text>
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
                <Text style={styles.cardText}>{currentQuestion.question}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.card, styles.card2]}
                onPress={this.flipCard}>
                <Text style={styles.cardText}>{currentQuestion.answer}</Text>
              </TouchableOpacity>
            </CardFlip>
            
          <View style={styles.textContainer}>
            <Text style={styles.text}>Tap the card to see the 
              { this.state.qSide ? ' answer.' : ' question.' }
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Please mark your guess:</Text>
          </View>

          <View style={styles.buttonContainer} >
          <Button
            icon="ios-checkmark"
            label="Correct"
            onPress={() => this.handleAnswer('correct')}
          />
          <Button
            icon="ios-close"
            label="Incorrect"
            onPress={() => this.handleAnswer('incorrect')}
            bgColor="#ff0000"
          />
        </View>
      </View>
      
    );
  }

  // Handle buttons during the quiz
  handleAnswer(answer) {
    const deckID = this.props.route.params.deckID;
    const qTotal = this.props.decks[deckID].questions.length;

    // correct or incorrect?
    answer === 'correct'
      ? this.setState((prevState) => ({ correct: prevState.correct + 1 }))
      : this.setState((prevState) => ({ incorrect: prevState.incorrect + 1 }));

    // is the answer is visible, flip the card back
    !this.state.qSide && this.flipCard();
      
    // last question or not?
    // if not, wait for the card to flip back to avoid showing the next answer
    qTotal === this.state.index + 1
      ? this.setState({ inProgress: false })
      : setTimeout(() => { 
          this.setState((prevState) => ({ index: prevState.index + 1 })) 
        }, 166); 
  }


  // ---------- QUIZ IS FINISHED ----------  

  // Render view when the quiz is finished
  quizResult(qCorrect, qTotal) {

    const qCorrectPerc = Math.round(qCorrect / qTotal * 10000) / 100;

    return (
      <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Correct questions:</Text>
            <Text style={styles.text}>{`${qCorrect} out of ${qTotal}`}</Text>
            <Text style={styles.text}>{` ${qCorrectPerc}%`}</Text>
          </View>

          <View style={styles.buttonContainer} >
          <Button
            icon="ios-redo"
            label="Restart Quiz"
            onPress={() => this.handleReset()}
            bgColor="#ff0000"
          />
          <Button
            icon="md-arrow-back"
            label="Back to Deck"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>

      </View>
      
    );
  }

  // Handle quiz reset
  handleReset() {
    this.setState({ 
      inProgress: true,
      index: 0,
      correct: 0,
      incorrect: 0
    })
  }


  // ---------- RENDER ----------

  render() {

    const { index } = this.state;
    const deckID = this.props.route.params.deckID;
    const title = this.props.decks[deckID].title;
    const questions = this.props.decks[deckID].questions;
    const qTotal = questions.length;
    const currentQuestion = questions[index];

    return (
      <View style={styles.container}>

        <View style={[styles.textContainer, { marginTop: 20 }]}>
          <Text style={styles.h2}>{ `${title} deck` }</Text>
        </View>
      
        {this.state.inProgress && this.quizCard(currentQuestion, index + 1, qTotal)}

        {!this.state.inProgress && this.quizResult(this.state.correct, qTotal)}
        
      </View>
    );
  }
}

// ---------- STYLESHEET ----------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.bgWhite,
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
  cardContainer: {
    // flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    minHeight: 160,
    // marginTop: 0,
    marginBottom: 10,
  },
  card: {
    width: Dimensions.get('window').width * 0.8,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,

    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
  },
  card1: {
    backgroundColor: Colors.mainColor1,
  },
  card2: {
    backgroundColor: '#6c6',
  },
  cardText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
})

function mapStateToProps(state) {
  return ( state === null ) ? { decks: null } : { decks: state };
}

export default connect(mapStateToProps)(Quiz)
