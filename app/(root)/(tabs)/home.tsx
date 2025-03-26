import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StatusBar, 
  TouchableOpacity, 
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Discover');
  
  const categories = [
    'Discover', 'Women', 'Men', 'Shoe', 'Accessories', 
    'Vintage', 'Kids', 'Sports', 'Outerwear', 'Formal', 
    'Casual', 'Ethnic'
  ];

  const products = [
    { name: "Urban Blend Long...", price: "185", image: 'https://res.cloudinary.com/dub7qyv8e/image/upload/v1742985683/voho51mswgels3jlrqro.png' },
    { name: "Luxe Blend Forma...", price: "125", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986045/gfkr5ut0vliqhupa2kxq.png" },
    { name: "Urban Flex C...", price: "175", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986079/cuhsyflejf1ywzood4ta.png" },
    { name: "Elegant Evening...", price: "195", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986184/izoihiuxkjnekpppznwa.png" },
    { name: "Classic Formal...", price: "165", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986192/wng69n3hshaxetkgj4zk.png" },
    

  ];
  const newarrival = [
    { name: "Urban Blend Long...", price: "185", image: 'https://res.cloudinary.com/dub7qyv8e/image/upload/v1742985683/voho51mswgels3jlrqro.png' },
    { name: "Luxe Blend Forma...", price: "125", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986045/gfkr5ut0vliqhupa2kxq.png" },
    { name: "Urban Flex C...", price: "175", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986079/cuhsyflejf1ywzood4ta.png" },
    { name: "Elegant Evening...", price: "195", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986184/izoihiuxkjnekpppznwa.png" },
    { name: "Classic Formal...", price: "165", image: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986192/wng69n3hshaxetkgj4zk.png" },
    

  ];

  return (
    <ScrollView> 
      <View className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        
        {/* Top Bar */}
        <View className="flex-row justify-between items-center px-4 pt-5 pb-3.5">
          <View className="h-20">
            <Image
              source={require('@/assets/images/Lent-it-logo.png')}
              className="h-full"
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 mx-4 rounded-xl px-3.5 my-3.5">
          <Icon name="search" size={28} color="#888" className="mr-3" />
          <TextInput
            placeholder="Search Trends..."
            className="flex-1 h-12 text-black"
            placeholderTextColor="#888"
          />
        </View>
  
        {/* Main Content */}
        <View className="flex px-4 py-3">
          <View className="flex-row">
            {/* Rent Card */}
            <TouchableOpacity className="w-[48%] h-[95%] aspect-square">
              <View className="flex-1 h-[95%] rounded-sm bg-[#e6f2f2] justify-center items-center overflow-hidden">
                <Image
                  source={require('@/assets/images/rent.png')}
                  className="absolute w-full h-full bottom-0"
                  resizeMode="contain"
                />
                <Text className="absolute bottom-5 font-regular text-[50px] text-black">RENT</Text>
              </View>
            </TouchableOpacity>
            
            {/* Thrift Card */}
            <TouchableOpacity className="w-[48%] h-[100%] ">
              <View className="flex-1 rounded-sm bg-gray-100 justify-center items-center overflow-hidden">
                <Image
                  source={require('@/assets/images/thrift.png')}
                  className="absolute w-full h-full bottom-0"
                  resizeMode="cover"
                />
                <Text className="absolute bottom-5 font-regular text-[50px] text-white">THRIFT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Scrollable Content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 5 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                className={`mr-2 px-8 py-2 h-10 rounded-full ${
                  activeCategory === category ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <Text className={`text-base font-medium ${
                  activeCategory === category ? 'text-white' : 'text-black'
                }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
  
          {/* Product Section */}
          <View className="mt-0">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 22 }}
            >
              {products.map((product, index) => (
                <View key={index} style={{ marginRight: 15 }}>
                  <TouchableOpacity
                    style={{
                      width: 165,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3
                    }}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={{
                        width: '100%',
                        height: 250,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text numberOfLines={1} style={{ marginTop: 8, fontSize: 14, fontWeight: '500' }}>
                    {product.name}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#16a34a' }}>
                    ${product.price}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
  
          {/* Big Image - Moved Below Products */}
          <View className=" w-[88%] mt-5 ml-7">
            <Image 
              source={{ uri: "https://res.cloudinary.com/dub7qyv8e/image/upload/v1742986741/ixupbybdmaunwle35n5i.png" }} 
              className="w-full  h-[514px]"
              resizeMode="cover"
            />
          </View>
          <View className="mt-0 px-4">
  {/* Header Section */}
  <View className="flex-row justify-between items-center mt-5 mb-2">
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>New Arrival</Text>
    <TouchableOpacity>
      <Text style={{ fontSize: 16, color: 'green', fontWeight: '600' }}>View All →</Text>
    </TouchableOpacity>
  </View>

  {/* Horizontal Scroll for Products */}
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 1, paddingVertical: 22 }}
  >
    {newarrival.map((item, index) => (
      <View key={index} style={{ marginRight: 15 }}>
        <TouchableOpacity
          style={{
            width: 165,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: '100%',
              height: 250,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={{ marginTop: 8, fontSize: 14, fontWeight: '500' }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#16a34a' }}>
          ${item.price}
        </Text>
      </View>
    ))}
  </ScrollView>
</View>

<View className="mt-0 px-4">
  {/* Header Section */}
  <View className="flex-row justify-between items-center mt-5 mb-2">
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Hot Deal This Weak</Text>
    <TouchableOpacity>
      <Text style={{ fontSize: 16, color: 'green', fontWeight: '600' }}>View All →</Text>
    </TouchableOpacity>
  </View>

  {/* Horizontal Scroll for Products */}
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 1, paddingVertical: 22 }}
  >
    {newarrival.map((item, index) => (
      <View key={index} style={{ marginRight: 15 }}>
        <TouchableOpacity
          style={{
            width: 165,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: '100%',
              height: 250,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={{ marginTop: 8, fontSize: 14, fontWeight: '500' }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#16a34a' }}>
          ${item.price}
        </Text>
      </View>
    ))}
  </ScrollView>
</View>
        </ScrollView>
      </View>
    </ScrollView> // ✅ Properly closed the main ScrollView here
  );
  
};

export default HomeScreen;
