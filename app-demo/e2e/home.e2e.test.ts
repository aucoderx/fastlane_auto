import { device, element, by, expect } from 'detox';

describe('Home Screen', () => {
  beforeAll(async () => {
        // 立即截图看应用当前状态
    console.log("Taking screenshot before app launch...");
    await device.takeScreenshot('app-launch-state0');
    console.log("======================= launch app ========================")
    await device.launchApp({ 
      newInstance: true,
      permissions: { notifications: 'YES' }, // Add if needed
    });
    console.log("======================= launch completed ========================")
    // 等待一下让应用完全加载
    await new Promise(resolve => setTimeout(resolve, 60000));
    // 立即截图看应用当前状态
    console.log("Taking screenshot after app launch...");
    await device.takeScreenshot('app-launch-state');
   
    
    console.log("======================= launch app end ========================")
  }, 600000);

  it('should display the Home screen with title and content', async () => {
    console.log("enter should display the Home screen with title and content")
    const platform = device.getPlatform();
    await expect(element(by.id('tab-index'))).toBeVisible();
    await device.takeScreenshot(platform + '_tab-index');


    await element(by.id('tab-card-list')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await device.takeScreenshot(platform + '_tab-card-list');


    await element(by.id('tab-user-center')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await device.takeScreenshot(platform + '_tab-user-center');

    // 点击 Tab Two
    await element(by.id('tab-index')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000)); 
    await element(by.id('news-item-0')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000)); 
    await device.takeScreenshot(platform + '_news-item-detail');
  });
});