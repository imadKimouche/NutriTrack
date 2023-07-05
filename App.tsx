import React from 'react';
import {ThemeProvider} from '@shopify/restyle';

import theme from './src/style/theme';
import {MainNavigator} from './src/navigation/MainNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <MainNavigator />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
