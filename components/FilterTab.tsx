import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const FilterTab = () => {
  const params = useLocalSearchParams<{ filter?: string }>();

  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "all",
  );

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item) => (
        <TouchableOpacity
          key={item.category}
          onPress={() => handleCategoryPress(item.category)}
          className={`mr-4 px-4 py-2 rounded-full ${
            selectedCategory === item.category
              ? "bg-primary-300"
              : "border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === item.category
                ? "text-white font-rubik-bold mt-0.5"
                : "text-primary-200 font-rubik"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterTab;
