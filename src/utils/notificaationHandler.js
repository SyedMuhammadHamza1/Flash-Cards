import React from "react";
import { AsyncStorage, Platform } from "react-native";
import { Notifications } from "expo";

import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "MobileFlashCards:key";
const CHANNEL_ID = "DailyReminder";

function createNotification() {
  return {
    title: "Daily Reminder!",
    body: "Hey! Don't forget to study today!",
    ios: {
      sound: true,
    },
    _displayInForeground: true,

    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
      chhannelId: CHANNEL_ID,
    },
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createChannel() {
  return {
    name: "Daily Reminder",
    description: "This is a daily reminder for you to study",
    sound: true,
    priority: "high",
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then((val) => console.log("channel return:", val))
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();

                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: "day",
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        });
      }
    });
}
