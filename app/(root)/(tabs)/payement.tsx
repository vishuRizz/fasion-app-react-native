import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { ArrowLeft, Plus, Check, X } from 'lucide-react-native';

// Define types for payment methods
interface PaymentMethod {
  id: string;
  type: 'paypal' | 'google_pay' | 'apple_pay' | 'mastercard' | 'visa' | 'amex' | 'other';
  name: string;
  lastFourDigits?: string;
  selected: boolean;
  logoUrl?: string;
}

const PaymentMethodsSelector: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'paypal',
      name: 'PayPal',
      selected: false,
    },
    {
      id: '2',
      type: 'google_pay',
      name: 'Google Pay',
      selected: false,
    },
    {
      id: '3',
      type: 'apple_pay',
      name: 'Apple Pay',
      selected: false,
    },
    {
      id: '4',
      type: 'mastercard',
      name: 'Mastercard',
      lastFourDigits: '4679',
      selected: true,
    },
    {
      id: '5',
      type: 'visa',
      name: 'Visa',
      lastFourDigits: '5567',
      selected: false,
    },
    {
      id: '6',
      type: 'amex',
      name: 'American Express',
      lastFourDigits: '8456',
      selected: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState<Partial<PaymentMethod>>({
    type: 'other',
    name: '',
    lastFourDigits: '',
  });

  const handleSelectPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      selected: method.id === id,
    })));
  };

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.name) return;
    
    const newId = (paymentMethods.length + 1).toString();
    const paymentMethodToAdd: PaymentMethod = {
      id: newId,
      type: newPaymentMethod.type || 'other',
      name: newPaymentMethod.name,
      lastFourDigits: newPaymentMethod.lastFourDigits,
      selected: false,
    };

    setPaymentMethods([...paymentMethods, paymentMethodToAdd]);
    setModalVisible(false);
    
    // Reset form
    setNewPaymentMethod({
      type: 'other',
      name: '',
      lastFourDigits: '',
    });
  };

  // Function to render the appropriate logo for each payment method
  const renderLogo = (type: string) => {
    switch (type) {
      case 'paypal':
        return (
          <View className="w-8 h-8 bg-blue-700 rounded-md items-center justify-center">
            <Text className="text-white font-bold text-lg">P</Text>
          </View>
        );
      case 'google_pay':
        return (
          <View className="flex-row">
            <Text className="text-blue-600 font-bold">G</Text>
            <Text className="text-red-500 font-bold">o</Text>
            <Text className="text-yellow-500 font-bold">o</Text>
            <Text className="text-blue-600 font-bold">g</Text>
            <Text className="text-green-500 font-bold">l</Text>
            <Text className="text-red-500 font-bold">e</Text>
            <Text className="text-gray-800 font-bold ml-1">Pay</Text>
          </View>
        );
      case 'apple_pay':
        return (
          <View className="flex-row items-center">
            <Text className="text-black font-bold text-xl">🍎</Text>
            <Text className="text-black font-bold ml-1">Pay</Text>
          </View>
        );
      case 'mastercard':
        return (
          <View className="w-8 h-8 bg-yellow-500 rounded-full items-center justify-center overflow-hidden">
            <View className="w-full h-full bg-red-500 rounded-full absolute right-4"></View>
            <View className="w-full h-full bg-yellow-500 rounded-full absolute left-4"></View>
          </View>
        );
      case 'visa':
        return (
          <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center">
            <Text className="text-white font-bold">VISA</Text>
          </View>
        );
      case 'amex':
        return (
          <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
            <Text className="text-white font-bold text-xs">AMEX</Text>
          </View>
        );
      default:
        return (
          <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
            <Text className="text-gray-600 font-bold">?</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <ArrowLeft color="#000" size={20} />
          <Text className="text-lg font-medium ml-4">Choose Payment Methods</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>

      {/* Payment Methods List */}
      <ScrollView className="flex-1">
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            className={`bg-white p-4 border-b border-gray-100 flex-row items-center justify-between ${
              method.selected ? 'border border-green-500 my-1 mx-4 rounded-lg' : ''
            }`}
            onPress={() => handleSelectPaymentMethod(method.id)}
          >
            <View className="flex-row items-center">
              {renderLogo(method.type)}
              {method.lastFourDigits ? (
                <Text className="ml-3 text-gray-500">•••• •••• •••• {method.lastFourDigits}</Text>
              ) : (
                <Text className="ml-3">{method.name}</Text>
              )}
            </View>
            {method.selected && <Check color="#22C55E" size={20} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* OK Button */}
      <View className="p-4">
        <TouchableOpacity className="w-full bg-green-600 py-3 rounded-lg items-center">
          <Text className="text-white font-medium">OK</Text>
        </TouchableOpacity>
      </View>

      {/* Add Payment Method Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-5 w-5/6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Add Payment Method</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="#000" size={20} />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-1">Payment Type</Text>
              <View className="flex-row flex-wrap">
                {['visa', 'mastercard', 'amex', 'paypal', 'google_pay', 'apple_pay', 'other'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    className={`border rounded-lg p-2 m-1 ${
                      newPaymentMethod.type === type ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                    onPress={() => setNewPaymentMethod({...newPaymentMethod, type: type as any})}
                  >
                    <Text>{type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-1">Card Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                value={newPaymentMethod.name}
                onChangeText={(text) => setNewPaymentMethod({...newPaymentMethod, name: text})}
                placeholder="Enter card name"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-1">Last 4 Digits</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                value={newPaymentMethod.lastFourDigits}
                onChangeText={(text) => setNewPaymentMethod({...newPaymentMethod, lastFourDigits: text})}
                placeholder="Enter last 4 digits"
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>

            <TouchableOpacity
              className="w-full bg-green-600 py-3 rounded-lg items-center mt-4"
              onPress={handleAddPaymentMethod}
            >
              <Text className="text-white font-medium">Add Payment Method</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentMethodsSelector;