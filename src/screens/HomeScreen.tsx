import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Alert,
  BackHandler
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import KaiLogo from '../components/KaiLogo';

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim, sair',
          onPress: async () => {
            await logout();
            // Em vez de resetar a navegação, vamos apenas terminar este fluxo
            // O AuthContext vai detectar que o usuário não está mais logado e
            // vai automaticamente redirecionar para a tela de login
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.gradient.start, colors.gradient.middle, colors.gradient.end]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <KaiLogo width={100} height={60} />
          </View>
          
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.welcomeText}>Bem-vindo(a)</Text>
              <Text style={styles.nameText}>{user?.name}</Text>
              
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
              
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Função:</Text>
                <Text style={styles.infoValue}>{user?.role.name}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: typography.fontSizes.lg,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  nameText: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    marginRight: spacing.sm,
    color: '#555',
    width: 80,
  },
  infoValue: {
    fontSize: typography.fontSizes.md,
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 