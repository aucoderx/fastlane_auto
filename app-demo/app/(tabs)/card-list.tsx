import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  YStack,
  XStack,
  Text,
  Image,
  Spinner,
  Button,
  Card,
} from 'tamagui';
import { generateMockCardData, NewsItem } from '../../utils/mockData';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 48 = 16 * 3 (左右边距 + 中间间距)

export default function CardListScreen() {
  const [data, setData] = useState<NewsItem[]>(generateMockCardData(0));
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  // 加载更多数据
  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newData = generateMockCardData(page);
    setData((prev: NewsItem[]) => [...prev, ...newData]);
    setPage((prev: number) => prev + 1);
    setLoading(false);
  }, [page, loading]);

  // 下拉刷新处理
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setData(generateMockCardData(0));
    setPage(1);
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Button
      onPress={() => router.push(`/(detail)/detail?id=${item.id}` as any)}
      backgroundColor="transparent"
      padding={0}
      margin={0}
      width={cardWidth}
      height="auto"
      minHeight="auto"
      maxHeight="none"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Card
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius={12}
        overflow="hidden"
        margin={8}
        elevation={2}
        width="100%"
        flex={1}
      >
        <Image
          source={{ uri: item.imageUrl }}
          width="100%"
          height={120}
          resizeMode="cover"
        />
        <YStack padding={12} width="100%" flex={1}>
          <Text
            fontSize={14}
            fontWeight="600"
            color="$color"
            numberOfLines={2}
            lineHeight={18}
            marginBottom={6}
            textAlign="left"
          >
            {item.title}
          </Text>
          <Text
            fontSize={12}
            color="$gray10"
            numberOfLines={2}
            lineHeight={16}
            marginBottom={8}
            textAlign="left"
          >
            {item.summary}
          </Text>
          <XStack justifyContent="space-between" alignItems="center" width="100%" marginTop="auto">
            <Text fontSize={11} color="$gray9" textAlign="left">
              {item.author}
            </Text>
            <Text fontSize={11} color="$gray9" textAlign="left">
              {item.readCount} 阅读
            </Text>
          </XStack>
        </YStack>
      </Card>
    </Button>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <YStack padding={20} alignItems="center">
        <Spinner size="small" color="$blue10" />
        <Text marginTop={8} fontSize={14} color="$gray10">
          加载中...
        </Text>
      </YStack>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
        removeClippedSubviews={false}
        getItemLayout={undefined}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </SafeAreaView>
  );
} 