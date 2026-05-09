import {Pressable, StyleSheet, Text, TextInput, View, useColorScheme, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import React from 'react'

const posts = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const posts = [
    {
      id: 1,
      username: "Darius",
      content: "Learning React Native is fun",
    },
    {
      id: 2,
      username: "Isaac",
      content: "Networking and coding today.",
    },
    {
      id: 3,
      username: "Zero-Day",
      content: "Building my first mobile app.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 dark:bg-black bg-white">
      <StatusBar style="light" />
      <View className="h-16 border-b border-zinc-800 flex-row items-center justify-between px-5">
        <Text className="text-white text-2xl font-bold">
         REENET
        </Text>
        <Image 
         source={require("../../assets/images/pfp.jpeg")}
         className='w-10 h-10 rounded-full'
        />
       </View>
      <View className='flex-1 px-2 dark:bg-black'>
      <TextInput
       placeholder="What's on your mind?"
       placeholderTextColor="#888"
       className='text-white p-4 mt-2 rounded-2xl border border-zinc-700'
      />
      <Pressable
      className='bg-white mt-4 p-4 rounded-xl'
      >
        <Text className='text-black text-xl text-center font-bold'>
          Post
        </Text>
      </Pressable>
    </View>
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id.toString()}
      renderItem={({item}) =>(
        <View className='px-2 mt-5'>
            <View className="flex-row items-center mb-2">
              <Image
                source={require("../../assets/images/pfp.jpeg")}
                className="w-10 h-10 rounded-full mr-3"
              />
              <Text className='text-white font-bold text-lg'>
                {item.username}
              </Text>
            </View>
            <Text className='text-white ml-12 mb-2'>
              {item.content}
            </Text>
        </View>
      )}
    />
    </SafeAreaView>
    
  )
}

export default posts

const styles = StyleSheet.create({})