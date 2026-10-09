import icons from "@/constants/icons";
import images from "@/constants/images";
import { Property } from "@/types/property";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: Property;
  onPress?: () => void;
}
export const FeaturedCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-center w-60 h-80 relative"
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-black/90 px-3 py-1 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xm font-rubik-bold text-primary-200 ml-1">
          {rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-primary-100"
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text className="text-base font-rubik text-gold-100">{address}</Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-accent-100">
            ${price}
          </Text>

          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-black-300 shadow-lg shadow-black-100/70 relative"
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-black/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5 mr-1" />
        <Text className="text-xs font-rubik-bold text-primary-200 ml-0.5">
          {rating}
        </Text>
      </View>

      <Image source={{ uri: image }} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-primary-300">
          {name}
        </Text>

        <Text className="text-xs font-rubik text-gold-200">{address}</Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-200">
            ${price}
          </Text>

          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#22B27E"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
