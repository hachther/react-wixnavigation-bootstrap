/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import { Navigation } from "react-native-navigation";
import {HOME_SCREEN, Screens, SETTINGS_SCREEN} from './js/screens';
import {applyThemeOptions} from "./js/utils/styles";
import {Platform} from 'react-native';

Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => ScreenComponent));

Navigation.events().registerAppLaunchedListener(() => {
  console.log('fsiehr');
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                id: 'screens.Home',
                name: 'screens.Home',
                options: applyThemeOptions({
                  topBar: {
                    title: {
                      text: 'Chats'
                    },
                    searchBar: true,
                    searchBarHiddenWhenScrolling: true,
                    searchBarPlaceholder: 'Search'
                  }
                })
              }
            }],
            options: applyThemeOptions({
              bottomTab: {
                text: 'Home',
                icon: Platform.select({
                  android: require('./js/static/images/bottomtab/ic_chatbubbles-md.png'),
                  ios: require('./js/static/images/bottomtab/ic_chatbubbles-ios.png')
                })
              }
            })
          }
        }, {
          stack: {
            children: [{
              component: {
                name: 'screens.Settings',
                options: applyThemeOptions({
                  topBar: {
                    title: {
                      text: 'Settings'
                    }
                  }
                })
              }
            }],
            options: applyThemeOptions({
              bottomTab: {
                text: 'Settings',
                icon: Platform.select({
                  android: require('./js/static/images/bottomtab/ic_settings-md.png'),
                  ios: require('./js/static/images/bottomtab/ic_settings-ios.png')
                })
              }
            })
          }
        }]
      }
    }
  });
});