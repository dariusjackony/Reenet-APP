import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Alert } from "react-native";
import axios from "axios";
import { useState } from 'react';
import { Pressable,TextInput,Image, useColorScheme } from 'react-native';
import Constants from "expo-constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from "lucide-react-native";
import { useRouter } from 'expo-router';
import { ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
const createPosts = () => {
  const [postText, setPostText] = useState("")
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(null)
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const API_URL = Constants.expoConfig?.extra?.API_URL;
  const router = useRouter();
  
  const handlePost = async () => {
    if(!postText.trim()) return;
    try {
      setLoading(true)
      const response = await axios.post(API_URL, {
        signal_text: postText
      });
      console.log("Posted", response.data)
      Alert.alert("Success", "Posted Successfully")
      setPostText("")
    } catch (error){
      console.log("Error posting", error)
    } finally {
      setLoading(false)
    }
  }
  const data = [
    {label: "Public", value: "Public"},
    {label: "Everyone", value:"Everyone"}
  ]
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View>
            <View className='flex-row items-center justify-between px-4 py-6 border-b border-zinc-800'>
             <Pressable onPress={() => router.back("/posts")}>
              <X size={28} color="white" />
             </Pressable>
             <Text className="text-white text-xl font-bold">
              Create Post
             </Text>
             <Pressable
              onPress={handlePost}
             >
              <Text className="text-white text-xl font-bold">
                 {loading ? (
                 <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white font-bold">
                      Post
                    </Text>
                  )}
              </Text>
             </Pressable>
            </View>
            <View className="flex-row items-start p-3 bg-black">
            <Image
              source={require("../../assets/images/pfp.jpeg")}
              className="w-12 h-12 rounded-full"
            />
            <View className="flex-1 ml-3">
              <Text className="text-white font-semibold">
                Darius Jackony
              </Text>
              <View className="mt-2">

                <Dropdown
                  data={data}
                  value={value}
                  labelField="label"
                  valueField="value"
                  placeholder="Who can see this?"
                  onChange={(item) => setValue(item.value)}
                  style={{
                    height: 40,
                    width: 150,
                    borderWidth: 1,
                    borderColor: "#333",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: "#111",
                  }}
                  placeholderStyle={{
                    color: "#888",
                    fontSize: 13,
                  }}
                  selectedTextStyle={{
                    color: "#fff",
                    fontSize: 13,
                  }}
                  itemTextStyle={{
                    color: "#fff",
                  }}
                  containerStyle={{
                    backgroundColor: "#111",
                    borderColor: "#333",
                  }}
                />

              </View>

            </View>
          </View>
            <View className='px-2 py-8 pt-10'>
              <TextInput
                value={postText}
                onChangeText={setPostText}
                placeholder="What's on your mind?"
                placeholderTextColor="#888"
                className='text-white p-5 rounded-xl border border-zinc-900'
              />
            </View>
    </View>
    </SafeAreaView>
    
  )
}

export default createPosts

