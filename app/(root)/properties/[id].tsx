import Comment from "@/components/Comment";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { Property } from "@/types/property";

import { router, useLocalSearchParams } from "expo-router";

import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PropertyDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data: property, loading } = useAppwrite<Property, { id: string }>({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#22B27E" />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-base font-rubik">
          Property not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between px-5 mt-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="size-11 rounded-full border border-primary-200 items-center justify-center"
          >
            <Image
              source={icons.backArrow}
              className="size-6"
              tintColor="#22B27E"
            />
          </TouchableOpacity>

          <Text className="text-lg font-rubik-bold text-gold-100">
            Property Details
          </Text>

          <TouchableOpacity className="size-11 rounded-full border border-primary-200 items-center justify-center">
            <Image
              source={icons.heart}
              className="size-6"
              tintColor="#22B27E"
            />
          </TouchableOpacity>
        </View>

        {/* Property Image */}
        <View className="px-5 mt-6">
          <Image
            source={property.image ? { uri: property.image } : images.newYork}
            className="w-full h-72 rounded-3xl"
            resizeMode="cover"
          />
        </View>

        {/* Property Information */}
        <View className="px-5 mt-6">
          <Text className="text-2xl font-rubik-bold text-gold-100">
            {property.name}
          </Text>

          <View className="flex flex-row items-center mt-2">
            <Image
              source={icons.location}
              className="size-5"
              tintColor="#22B27E"
            />

            <Text className="text-sm font-rubik text-primary-100 ml-2 flex-1">
              {property.address}
            </Text>
          </View>

          {/* Type + Rating */}
          <View className="flex flex-row items-center mt-4">
            <View className="bg-primary-300 px-4 py-2 rounded-full">
              <Text className="text-sm font-rubik-medium text-primary-100">
                {property.type}
              </Text>
            </View>

            <View className="flex flex-row items-center ml-4">
              <Image
                source={icons.star}
                className="size-5"
                tintColor="#D4AF37"
              />

              <Text className="text-base font-rubik-medium text-gold-100 ml-1">
                {property.rating}
              </Text>
            </View>
          </View>

          {/* Property Stats */}
          <View className="flex flex-row items-center justify-between mt-6">
            <View className="items-center">
              <Image
                source={icons.bed}
                className="size-6"
                tintColor="#22B27E"
              />

              <Text className="text-sm text-primary-100 font-rubik mt-2">
                {property.bedrooms} Beds
              </Text>
            </View>

            <View className="items-center">
              <Image
                source={icons.bath}
                className="size-6"
                tintColor="#22B27E"
              />

              <Text className="text-sm text-primary-100 font-rubik mt-2">
                {property.bathrooms} Baths
              </Text>
            </View>

            <View className="items-center">
              <Image
                source={icons.area}
                className="size-6"
                tintColor="#22B27E"
              />

              <Text className="text-sm text-primary-100 font-rubik mt-2">
                {property.area} sqft
              </Text>
            </View>
          </View>
        </View>

        {/* Agent */}
        {property.agent && (
          <View className="px-5 mt-8">
            <Text className="text-xl font-rubik-bold text-gold-100">
              Listed by
            </Text>

            <View className="flex flex-row items-center mt-4">
              <Image
                source={{ uri: property.agent.avatar }}
                className="size-14 rounded-full"
              />

              <View className="ml-3 flex-1">
                <Text className="text-base text-primary-100 font-rubik-bold">
                  {property.agent.name}
                </Text>

                <Text className="text-sm text-primary-100 font-rubik mt-1">
                  {property.agent.email}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Overview */}
        <View className="px-5 mt-8">
          <Text className="text-xl font-rubik-bold text-gold-100">
            Overview
          </Text>

          <Text className="text-base text-primary-100 font-rubik mt-3 leading-6">
            {property.description}
          </Text>
        </View>

        {/* Facilities */}
        {(property.facilities?.length ?? 0) > 0 && (
          <View className="px-5 mt-8">
            <Text className="text-xl font-rubik-bold text-gold-100">
              Facilities
            </Text>

            <View className="flex flex-row flex-wrap mt-4 gap-3">
              {property.facilities?.map((item, index) => (
                <View
                  key={index}
                  className="bg-primary-300 rounded-xl px-4 py-3"
                >
                  <Text className="text-sm font-rubik-medium text-primary-100">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Gallery */}
        {(property.gallery?.length ?? 0) > 0 && (
          <View className="mt-8">
            <Text className="text-xl font-rubik-bold text-gold-100 px-5">
              Gallery
            </Text>

            <FlatList
              data={property.gallery}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.$id}
              contentContainerClassName="px-5 gap-4 mt-4"
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.image }}
                  className="w-72 h-48 rounded-2xl"
                  resizeMode="cover"
                />
              )}
            />
          </View>
        )}

        {/* Reviews */}
        {(property.reviews?.length ?? 0) > 0 && (
          <View className="px-5 mt-8">
            <Text className="text-xl font-rubik-bold text-gold-100">
              Reviews
            </Text>

            <View className="mt-5">
              {property.reviews.map((item) => (
                <View key={item.$id} className="mb-6">
                  <Comment item={item} />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyDetails;
