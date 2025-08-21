import { device, element, by, expect } from 'detox';

describe('Home Screen', () => {
  beforeAll(async () => {
    console.log("======================= launch app ========================")
    await device.launchApp({ 
      newInstance: true,
      permissions: { notifications: 'YES' } // Add if needed
    });
    console.log("======================= launch completed ========================")
    await waitFor(element(by.id('homeScreen'))).toBeVisible().withTimeout(180000);
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