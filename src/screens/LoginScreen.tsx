import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import KaiLogo from '../components/KaiLogo';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

type LoginScreenProps = {
  navigation: any;
};

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setIsLoading(true);
      await login({ email, password });
      // A navegação acontecerá automaticamente pelo AuthContext
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      Alert.alert('Erro de login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.gradient.start, colors.gradient.middle, colors.gradient.end]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <KaiLogo width={160} height={100} />
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>ENTRE NA SUA CONTA</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={togglePasswordVisibility}
                disabled={isLoading}
              >
                <Feather 
                  name={showPassword ? "eye" : "eye-off"} 
                  size={20} 
                  color="rgba(255, 255, 255, 0.8)" 
                />
              </TouchableOpacity>
            </View>
            
            <LinearGradient
              colors={[colors.button.start, colors.button.end]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <TouchableOpacity 
                style={styles.loginButtonInner}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Entrar</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha? </Text>
              <TouchableOpacity disabled={isLoading}>
                <Text style={styles.forgotPasswordLink}>Redefinir senha</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 50,
    letterSpacing: 2,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 55,
    width: '100%',
    borderWidth: 0,
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize: typography.fontSizes.md,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: colors.text,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 17,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 30,
    overflow: 'hidden',
  },
  loginButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.text,
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  forgotPasswordLink: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 