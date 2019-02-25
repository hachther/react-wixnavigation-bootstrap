import { Platform, StatusBar } from 'react-native';
import _ from 'lodash';
import Colors from "../common/Colors";

export const getVar = (name, fallback = undefined) => {
  return fallback;
  // return themes[UI.settings.appearance.theme][name] || fallback;
};

const getStatusBarStyle = (backgroundColor) => {
  const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(backgroundColor);
  if (!result) return 'light-content';
  const [r, g, b] = result.slice(1, 4).map(n => parseInt(n.length === 1 ? `f${n}` : n, 16));
  const shade = (r + g + b) / 3;
  return shade > 128 ? 'dark-content' : 'light-content';
};

export const applyThemeOptions = (settings) => {
  if (Platform.OS === 'ios') {
    // NavBar
    const navBarStyle = getVar('--navbar-style', 'light');
    const navBarBg = getVar('--navbar-bg', 'transparent');

    if (navBarBg && navBarBg !== 'transparent') {
      StatusBar.setBarStyle(getStatusBarStyle(navBarBg));
    } else {
      StatusBar.setBarStyle(navBarStyle === 'dark' ? 'light-content' : 'dark-content');
    }

    // StatusBar
    _.set(settings, 'statusBar.visible', true);
    _.set(settings, 'largeTitle.visible', true);

    // NavBar
    const tabBarStyle = getVar('--tabbar-style', 'light');
    const tabBarBg = getVar('--tabbar-bg', 'white');

    // Top Bar
    _.set(settings, 'topBar.background.color', navBarBg);
    _.set(settings, 'topBar.drawBehind', true);
    _.set(settings, 'topBar.translucent', navBarStyle === 'dark' || navBarStyle === 'light');
    _.set(settings, 'topBar.barStyle', navBarStyle === 'dark' ? 'black' : 'default');
    _.set(settings, 'topBar.title.color', getVar('--navbar-fg'));
    _.set(settings, 'topBar.buttonColor', getVar('--navbar-tint', Colors.meudocta));
    _.set(settings, 'topBar.backButton.color', getVar('--tint-fg', Colors.meudocta));
    if (settings.topBar.rightButtons) {
      _.set(settings, 'topBar.rightButtons', settings.topBar.rightButtons.map(button => ({
        ...button,
        color: button.color || getVar('--tint-fg', Colors.meudocta),
      })));
    }

    if (settings.topBar.leftButtons) {
      _.set(settings, 'topBar.leftButtons', settings.topBar.leftButtons.map(button => ({
        ...button,
        color: button.color || getVar('--tint-fg', Colors.meudocta),
      })));
    }
    _.set(settings, 'topBar.subtitle.fontSize', 12);

    // Bottom Tabs
    _.set(settings, 'bottomTabs.backgroundColor', tabBarBg);
    _.set(settings, 'bottomTabs.translucent', tabBarStyle === 'dark' || tabBarStyle === 'light');
    _.set(settings, 'bottomTabs.barStyle', tabBarStyle === 'dark' ? 'black' : 'default');
    _.set(settings, 'bottomTabs.drawBehind', true);
    _.set(settings, 'bottomTabs.selectedTabColor', getVar('--tabbar-tint'));

    if (settings.bottomTab) {
      _.set(settings, 'bottomTab.iconColor', getVar('--tabbar-fg'));
      _.set(settings, 'bottomTab.textColor', getVar('--tabbar-fg'));
      _.set(settings, 'bottomTab.selectedTextColor', getVar('--tabbar-tint', Colors.meudocta));
      _.set(settings, 'bottomTab.selectedIconColor', getVar('--tabbar-tint', Colors.meudocta));
    }

    _.set(settings, 'layout.backgroundColor', getVar('--backdrop'));
  }

  if (Platform.OS === 'android') {
    _.set(settings, 'statusBar.backgroundColor', getVar('--statusbar-bg', '#7E43AA'));

    // NavBar    // NavBar
    // const navBarStyle = getVar('--navbar-style', 'light');
    // const navBarBg = getVar('--navbar-bg', 'transparent');
    //
    // const tabBarStyle = getVar('--tabbar-style', 'light');
    // const tabBarBg = getVar('--tabbar-bg');

    // Top Bar
    _.set(settings, 'topBar.background.color', 'transparent');
    _.set(settings, 'topBar.title.color', '#FFCC33');
    _.set(settings, 'topBar.buttonColor', getVar('--tint-fg', 'white'));
    _.set(settings, 'topBar.backButton.color', getVar('--tint-fg', 'white'));
    if (settings.topBar.rightButtons) {
      _.set(settings, 'topBar.rightButtons', settings.topBar.rightButtons.map(button => ({
        ...button,
        color: button.color || getVar('--tint-fg', 'white'),
        fontFamily: 'MTN Brighter Sans ExtraLight'
      })));
    }
    // _.set(settings, 'topBar.subtitle.color', 'white');
    _.set(settings, 'topBar.visible', true);
    _.set(settings, 'topBar.drawBehind', true);
    _.set(settings, 'topBar.elevation', 0);

    // Bottom tabs
    // if (!tabBarBg || tabBarBg === 'transparent') {
    //   _.set(settings, 'bottomTabs.backgroundColor', getVar('--backdrop'));
    // } else {
    //   _.set(settings, 'bottomTabs.backgroundColor', getVar('--tabbar-bg'));
    // }

    _.set(settings, 'bottomTabs.backgroundColor', '#0A2764');
    _.set(settings, 'bottomTabs.elevation', 0);
    _.set(settings, 'bottomTabs.selectedTabColor', getVar('--tabbar-tint'));
    _.set(settings, 'bottomTabs.titleDisplayMode', 'alwaysShow');
    _.set(settings, 'bottomTabs.drawBehind', false);

    if (settings.bottomTab) {
      _.set(settings, 'bottomTab.iconColor', getVar('--tabbar-fg'));
      _.set(settings, 'bottomTab.textColor', getVar('--tabbar-fg'));
      _.set(settings, 'bottomTab.selectedTextColor', "#FFFFFF");
      _.set(settings, 'bottomTab.selectedIconColor', "#FFFFFF");
      _.set(settings, 'bottomTab.fontFamily', getVar('--tabbar-font', 'OpenSans-SemiBold'));
    }

    if (!settings.layout || (settings.layout && !settings.layout.backgroundColor)) {
      _.set(settings, 'layout.backgroundColor', getVar('--content-bg'));
    }
  }

  return settings;
};