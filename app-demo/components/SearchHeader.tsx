import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  XStack,
  Input,
  Button,
  Text,
  YStack,
} from 'tamagui';
import { useSearch } from '../contexts/SearchContext';

interface SearchHeaderProps {
  placeholder?: string;
}

export default function SearchHeader({ placeholder = "搜索资讯内容..." }: SearchHeaderProps) {
  const { searchKeyword, setSearchKeyword } = useSearch();

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const clearSearch = () => {
    setSearchKeyword('');
  };

  return (
    <XStack alignItems="center" gap={16} flex={1}>
      {/* Logo 区域 */}
      <XStack alignItems="center" gap={8} flexShrink={0} width={100}>
        <YStack
          width={32}
          height={32}
          backgroundColor="$blue10"
          borderRadius={6}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize={12}
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            VN
          </Text>
        </YStack>
        
        <YStack flex={1} width={60} height={32} >
          <Text
            fontSize={14}
            fontWeight="bold"
            color="$color"
            textAlign="left"
            lineHeight={32}
          >
            Very News
          </Text>
        </YStack>
      </XStack>

      {/* 搜索框 - 靠右对齐 */}
      <XStack
        backgroundColor="$gray1"
        borderRadius={18}
        paddingHorizontal={14}
        paddingVertical={8}
        alignItems="center"
        gap={6}
        flex={1}
        maxWidth={220}
        borderWidth={1}
        borderColor="$gray3"
        height={32}
      >
        <Ionicons name="search-outline" size={16} color="#8E8E93" />
        <Input
          flex={1}
          placeholder={placeholder}
          value={searchKeyword}
          onChangeText={handleSearch}
          borderWidth={0}
          backgroundColor="transparent"
          fontSize={13}
          padding={0}
          placeholderTextColor="#8E8E93"
          fontWeight="400"
        />
        {searchKeyword.length > 0 && (
          <Button
            size="$2"
            circular
            backgroundColor="transparent"
            onPress={clearSearch}
            padding={3}
            pressStyle={{ backgroundColor: '$gray2' }}
          >
            <Ionicons name="close-circle" size={14} color="#8E8E93" />
          </Button>
        )}
      </XStack>
    </XStack>
  );
} 