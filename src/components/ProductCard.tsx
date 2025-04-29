import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Linking,
} from 'react-native';

type ProductCardProps = {
  name: string;
  type: string;
  price?: string;
  image: ImageSourcePropType;
  url: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  type,
  price,
  image,
  url,
}) => {
  const openLink = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openLink}>
      <Image source={image} style={styles.productImage} resizeMode="cover" />

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productType}>{type}</Text>
        {/* {price && <Text style={styles.productPrice}>{price}</Text>} */}
      </View>

      <TouchableOpacity style={styles.addToCartButton} onPress={openLink}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
    // backgroundColor: '#f0f0f0',
    // overflow: 'hidden',
  },
  productInfo: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  productType: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  addToCartButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
