import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface KaiLogoProps {
  width?: number;
  height?: number;
}

const KaiLogo: React.FC<KaiLogoProps> = ({ width = 180, height = 100 }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.logoRow}>
        <Text style={styles.logoText}>K</Text>
        <View style={styles.aContainer}>
          <Text style={styles.logoText}>A</Text>
          <View style={styles.triangle} />
        </View>
        <Text style={styles.logoText}>I</Text>
      </View>
      <Text style={styles.subText}>PREVENTION CENTER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  aContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
  },
  subText: {
    fontSize: 14,
    color: 'white',
    letterSpacing: 1,
    marginTop: -5,
  },
});

export default KaiLogo; 