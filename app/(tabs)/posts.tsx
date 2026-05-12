import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  Image,
  FlatList
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';

import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2
} from "lucide-react-native";
import axios from "axios";
import { API_URL } from "@env";

const [postText, setPostText] = useState("")
const [loading, setLoading] = useState(false)


const handleSPost = async () => {
  if(!postText.trim()) return;
  try {
    setLoading(true)
    const response = await axios.post(API_URL, {
      content: postText
    });
    console.log("Posted", response.data)
    setPostText("")
  } catch (error){
    console.log("Error posting", error)
  } finally {
    setLoading(false)
  }
}
const Posts = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Darius",
      content: "Learning React Native is fun",
      liked: false,
      likes: 12,
    },
    {
      id: 2,
      username: "Isaac",
      content: "My girlfriend is comming to visit me.",
      liked: false,
      likes: 8,
    },
    {
      id: 3,
      username: "Woori Timothy Otala",
      content: "Revising mathematics today with my bold head...",
      liked: false,
      likes: 24,
    },
  ]);

  const toggleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  const renderPost = ({ item }) => (
    <View className="p-4 border-b border-zinc-800">

      <View className="flex-row items-center mb-3">
        <Image
          source={require("../../assets/images/pfp.jpeg")}
          className="w-10 h-10 rounded-full mr-3"
        />

        <Text className="text-white text-lg font-bold">
          {item.username}
        </Text>
      </View>

      <Text className="text-white text-base mb-4 ml-10">
        {item.content}
      </Text>

      <View className="flex-row justify-around">

        <Pressable
          onPress={() => toggleLike(item.id)}
          className="flex-row items-center gap-2"
        >
          <Heart
            size={20}
            color={item.liked ? "#ef4444" : "#9ca3af"}
            fill={item.liked ? "#ef4444" : "none"}
          />

          <Text className="text-zinc-400">
            {item.likes}
          </Text>
        </Pressable>

        <Pressable className="flex-row items-center gap-2">
          <MessageCircle size={20} color="#9ca3af" />

          <Text className="text-zinc-400">
            3
          </Text>
        </Pressable>

        <Pressable>
          <Bookmark size={20} color="#9ca3af" />
        </Pressable>

        <Pressable>
          <Share2 size={20} color="#9ca3af" />
        </Pressable>

      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
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

      <View className='px-2 py-3 border-b border-zinc-800'>
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

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />

    </SafeAreaView>
  );
};

export default Posts;

const styles = StyleSheet.create({});