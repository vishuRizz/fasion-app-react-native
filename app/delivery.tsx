import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeft, Plus, Share2, Check, MapPin, X } from 'lucide-react-native';

// Define types for our address object
interface Address {
  id: number;
  label: string;
  tag: string;
  name: string;
  phone: string;
  address: string;
  selected: boolean;
  pinpointed: boolean;
}

const DeliveryAddressSelector: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: 'Home',
      tag: 'Main Address',
      name: 'Andrew Ainsley',
      phone: '+1 111 467 378 399',
      address: '701 7th Ave, New York, NY 10036, USA',
      selected: true,
      pinpointed: true
    },
    {
      id: 2,
      label: 'Apartment',
      tag: '',
      name: 'Andrew Ainsley',
      phone: '+1 111 467 378 399',
      address: 'Liberty Island, New York, NY 10004, USA',
      selected: false,
      pinpointed: true
    },
    {
      id: 3,
      label: "Mom's House",
      tag: '',
      name: 'Jenny Ainsley',
      phone: '+1 111 684 049 365',
      address: 'Central Park, New York, NY 10022, USA',
      selected: false,
      pinpointed: true
    }
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'selected' | 'pinpointed'>>({
    label: '',
    tag: '',
    name: '',
    phone: '',
    address: ''
  });

  const handleAddAddress = () => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    const addressToAdd: Address = {
      id: newId,
      label: newAddress.label,
      tag: newAddress.tag,
      name: newAddress.name,
      phone: newAddress.phone,
      address: newAddress.address,
      selected: false,
      pinpointed: false
    };

    setAddresses([...addresses, addressToAdd]);
    setModalVisible(false);
    
    // Reset the form
    setNewAddress({
      label: '',
      tag: '',
      name: '',
      phone: '',
      address: ''
    });
  };

  const handleSelectAddress = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      selected: address.id === id
    })));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 bg-white">
        <View className="flex-row items-center">
          <ArrowLeft color="#000" size={20} />
          <Text className="text-lg font-medium ml-4">Choose Delivery Address</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>

      {/* Address List */}
      <ScrollView className="flex-1 p-4 h-16 ">
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            className="bg-white rounded-lg border border-green-500 p-4 mb-6 "
            onPress={() => handleSelectAddress(address.id)}
          >
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <View className="flex-row items-center">
                  <Text className="font-medium">{address.label}</Text>
                  {address.tag ? (
                    <View className="ml-2 border border-gray-300 rounded px-2 py-0.5">
                      <Text className="text-xs text-gray-500">{address.tag}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <Share2 color="#6B7280" size={18} />
            </View>

            <Text className="text-sm font-medium">
              {address.name} <Text className="text-gray-500 font-normal">({address.phone})</Text>
            </Text>
            <Text className="text-sm text-gray-600 mt-1 mb-2">{address.address}</Text>
            
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MapPin color="#6B7280" size={14} />
                <Text className="text-xs text-gray-500 ml-1">Pinpoint already</Text>
              </View>
              {address.selected && <Check color="#22C55E" size={20} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4 bg-white">
        <TouchableOpacity className="w-full bg-green-500 py-3 rounded-lg items-center">
          <Text className="text-white font-medium">OK</Text>
        </TouchableOpacity>
      </View>

      {/* Add Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-5 w-5/6 max-h-4/5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Add New Address</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="#000" size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View className="mb-4">
                <Text className="text-sm font-medium mb-1">Label</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  value={newAddress.label}
                  onChangeText={(text) => setNewAddress({...newAddress, label: text})}
                  placeholder="Home, Work, etc."
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1">Tag (optional)</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  value={newAddress.tag}
                  onChangeText={(text) => setNewAddress({...newAddress, tag: text})}
                  placeholder="Main Address, etc."
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1">Full Name</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  value={newAddress.name}
                  onChangeText={(text) => setNewAddress({...newAddress, name: text})}
                  placeholder="Enter your name"
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1">Phone Number</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  value={newAddress.phone}
                  onChangeText={(text) => setNewAddress({...newAddress, phone: text})}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1">Address</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  value={newAddress.address}
                  onChangeText={(text) => setNewAddress({...newAddress, address: text})}
                  placeholder="Enter your full address"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              className="w-full bg-green-500 py-3 rounded-lg items-center mt-4"
              onPress={handleAddAddress}
            >
              <Text className="text-white font-medium">Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DeliveryAddressSelector;