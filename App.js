import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack/authStack';
import SettingsProvider from './src/utils/settingProvider';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <SettingsProvider>
            <AuthStack />
          </SettingsProvider>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
