import { device, element, by, expect } from 'detox';

describe('Home Screen', () => {
  beforeAll(async () => {
    console.log("======================= launch app ========================")
    await device.launchApp({ 
      newInstance: true,
      permissions: { notifications: 'YES' }, // Add if needed
    });
    // 等待一下让应用完全加载
    await new Promise(resolve => setTimeout(resolve, 40000)); 
    console.log("======================= launch app end ========================")
  }, 600000);

  it('should display the Home screen with title and content', async () => {
    console.log("enter should display the Home screen with title and content")
    const platform = device.getPlatform();
    await expect(element(by.id('tab-index'))).toBeVisible();
    if (platform === 'android') {
      await device.takeScreenshot(platform + '_tab-index');
    } else {
      await device.takeScreenshot('iPhone-13-Pro-' + 'tab-index');
    }
    

    await element(by.id('tab-card-list')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000));
    await device.takeScreenshot(platform + '_tab-card-list');
    if (platform === 'android') {
      await device.takeScreenshot(platform + '_tab-card-list');
    } else {
      await device.takeScreenshot('iPhone-13-Pro-' + 'tab-card-list');
    }


    await element(by.id('tab-user-center')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000));
    if (platform === 'android') {
      await device.takeScreenshot(platform + '_tab-user-center');
    } else {
      await device.takeScreenshot('iPhone-13-Pro-' + 'tab-user-center');
    }

    // 点击 Tab Two
    await element(by.id('tab-index')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000)); 
    await element(by.id('news-item-0')).tap();
    await new Promise(resolve => setTimeout(resolve, 5000)); 
    if (platform === 'android') {
      await device.takeScreenshot(platform + '_news-item-detail');
    } else {
      await device.takeScreenshot('iPhone-13-Pro-' + 'news-item-detail');
    }
  });
});