import Home from './HomeScreen';
import Settings from './SettingsScreen';

export const HOME_SCREEN = 'screens.Home';
export const SETTINGS_SCREEN = 'screens.Settings';


const Screens = new Map();

Screens.set(HOME_SCREEN, Home);
Screens.set(SETTINGS_SCREEN, Settings);

module.exports = {Screens};
