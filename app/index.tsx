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
     <Link href="/signup">signup</Link>
     <Link href="/explore">Explore</Link>
     <Link href="/profile">profile</Link>
     <Link href={"/auth-status"}>check auth status</Link>
    </View>
  );
}
