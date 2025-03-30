import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { ChevronRight, Search, Check, ArrowLeft } from 'lucide-react-native';

// Define TypeScript interfaces
interface PromoVoucher {
  id: number;
  title: string;
  code?: string;
  minSpend: number;
  validUntil: string;
  isSelected?: boolean;
  isDeal?: boolean;
}

const PromosVouchersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoVouchers, setPromoVouchers] = useState<PromoVoucher[]>([
    {
      id: 1,
      title: '10% OFF & 10% Cashback',
      code: 'CODE',
      minSpend: 250,
      validUntil: '12/28/2024',
      isSelected: false
    },
    {
      id: 2,
      title: 'Best Deal: 20% OFF',
      code: '20DEALS',
      minSpend: 150,
      validUntil: '12/31/2024',
      isSelected: true,
      isDeal: true
    },
    {
      id: 3,
      title: '15% OFF: New User Promotion',
      code: 'CODE',
      minSpend: 120,
      validUntil: '12/25/2024',
      isSelected: false
    },
    {
      id: 4,
      title: '8% OFF & 8% Cashback',
      code: 'CODE',
      minSpend: 300,
      validUntil: '12/30/2024',
      isSelected: false
    },
    {
      id: 5,
      title: '12% Cashback',
      code: 'CODE',
      minSpend: 500,
      validUntil: '12/31/2024',
      isSelected: false
    },
    {
      id: 6,
      title: '25% OFF: Weekend Sale',
      code: 'WEEKEND25',
      minSpend: 200,
      validUntil: '12/29/2024',
      isSelected: false
    },
    {
      id: 7,
      title: '5% OFF: Seasonal Discount',
      code: 'SEASON5',
      minSpend: 100,
      validUntil: '12/31/2024',
      isSelected: false
    }
  ]);

  // Handle voucher selection
  const handleSelectVoucher = (id: number) => {
    setPromoVouchers(promoVouchers.map(voucher => ({
      ...voucher,
      isSelected: voucher.id === id
    })));
  };

  // Filter vouchers based on search query
  const filteredVouchers = promoVouchers.filter(voucher => 
    voucher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (voucher.code && voucher.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="p-6 bg-white flex-row items-center justify-between border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <ArrowLeft size={20} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-medium">Promos & Vouchers</Text>
        </View>
        <TouchableOpacity>
          <Search size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        {/* Promo Code Input */}
        <View className="mb-7">
          <Text className="text-base mb-3">Have a Promo Code?</Text>
          <View className="flex-row bg-white rounded-lg overflow-hidden">
            <TextInput
              className="flex-1 p-3 text-base"
              placeholder="Enter code here"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity className="bg-green-600 px-4 justify-center">
              <Text className="text-white font-medium">Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vouchers List */}
        {filteredVouchers.map((voucher) => (
          <TouchableOpacity 
            key={voucher.id}
            className={`bg-white rounded-lg p-2  mb-5 h-20 flex-row items-center ${voucher.isSelected ? 'border border-green-600' : ''}`}
            onPress={() => handleSelectVoucher(voucher.id)}
          >
            <View className="bg-green-600 w-10 h-10 rounded-full items-center justify-center mr-3">
              <Text className="text-white text-lg">%</Text>
            </View>
            <View className="flex-1">
              <Text className="font-medium text-base">{voucher.title}</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-xs">{voucher.code} · Min. spend ${voucher.minSpend} · Valid till {voucher.validUntil}</Text>
              </View>
            </View>
            {voucher.isSelected && (
              <View className="w-6 h-6">
                <Check size={20} color="#16a34a" />
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* OK Button */}
        <TouchableOpacity className="bg-green-600 rounded-full p-5 items-center mt-3 mb-6">
          <Text className="text-white font-medium">OK</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromosVouchersScreen;