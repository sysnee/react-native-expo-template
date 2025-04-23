import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import KaiLogo from '../components/KaiLogo';

type WelcomeScreenProps = {
  navigation: any;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Aguarda 6 segundos e navega para a tela Home
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
    
    // Limpar o timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, [navigation]);
  
  // Extrair o primeiro nome do usuário ou usar um valor padrão
  const firstName = user?.name?.split(' ')[0]?.toUpperCase() || 'USUÁRIO';
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradient.start, colors.gradient.middle, colors.gradient.end]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.content}>
          <View style={styles.messageContainer}>
            <Text style={styles.greeting}>OLÁ, {firstName}!</Text>
            <Text style={styles.welcome}>SEJA BEM-VINDO</Text>
            
            <View style={styles.checkCircle}>
              <View style={styles.checkmark}></View>
            </View>
          </View>
          
          <View style={styles.logoContainer}>
            <KaiLogo width={160} height={100} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: typography.fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  welcome: {
    fontSize: typography.fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 50,
    textAlign: 'center',
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 30,
    height: 15,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-45deg' }, { translateY: -4 }],
  },
  logoContainer: {
    alignItems: 'center',
  }
});

export default WelcomeScreen; 