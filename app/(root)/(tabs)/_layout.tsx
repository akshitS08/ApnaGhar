import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const TabsLayout = () => {
  const TabIcon = ({
    focused,
    icon,
    title,
  }: {
    focused: boolean;
    title: string;
    icon: any;
  }) => (
    <View className="flex-1 mt-3 flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#DFC47A" : "#F1EDE2"}
        resizeMode="contain"
        className="size-7"
      />
      <Text
        className={`${
          focused
            ? "text-gold-200 font-rubik-medium"
            : "text-accent-100 font-rubik"
        } text-xs w-full text-center mt-1 `}
      >
        {title}
      </Text>
    </View>
  );
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#064E3B",
          position: "absolute",
          borderTopColor: "#C9A24B",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} title="Explore" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} title="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
