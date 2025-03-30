import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <Text className="text-3xl font-bold">Lent it</Text>
     <Link href="/sign-in">Sign-in</Link>
     <Link href="/explore">Explore</Link>
     <Link href="/profile">profile</Link>
     <Link href="/home">home</Link>
    <Link href="/checkout">checkout</Link>
    <Link href="/promo">promo</Link>
    <Link href="/delivery">delivery</Link>
    <Link href="/payement">payement</Link>
      
    
    
    </View>
  );
}
