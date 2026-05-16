import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Alert } from "react-native";
import axios from "axios";
import { useState } from 'react';
import { Pressable,TextInput, useColorScheme } from 'react-native';
import Constants from "expo-constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from "lucide-react-native";

const createPosts = () => {
  const [postText, setPostText] = useState("")
  const [loading, setLoading] = useState(false)
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const API_URL = Constants.expoConfig?.extra?.API_URL;

  const handleSPost = async () => {
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
            <View>
             <Pressable>
              <X size={28} color="white" />
             </Pressable>
             <Text className='text-white'>
              Create Post
             </Text>
            </View>
            <View className='px-2 py-3 border-b pt-10 border-zinc-800'>
              <TextInput
                value={postText}
                onChangeText={setPostText}
                placeholder="What's on your mind?"
                placeholderTextColor="#888"
                className='text-white p-4 rounded-2xl border border-zinc-700'
              />
      
              <Pressable 
               onPress={handleSPost}
               className='bg-white mt-4 p-4 rounded-xl'>
                <Text className='text-black text-xl text-center font-bold'>
                  {loading ? "Posting.." : "Post"}
                </Text>
              </Pressable>
            </View>
    </View>
    </SafeAreaView>
    
  )
}

export default createPosts

const styles = StyleSheet.create({})