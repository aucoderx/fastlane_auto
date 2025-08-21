import { device, element, by, expect } from 'detox';

describe('Home Screen', () => {
  beforeAll(async () => {
    console.log("======================= launch app ========================")
    await device.launchApp({ 
      newInstance: true,
      permissions: { notifications: 'YES' } // Add if needed
    });
    console.log("======================= launch completed ========================")
    // 等待一下让应用完全加载
    await new Promise(resolve => setTimeout(resolve, 60000));
    // 立即截图看应用当前状态
    console.log("Taking screenshot after app launch...");
    await device.takeScreenshot('app-launch-state');
   
     // 检查是否有错误信息显示
    try {
      // 常见的错误提示元素
      const errorElements = [
        by.text('Error'),
        by.text('错误'),
        by.text('Network Error'),
        by.text('Failed to load'),
        by.text('Something went wrong'),
        by.text('Unable to connect'),
        by.id('error-message'),
        by.id('errorMessage'),
        by.type('RCTRedBox'), // React Native 红屏错误
      ];
      
      for (const errorElement of errorElements) {
        try {
          await expect(element(errorElement)).toBeVisible();
          console.log(`Found error element: ${errorElement}`);
          await device.takeScreenshot('error-found');
          break;
        } catch (e) {
          // 继续检查下一个可能的错误元素
        }
      }
    } catch (error) {
      console.log("No obvious error elements found. ", error);
    }
    
    console.log("======================= launch app end ========================")
  }, 600000);

  it('should display the Home screen with title and content', async () => {
    console.log("enter should display the Home screen with title and content")
    const platform = device.getPlatform();
    await expect(element(by.id('index-page'))).toBeVisible();
    await device.takeScreenshot(platform + '_index-page');

    // 点击 Tabs 项
    await element(by.id('drawer-toggle-container')).tap();
    await device.takeScreenshot(platform + '_drawer-button');

    await element(by.id('drawer-tabs')).tap();

        // 点击 Tab One
    await element(by.id('tab-one-button')).tap();
    await expect(element(by.id('tab-one'))).toBeVisible();
    await device.takeScreenshot(platform + '_tab-one');

    // 点击 Tab Two
    await element(by.id('tab-two-button')).tap();
    await device.takeScreenshot(platform + '_tab-two');
  });
});