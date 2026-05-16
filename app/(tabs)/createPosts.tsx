import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Alert } from "react-native";
import axios from "axios";
import { useState } from 'react';
import { Pressable,TextInput, useColorScheme } from 'react-native';
import Constants from "expo-constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from "lucide-react-native";
import { useRouter } from 'expo-router';
import { ActivityIndicator } from "react-native";

const createPosts = () => {
  const [postText, setPostText] = useState("")
  const [loading, setLoading] = useState(false)
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
            <View className='px-2 py-3 pt-10'>
              <TextInput
                value={postText}
                onChangeText={setPostText}
                placeholder="What's on your mind?"
                placeholderTextColor="#888"
                className='text-white p-4 rounded-2xl border border-zinc-700'
              />
            </View>
    </View>
    </SafeAreaView>
    
  )
}

export default createPosts

