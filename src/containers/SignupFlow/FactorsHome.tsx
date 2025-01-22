import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const FactorItem = ({ icon, title, description, value }) => {
  return (
    <View style={styles.factorItem}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const Factors = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Factors</Text>
      <FactorItem
        icon={require('../../assets/images/SkinType.png')} // Replace with the actual path
        title="Skin Type"
        description="Skin characteristics"
        value="Combination"
      />
      <FactorItem
        icon={require('../../assets/images/Oiliness.png')} // Replace with the actual path
        title="Oiliness"
        description="Sebum protection"
        value="Normal"
      />
      <FactorItem
        icon={require('../../assets/images/Texture.png')} // Replace with the actual path
        title="Texture"
        description="Surface feel"
        value="Smooth"
      />
      <FactorItem
        icon={require('../../assets/images/Tone.png')} // Replace with the actual path
        title="Tone"
        description="Color consistency"
        value="Even"
      />
      <FactorItem
        icon={require('../../assets/images/Elasticity.png')} // Replace with the actual path
        title="Elasticity"
        description="Skin firmness"
        value="Good"
      />
      <FactorItem
        icon={require('../../assets/images/Sensitivity.png')} // Replace with the actual path
        title="Sensitivity"
        description="Reactivity"
        value="Sensitive"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A31F4',
  },
});

export default Factors;
