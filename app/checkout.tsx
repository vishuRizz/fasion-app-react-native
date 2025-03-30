import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { ChevronRight, MapPin, ShoppingBag, PlusCircle, Clock, Ticket } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// Define TypeScript interfaces
interface OrderItem {
  id: number;  
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();

  // Sample order data
  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: 'Urban Blend Long Sleeve Shirt',
      size: 'L',
      color: 'Black',
      quantity: 1,
      price: 185.00,
      image: 'https://res.cloudinary.com/dub7qyv8e/image/upload/v1743348887/OIP_9_l21eqi.png'
    },
    {
      id: 2,
      name: 'Elite Style Modal Elegance',
      size: 'L',
      color: 'Black',
      quantity: 1,
      price: 190.00,
      image: 'https://res.cloudinary.com/dub7qyv8e/image/upload/v1743349000/rud8rkch3cmbzis3doeb.png'
    },
    {
      id: 3,
      name: 'Luxe Blend Formal Wear',
      size: 'L',
      color: 'Black',
      quantity: 1,
      price: 160.00,
      image: 'https://res.cloudinary.com/dub7qyv8e/image/upload/v1743349033/soe4gkvwsvhpslk7www0.png'
    }
  ];

  // Calculate totals from the array
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = 1.50;
  const tax = 3.50;
  const totalPayment = subtotal + serviceFee + tax;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="p-4 bg-white flex-row items-center justify-between border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <ChevronRight size={20} color="#000" style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <Text className="text-xl font-medium">Checkout</Text>
        </View>
        <TouchableOpacity>
          <View className="flex-row">
            <View className="w-1.5 h-1.5 bg-black rounded-full mx-0.5" />
            <View className="w-1.5 h-1.5 bg-black rounded-full mx-0.5" />
            <View className="w-1.5 h-1.5 bg-black rounded-full mx-0.5" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        {/* Delivery Address */}
        <TouchableOpacity 
          className="bg-white rounded-lg p-4 flex-row items-center justify-between shadow-sm mb-4"
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Delivery');
          }}
        >
          <View className="flex-row items-center">
            <MapPin size={20} color="#16a34a" className="mr-3" />
            <Text className="ml-3">Delivery Address</Text>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Order Section */}
        <View className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <ShoppingBag size={20} color="#16a34a" />
              <Text className="ml-3">Your Order ({orderItems.length})</Text>
            </View>
            <PlusCircle size={20} color="#9ca3af" />
          </View>

          {/* Order Items */}
          {orderItems.map((item, index) => (
            <View 
              key={item.id} 
              className={`flex-row pb-8 ${index < orderItems.length - 1 ? 'border-b border-gray-200 mb-4' : ''}`}
            >
              <Image 
                source={{ uri: item.image }} 
                className="w-28 h-40 rounded" 
                resizeMode="cover"
              />
              <View className="ml-3 flex-1">
                <Text className="font-medium">{item.name}</Text>
                <Text className="text-sm text-gray-600 mt-1">Size: {item.size}</Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-sm text-gray-600">Color: {item.color}</Text>
                  <View className="w-3 h-3 bg-black rounded-full ml-1" />
                </View>
                <Text className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</Text>
                <Text className="text-green-600 font-medium mt-1">${item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Duration Section */}
        <View className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <Text className="text-gray-500 mb-2">duration</Text>
          <View className="flex-row items-center justify-between">
            <Text>12th may</Text>
            <Text className="text-gray-500">to</Text>
            <Text>18th may</Text>
          </View>
        </View>

        {/* Promos & Vouchers */}
        <TouchableOpacity 
          className="bg-white rounded-lg p-5 flex-row items-center justify-between shadow-sm mb-4"
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Promo');
          }}
        >
          <View className="flex-row items-center">
            <Ticket size={20} color="#16a34a" className="mr-3" />
            <Text className="ml-3">Promos & Vouchers</Text>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Review Summary */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="font-medium text-lg">Review Summary</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Subtotal ({orderItems.length} items)</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Service Fee</Text>
            <Text>${serviceFee.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Tax</Text>
            <Text>${tax.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="font-medium">Total Payment</Text>
            <Text className="font-medium">${totalPayment.toFixed(2)}</Text>
          </View>
        </View>
        
        {/* Confirm Order Button */}
        <TouchableOpacity 
          className="bg-green-700 rounded-full p-4 items-center mb-4"
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Payment');
          }}
        >
          <Text className="text-white font-medium">Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;