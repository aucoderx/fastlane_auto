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
      await element(by.text('Wait')).tap();
    } catch (error) {
      console.log("No obvious error elements found. ", error);
    }

    await device.takeScreenshot('app-launch-state2');

    try {
      // 常见的错误提示元素
      await device.pressBack();
    } catch (error) {
      console.log("No obvious error elements found 3. ", error);
    }

    await device.takeScreenshot('app-launch-state3');
    
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