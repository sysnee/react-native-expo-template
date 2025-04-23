import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface KaiLogoProps {
  width?: number;
  height?: number;
}

const KaiLogo: React.FC<KaiLogoProps> = ({ width = 180, height = 80 }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.square}>
        <Text style={styles.squareText}>K</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>KAI</Text>
        <Text style={styles.subText}>PREVENTION CENTER</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#4FD1C5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  squareText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  textContainer: {
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 0.5,
  },
});

export default KaiLogo; 