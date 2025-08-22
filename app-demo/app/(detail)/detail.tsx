import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  YStack,
  XStack,
  Text,
  Image,
  Button,
  Card,
  Separator,
  Spinner,
} from 'tamagui';
import { getMockDetailData, NewsDetail } from '../../utils/mockData';

const { width } = Dimensions.get('window');

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [detailData, setDetailData] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    if (id) {
      // 模拟网络请求
      setTimeout(() => {
        setDetailData(getMockDetailData(id, width));
        setLoading(false);
      }, 500);
    }
  }, [id, width]);

  // 字号设置处理
  const handleFontSizeChange = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  // 夜间/日间模式切换
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 获取字号大小
  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$blue10" />
          <Text marginTop={16} fontSize={16} color="$gray10">
            加载中...
          </Text>
        </YStack>
      </SafeAreaView>
    );
  }

  if (!detailData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Text fontSize={16} color="$gray10">
            未找到相关内容
          </Text>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }}>
      {/* 状态栏 */}
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#2a2a2a' : '#FFFFFF'}
      />
      
      <YStack flex={1} backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}>
        {/* 自定义 Header */}
        <YStack
          backgroundColor={isDarkMode ? '#2a2a2a' : '#FFFFFF'}
          paddingHorizontal={16}
          paddingVertical={0}
          borderBottomWidth={1}
          borderBottomColor={isDarkMode ? '#333' : '#E5E5EA'}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          elevation={4}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
        >
          {/* 左侧返回按钮 */}
          <Button
            backgroundColor="transparent"
            padding={6}
            onPress={() => router.back()}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={isDarkMode ? '#fff' : '#000'} 
            />
          </Button>

          {/* 右侧功能按钮 */}
          <XStack gap={12}>
            {/* 字号设置按钮 */}
            <Button
              backgroundColor="transparent"
              padding={6}
              onPress={handleFontSizeChange}
            >
              <Ionicons 
                name="text-outline" 
                size={20} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
            </Button>

            {/* 夜间/日间模式切换按钮 */}
            <Button
              backgroundColor="transparent"
              padding={6}
              onPress={toggleDarkMode}
            >
              <Ionicons 
                name={isDarkMode ? "sunny-outline" : "moon-outline"} 
                size={20} 
                color={isDarkMode ? '#fff' : '#666'} 
              />
            </Button>
          </XStack>
        </YStack>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* 头部信息 */}
        <YStack padding={20} paddingBottom={16} >
          <Text
            fontSize={24}
            fontWeight="bold"
            color={isDarkMode ? '#fff' : '$color'}
            lineHeight={32}
            marginBottom={16}
          >
            {detailData.title}
          </Text>
          
          <XStack alignItems="center" gap={16} marginBottom={16}>
            <XStack alignItems="center" gap={6}>
              <Ionicons name="person-outline" size={16} color={isDarkMode ? '#ccc' : '#666'} />
              <Text fontSize={14} color={isDarkMode ? '#ccc' : '$gray10'}>
                {detailData.author}
              </Text>
            </XStack>
            <XStack alignItems="center" gap={6}>
              <Ionicons name="time-outline" size={16} color={isDarkMode ? '#ccc' : '#666'} />
              <Text fontSize={14} color={isDarkMode ? '#ccc' : '$gray10'}>
                {detailData.publishTime}
              </Text>
            </XStack>
            <XStack alignItems="center" gap={6}>
              <Ionicons name="eye-outline" size={16} color={isDarkMode ? '#ccc' : '#666'} />
              <Text fontSize={14} color={isDarkMode ? '#ccc' : '$gray10'}>
                {detailData.readCount} 阅读
              </Text>
            </XStack>
          </XStack>

          {/* 标签 */}
          <XStack gap={8}>
            {detailData.tags.map((tag: string) => (
              <Button
                key={tag}
                size="$2"
                variant="outlined"
                borderColor={isDarkMode ? '#555' : '$blue8'}
                color={isDarkMode ? '#fff' : '$blue10'}
                backgroundColor={isDarkMode ? '#333' : '$blue1'}
                paddingHorizontal={12}
                paddingVertical={0}
              >
                {tag}
              </Button>
            ))}
          </XStack>
        </YStack>

        <Separator backgroundColor={isDarkMode ? '#333' : '$borderColor'} />

        {/* 主图 */}
        <Image
          source={{ uri: detailData.imageUrl }}
          width={width}
          height={300}
          resizeMode="cover"
          marginBottom={20}
        />

        {/* 正文内容 */}
        <YStack padding={20} paddingTop={0}>
          <Text
            fontSize={getFontSize()}
            color={isDarkMode ? '#fff' : '$color'}
            lineHeight={26}
            textAlign="justify"
          >
            {detailData.content}
          </Text>
        </YStack>
      </ScrollView>

      {/* 底部工具栏 - Fixed 定位 */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor={isDarkMode ? '#2a2a2a' : '#FFFFFF'}
        borderTopWidth={1}
        borderTopColor={isDarkMode ? '#333' : '#E5E5EA'}
        paddingVertical={12}
        paddingHorizontal={16}
        elevation={8}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: -2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
      >
        <XStack justifyContent="space-around" alignItems="center">
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={1}
            padding={8}
            flex={1}
          >
            <Ionicons name="heart-outline" size={20} color="#FF6B35" />
            <Text 
              fontSize={12} 
              color={isDarkMode ? '#fff' : '$color'}
              textAlign="left"
              flex={1}
            >
              点赞
            </Text>
          </Button>
          
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={1}
            padding={8}
            flex={1}
          >
            <Ionicons name="bookmark-outline" size={20} color="#007AFF" />
            <Text 
              fontSize={12} 
              color={isDarkMode ? '#fff' : '$color'}
              textAlign="left"
              flex={1}
            >
              收藏
            </Text>
          </Button>
          
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={1}
            padding={8}
            flex={1}
          >
            <Ionicons name="share-outline" size={20} color="#34C759" />
            <Text 
              fontSize={12} 
              color={isDarkMode ? '#fff' : '$color'}
              textAlign="left"
              flex={1}
            >
              分享
            </Text>
          </Button>
          
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={1}
            padding={8}
            flex={1}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#FF9500" />
            <Text 
              fontSize={12} 
              color={isDarkMode ? '#fff' : '$color'}
              textAlign="left"
              flex={1}
            >
              评论
            </Text>
          </Button>
        </XStack>
      </YStack>
    </YStack>
    </SafeAreaView>
  );
} 