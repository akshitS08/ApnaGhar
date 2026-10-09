import { Card } from "@/components/Cards";
import FilterTab from "@/components/FilterTab";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { Property } from "@/types/property";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Exlpore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: properties, loading } = useAppwrite<
    Property[],
    {
      filter: string;
      query: string;
      limit?: number;
    }
  >({
    fn: getProperties,
    params: {
      filter: params.filter || "all",
      query: params.query || "",
      limit: 20,
    },
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-black border border-primary-300 rounded-full size-11 items-center justify-center"
              >
                <Image
                  source={icons.backArrow}
                  className="size-8"
                  tintColor="#22B27E"
                />
              </TouchableOpacity>

              <Text className="text-base mr-2 font-rubik-medium text-gold-100">
                Search for Your Ideal Home
              </Text>

              <Image
                source={icons.bell}
                className="size-8"
                tintColor="#22B27E"
              />
            </View>

            <Search />

            <View className="mt-5">
              <FilterTab />
              <Text className="text-xl font-rubik-bold text-gold-100 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
