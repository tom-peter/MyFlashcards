import { getDecks } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addNewCard(deckID, card) {
  return {
    type: ADD_NEW_CARD,
    deckID,
    card
  };
}

export function addNewDeck(deckID, title) {
  return {
    type: ADD_NEW_DECK,
    deckID,
    title
  };
}
