import { RECEIVE_DECKS, ADD_NEW_CARD, ADD_NEW_DECK } from '../actions';

export default function decks(state = {}, action) {
  const { deckID, card, title } = action;
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_NEW_CARD:
      // const { deckID, card } = action;
      return {
        ...state,
        [deckID]: {
          ...state[deckID],
          questions: [...state[deckID].questions].concat(card)
        }
      };
    case ADD_NEW_DECK:
      // const { deckID, title } = action;
      return {
        ...state,
        [deckID]: {
          title,
          questions: []
        }
      };      
    default:
      return state;
  }
}
