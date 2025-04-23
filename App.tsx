import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Navigation from './src/navigation';
import { colors } from './src/theme';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Verificar se o SecureStore está disponível
    async function prepareApp() {
      try {
        // Teste simples para ver se o SecureStore está funcionando
        await SecureStore.isAvailableAsync();
        setIsReady(true);
      } catch (error) {
        console.error('Erro ao inicializar SecureStore:', error);
        // Mesmo com erro, vamos mostrar o app
        setIsReady(true);
      }
    }

    prepareApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}
