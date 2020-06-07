// import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const NOTIFICATION_KEY = 'MyFlashcards:notifications'

// clear local notification from async storage and cancel it
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// return an object which represents the notification
function createNotification() {
  return {
    title: 'MyFlashcards reminder:',
    body: "👋 Remember to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

// check if we set the notification, and if not: set it
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {

				// check the permission status, if granted: set the notification
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              
              // if we have already established a notification, cancel that
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(18)
              tomorrow.setMinutes(0)

              // schedule a new notification
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
