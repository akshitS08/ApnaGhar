import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500,
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    <View
      className="flex flex-row items-center justify-between w-full px-4 rounded-full 
    bg-black border border-1 border-primary-300 mt-5 py-1"
    >
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-7" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for property"
          placeholderTextColor="#BFE8D7"
          className="text-xm font-rubik text-primary-100 ml-2 flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-7" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
