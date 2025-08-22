import React, { useState, useCallback, useMemo } from 'react';
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
  ScrollView,
} from 'tamagui';
import { generateMockListData, NewsItem, channels, Channel } from '../../utils/mockData';
import { useSearch } from '../../contexts/SearchContext';
import SearchHeader from '../../components/SearchHeader';

const { width } = Dimensions.get('window');

export default function ListScreen() {
  const [data, setData] = useState<NewsItem[]>(generateMockListData(0, 'headline'));
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [currentChannel, setCurrentChannel] = useState<string>('headline');
  
  // 使用 context 中的搜索关键词
  const { searchKeyword } = useSearch();

  // 根据搜索关键词过滤数据
  const filteredData = useMemo(() => {
    if (!searchKeyword.trim()) {
      return data;
    }
    return data.filter(item => 
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.author.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [data, searchKeyword]);

  // 切换频道
  const switchChannel = useCallback(async (channel: string) => {
    if (channel === currentChannel) return;
    
    setCurrentChannel(channel);
    setPage(1);
    setLoading(true);
    
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newData = generateMockListData(0, channel);
    setData(newData);
    setLoading(false);
  }, [currentChannel]);

  // 频道数据刷新
  const refreshChannelData = useCallback(async () => {
    setRefreshing(true);
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setData(generateMockListData(0, currentChannel));
    setPage(1);
    setRefreshing(false);
  }, [currentChannel]);

  // 加载更多数据
  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newData = generateMockListData(page, currentChannel);
    setData((prev: NewsItem[]) => [...prev, ...newData]);
    setPage((prev: number) => prev + 1);
    setLoading(false);
  }, [page, loading, currentChannel]);

  // 下拉刷新处理
  const onRefresh = useCallback(async () => {
    await refreshChannelData();
  }, [refreshChannelData]);

  const renderChannelTabs = () => (
    <YStack
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$gray3"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <XStack gap={0}>
          {channels.map((channel, index) => (
            <YStack key={channel.id}>
              <Button
                backgroundColor="transparent"
                paddingHorizontal={24}
                paddingVertical={4}
                onPress={() => switchChannel(channel.key)}
                borderBottomWidth={3}
                borderBottomColor={currentChannel === channel.key ? '$blue10' : 'transparent'}
                borderRadius={0}
                borderTopLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomLeftRadius={0}
                borderBottomRightRadius={0}
              >
                <Text
                  fontSize={16}
                  fontWeight={currentChannel === channel.key ? '600' : '400'}
                  color={currentChannel === channel.key ? '$blue10' : '$gray10'}
                >
                  {channel.name}
                </Text>
              </Button>
            </YStack>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );

  const renderItem = ({ item, index }: { item: NewsItem; index: number }) => (
    <YStack
      backgroundColor="$background"
      borderBottomWidth={index === filteredData.length - 1 ? 0 : 1}
      borderBottomColor="$gray3"
      width="100%"
    >
      <Button
        testID={`news-item-${index}`}
        onPress={() => router.push(`/(detail)/detail?id=${item.id}` as any)}
        backgroundColor="transparent"
        padding={0}
        margin={0}
        height="auto"
        minHeight="auto"
        maxHeight="none"
        pressStyle={{ backgroundColor: '$gray1' }}
        width="100%"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <YStack
          padding={20}
          backgroundColor="$background"
          width="100%"
          flex={1}
        >
          <XStack gap={16} width="100%" alignItems="flex-start">
            {/* 左侧文字内容 */}
            <YStack flex={1} justifyContent="space-between" minHeight={90}>
              <Text
                fontSize={16}
                fontWeight="600"
                color="$color"
                numberOfLines={3}
                lineHeight={22}
                marginBottom={12}
                textAlign="left"
              >
                {item.title}
              </Text>
              
              {/* 作者和发布时间信息 */}
              <XStack alignItems="center" gap={16}>
                <Text fontSize={12} color="$gray9" textAlign="left">
                  {item.author}
                </Text>
                <Text fontSize={12} color="$gray9" textAlign="left">
                  {item.publishTime}
                </Text>
              </XStack>
            </YStack>

            {/* 右侧图片 */}
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                width={120}
                height={90}
                borderRadius={8}
                resizeMode="cover"
              />
            )}
          </XStack>
        </YStack>
      </Button>
    </YStack>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <YStack padding={24} alignItems="center">
        <Spinner size="small" color="$blue10" />
        <Text marginTop={12} fontSize={14} color="$gray10">
          加载中...
        </Text>
      </YStack>
    );
  };

  // 频道切换时的 loading 状态
  const renderChannelLoading = () => {
    if (!loading) return null;
    return (
      <YStack
        backgroundColor="$background"
        padding={20}
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <Spinner size="large" color="$blue10" />
        <Text marginTop={16} fontSize={16} color="$gray10">
          正在加载 {channels.find(c => c.key === currentChannel)?.name} 频道内容...
        </Text>
      </YStack>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <YStack flex={1} backgroundColor="$background">
        {/* 搜索栏 */}
        <YStack
          backgroundColor="$background"
          paddingHorizontal={20}
          paddingVertical={16}
          borderBottomWidth={1}
          borderBottomColor="$gray3"
        >
          <SearchHeader />
        </YStack>
        
        {/* 频道切换tab栏 */}
        {renderChannelTabs()}
        
        {/* 列表内容 */}
        {loading && page === 1 ? (
          renderChannelLoading()
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            removeClippedSubviews={false}
            getItemLayout={undefined}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        )}
      </YStack>
    </SafeAreaView>
  );
} 