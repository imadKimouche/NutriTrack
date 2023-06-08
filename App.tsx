import React from 'react';
import {ThemeProvider} from '@shopify/restyle';

import theme from './src/style/theme';
import {MainNavigator} from './src/navigation/MainNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainNavigator />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
