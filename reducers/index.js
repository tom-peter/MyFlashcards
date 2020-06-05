import { RECEIVE_DECKS, ADD_NEW_CARD } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_NEW_CARD:
      const { deckID, card } = action;
      return {
        ...state,
        [deckID]: {
          ...state[deckID],
          questions: [...state[deckID].questions].concat(card)
        }
      };
    default:
      return state;
  }
}
