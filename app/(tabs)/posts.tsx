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
import {Plus} from  "lucide-react-native";
import { useRouter } from 'expo-router';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2
} from "lucide-react-native";



type Post = {
  id: number;
  username: string;
  content: string;
  likes: number;
  liked: boolean;
}


const Posts = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([
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
  
  const toggleLike = (id: number) => {
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

  const renderPost = ({ item }: {item: Post}) => (
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


      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable
      onPress={()=> router.push("/createPosts")}
      className="absolute bottom-6 right-6 bg-white w-14 h-14 items-center justify-center rounded-full"
      >
        <Plus size={28} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};

export default Posts;

const styles = StyleSheet.create({});