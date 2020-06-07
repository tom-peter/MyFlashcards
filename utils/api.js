import AsyncStorage from '@react-native-community/async-storage';

import { decks } from './_DATA';
import { NOTIFICATION_KEY } from './notifications'

const DECKS_STORAGE_KEY = 'MyFlashcards:decks';

export async function getDecks() {
  try {
    const decksFromStorage = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (decksFromStorage !== null) return JSON.parse(decksFromStorage);
    
    // if decksFromStorage === null
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    return decks;
   
  } catch (error) {
    console.log(error);
  }
}

export async function getDeck(id) {
  try {
    const deckObj = await getDecks();
    return deckObj[id];
  } catch (error) {
    console.log(error);
  }
}

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function saveDeckTitle(title) {
  const id = generateUID();
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [id]: {
          title,
          questions: []
        }
      })
    )
    return id;
  } catch (error) {
    console.log(error);
  }
}

export async function addCardToDeck(id, card) {
  try {
    const deck = await getDeck(id);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [id]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export async function resetDecks() {
  try {
    await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    return decks;
  } catch (error) {
    console.log(error);
  }
}

export function checkAsyncStorage() {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => console.log(DECKS_STORAGE_KEY, ' : ', data));
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => console.log(NOTIFICATION_KEY, ' : ', data));
}
