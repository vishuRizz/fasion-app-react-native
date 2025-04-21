import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Feather, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

// Types for product data
type ProductProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  percentageSold: number;
  rating: number;
  category?: string;
};

const ProductDetailScreen: React.FC<{ product?: ProductProps }> = ({ 
  product = {
    id: '1',
    name: 'Tarun Tahiliani off white lehenga',
    price: 185.00,
    image: 'https://example.com/product-image.jpg',
    percentageSold: 24,
    rating: 4.8,
    category: 'Lehenga'
  }
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header - exactly matching the image */}
      <View className="flex-row items-center px-4 pt-1 pb-2">
        <TouchableOpacity>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text className="text-base font-medium flex-1 text-center">Product</Text>
        <TouchableOpacity className="mr-2">
          <Feather name="share-2" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-vertical" size={18} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image with exact border color */}
        <View className="px-4 pb-2">
          <View className="border border-blue-500 rounded-lg overflow-hidden">
            <Image 
              source={{ uri: product.image }}
              className="w-full h-96"
              resizeMode="cover"
            />
          </View>
        </View>
        
        {/* Product Name and Price - matching exact font sizes and spacing */}
        <View className="px-4 pt-1">
          <Text className="text-sm font-normal text-gray-800">{product.name}</Text>
          <View className="flex-row justify-between items-center py-1">
            <Text className="text-base font-bold">${product.price.toFixed(2)}</Text>
            <View className="flex-row items-center space-x-4">
              <Text className="text-xs text-gray-500">{product.percentageSold}% sold</Text>
              <View className="flex-row items-center">
                <AntDesign name="star" size={12} color="#FF9529" />
                <Text className="text-xs text-gray-500 ml-1">{product.rating}</Text>
              </View>
            </View>
          </View>
          
          {/* Action Buttons - exact purple color and size */}
          <View className="flex-row justify-between mt-3 mb-4">
            <TouchableOpacity className="bg-purple-800 py-2 px-4 rounded flex-1 mr-2 items-center">
              <Text className="text-white text-sm font-medium">Virtual Try On</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border border-purple-800 py-2 px-4 rounded flex-1 ml-2 items-center">
              <Text className="text-purple-800 text-sm font-medium">Check Availability</Text>
            </TouchableOpacity>
          </View>
          
          {/* Duration Section - exact spacing and font size */}
          <View className="pt-1 border-t border-gray-200">
            <Text className="text-sm font-bold uppercase">Duration</Text>
            <View className="flex-row mt-2 items-center">
              <View className="w-6 h-6 bg-black mr-1 flex items-center justify-center">
                <MaterialIcons name="calendar-today" size={16} color="white" />
              </View>
              <View className="w-6 h-6 bg-black mr-1" />
              <View className="w-6 h-6 bg-black mr-1" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Usage example with dynamic data
const App = () => {
  const productData = {
    id: '123',
    name: 'Tarun Tahiliani off white lehenga',
    price: 185.00,
    image: 'https://example.com/product-image.jpg',
    percentageSold: 24,
    rating: 4.8,
    category: 'Bridal'
  };

  return <ProductDetailScreen product={productData} />;
};

export default App;