import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/views/Login';
import { NativeBaseProvider} from "native-base";
import { SignInScreen } from './src/views/SignIn';
import { DashboardScreen } from './src/views/Dashboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
       <Stack.Navigator
         screenOptions={{
          headerShown: false
         }}
       >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={SignInScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
       </Stack.Navigator>
     </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;