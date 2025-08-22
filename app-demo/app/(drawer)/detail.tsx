import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
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

  useEffect(() => {
    if (id) {
      // 模拟网络请求
      setTimeout(() => {
        setDetailData(getMockDetailData(id, width));
        setLoading(false);
      }, 500);
    }
  }, [id, width]);

  if (loading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" color="$blue10" />
        <Text marginTop={16} fontSize={16} color="$gray10">
          加载中...
        </Text>
      </YStack>
    );
  }

  if (!detailData) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={16} color="$gray10">
          未找到相关内容
        </Text>
      </YStack>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
    >
      {/* 头部信息 */}
      <YStack padding={20} paddingBottom={16}>
        <Text
          fontSize={24}
          fontWeight="bold"
          color="$color"
          lineHeight={32}
          marginBottom={16}
        >
          {detailData.title}
        </Text>
        
        <XStack alignItems="center" gap={16} marginBottom={16}>
          <XStack alignItems="center" gap={6}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text fontSize={14} color="$gray10">
              {detailData.author}
            </Text>
          </XStack>
          <XStack alignItems="center" gap={6}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text fontSize={14} color="$gray10">
              {detailData.publishTime}
            </Text>
          </XStack>
          <XStack alignItems="center" gap={6}>
            <Ionicons name="eye-outline" size={16} color="#666" />
            <Text fontSize={14} color="$gray10">
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
              borderColor="$blue8"
              color="$blue10"
              backgroundColor="$blue1"
              paddingHorizontal={12}
              paddingVertical={4}
            >
              {tag}
            </Button>
          ))}
        </XStack>
      </YStack>

      <Separator />

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
          fontSize={16}
          color="$color"
          lineHeight={26}
          textAlign="justify"
        >
          {detailData.content}
        </Text>
      </YStack>

      {/* 底部操作栏 */}
      <Card
        backgroundColor="$background"
        borderTopWidth={1}
        borderTopColor="$borderColor"
        padding={16}
        marginTop={20}
      >
        <XStack justifyContent="space-around" alignItems="center">
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={8}
            padding={12}
          >
            <Ionicons name="heart-outline" size={24} color="#FF6B35" />
            <Text fontSize={14} color="$color">
              点赞
            </Text>
          </Button>
          
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={8}
            padding={12}
          >
            <Ionicons name="bookmark-outline" size={24} color="#007AFF" />
            <Text fontSize={14} color="$color">
              收藏
            </Text>
          </Button>
          
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={8}
            padding={12}
          >
            <Ionicons name="share-outline" size={24} color="#34C759" />
            <Text fontSize={14} color="$color">
              分享
            </Text>
          </Button>
          
          <Button
            backgroundColor="transparent"
            alignItems="center"
            gap={8}
            padding={12}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#FF9500" />
            <Text fontSize={14} color="$color">
              评论
            </Text>
          </Button>
        </XStack>
      </Card>
    </ScrollView>
  );
} 