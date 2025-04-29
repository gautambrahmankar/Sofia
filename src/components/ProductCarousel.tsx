import React, {useRef, useState} from 'react';
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import ProductCard from '../components/ProductCard';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Adjust these values as needed
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 16;
const SIDE_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

interface Product {
  id: number;
  name: string;
  type: string;
  price: string;
  image: any;
  url?: string;
}

interface Props {
  products: Product[];
  redirectURL: string;
}

const ProductCarousel: React.FC<Props> = ({products, redirectURL}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (ITEM_WIDTH + ITEM_SPACING));
    setActiveIndex(index);
  };

  return (
    <View>
      <Animated.FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        // snapToAlignment="start"
        contentContainerStyle={{paddingHorizontal: SIDE_PADDING}}
        keyExtractor={item => item.id.toString()}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => (
          <View
            style={{
              width: ITEM_WIDTH,
              // height: 300,
              marginRight: ITEM_SPACING,
              // backgroundColor: 'green',
            }}>
            <ProductCard
              name={item.name}
              type={item.type}
              price={item.price}
              image={item.image}
              url={redirectURL}
            />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {products.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductCarousel;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#aaa',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
  },
});
