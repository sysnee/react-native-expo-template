import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { colors } from '../theme';

// Define the type for our stack navigator
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente de navegação principal
const AppNavigator = () => {
  const { isLoggedIn, loading, user } = useAuth();

  // Exibir indicador de carregamento enquanto verifica o estado de autenticação
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.text, fontSize: 16 }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <Stack.Navigator 
      initialRouteName={isLoggedIn ? "Welcome" : "Login"}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {/* Todas as telas estão sempre disponíveis, mas controlamos o acesso através de redirecionamentos */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ gestureEnabled: !isLoggedIn }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// Componente principal com o provedor de autenticação
export const Navigation = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Navigation; 