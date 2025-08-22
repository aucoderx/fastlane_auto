import React from 'react';
import { ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  YStack,
  XStack,
  Text,
  Image,
  Button,
  Card,
  Separator,
  Avatar,
} from 'tamagui';

export default function UserCenterScreen() {
  const renderUserInfo = () => (
    <Card
      backgroundColor="$blue1"
      borderWidth={1}
      borderColor="$blue3"
      borderRadius={16}
      padding={20}
      margin={16}
    >
      <XStack alignItems="center" gap={16}>
        <Avatar circular size="$8">
          <Avatar.Image
            source={{ uri: 'https://picsum.photos/200/200?random=1' }}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack flex={1}>
          <Text fontSize={20} fontWeight="bold" color="$color">
            用户名
          </Text>
          <Text fontSize={14} color="$gray10" marginTop={4}>
            用户简介：热爱阅读，关注时事
          </Text>
        </YStack>
        <Button
          size="$3"
          variant="outlined"
          borderColor="$blue8"
          color="$blue10"
        >
          编辑资料
        </Button>
      </XStack>
    </Card>
  );

  const renderToolSection = () => (
    <Card
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius={12}
      margin={16}
      marginTop={0}
    >
      <YStack padding={16}>
        <Text fontSize={16} fontWeight="600" color="$color" marginBottom={16}>
          工具模块
        </Text>
        <XStack justifyContent="space-around">
          <Button
            backgroundColor="transparent"
            padding={0}
            alignItems="center"
            gap={0}
          >
            <YStack
              width={50}
              height={50}
              backgroundColor="$orange3"
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="heart-outline" size={24} color="#FF6B35" />
            </YStack>
            <Text fontSize={12} color="$color">
              收藏
            </Text>
          </Button>
          <Button
            backgroundColor="transparent"
            padding={0}
            alignItems="center"
            gap={0}
          >
            <YStack
              width={50}
              height={50}
              backgroundColor="$blue3"
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="time-outline" size={24} color="#007AFF" />
            </YStack>
            <Text fontSize={12} color="$color">
              历史
            </Text>
          </Button>
          <Button
            backgroundColor="transparent"
            padding={0}
            alignItems="center"
            gap={0}
          >
            <YStack
              width={50}
              height={50}
              backgroundColor="$green3"
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="thumbs-up-outline" size={24} color="#34C759" />
            </YStack>
            <Text fontSize={12} color="$color">
              已赞
            </Text>
          </Button>
        </XStack>
      </YStack>
    </Card>
  );

  const renderCommonFunctions = () => (
    <Card
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius={12}
      margin={16}
      marginTop={0}
    >
      <YStack padding={16}>
        <Text fontSize={16} fontWeight="600" color="$color" marginBottom={16}>
          常用功能
        </Text>
        <YStack gap={12}>
          <Button
            backgroundColor="transparent"
            padding={0}
            alignItems="center"
            justifyContent="flex-start"
            gap={12}
          >
            <YStack
              width={40}
              height={40}
              backgroundColor="$gray3"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
            >
              <MaterialIcons name="security" size={20} color="#666" />
            </YStack>
            <Text fontSize={14} color="$color" flex={1} textAlign="left">
              安全中心
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </Button>
          
          <Separator backgroundColor="$gray3" />
          
          <Button
            backgroundColor="transparent"
            padding={0}
            alignItems="center"
            justifyContent="flex-start"
            gap={12}
          >
            <YStack
              width={40}
              height={40}
              backgroundColor="$gray3"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="text-outline" size={20} color="#666" />
            </YStack>
            <Text fontSize={14} color="$color" flex={1} textAlign="left">
              字号设置
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </Button>
          
          <Separator backgroundColor="$gray3" />
          
          <Button
            backgroundColor="transparent"
            padding={0}
            alignItems="center"
            justifyContent="flex-start"
            gap={12}
          >
            <YStack
              width={40}
              height={40}
              backgroundColor="$gray3"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="help-circle-outline" size={20} color="#666" />
            </YStack>
            <Text fontSize={14} color="$color" flex={1} textAlign="left">
              帮助反馈
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </Button>
        </YStack>
      </YStack>
    </Card>
  );

  const renderLogoutButton = () => (
    <YStack padding={16}>
      <Button
        backgroundColor="$red10"
        color="white"
        borderRadius={12}
        paddingVertical={4}
        fontWeight="600"
        onPress={() => {
          // 处理退出登录逻辑
          console.log('退出登录');
        }}
      >
        退出登录
      </Button>
    </YStack>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {renderUserInfo()}
        {renderToolSection()}
        {renderCommonFunctions()}
        {renderLogoutButton()}
      </ScrollView>
    </SafeAreaView>
  );
} 