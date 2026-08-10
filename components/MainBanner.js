import { expect } from '@playwright/test';
import { report } from '../utils/ReportManager.js';
import { AssertionHelper } from '../helpers/AssertionHelper.js';


export class MainBanner{

    constructor(page){
        this.page = page;

        this.activeBanner = page.locator('.slick-slide.slick-current.slick-active');
        this.subtitle = this.activeBanner.locator('.subtitle');
        this.title = this.activeBanner.locator('h2');
        this.description = this.activeBanner.locator(' .txt');
        this.moreInfoButton =  this.activeBanner.locator('.btn.btn--orange');

        this.sliderDots = page.locator('.slick-dots li');
        this.activeSlider = page.locator('.slick-dots li.slick-active');
        this.slNo=1;
        this.link=1;
        
    }

    async verifyBanner(banner){
        let number = this.slNo++;

        await AssertionHelper.verifyText(this.title, banner.title, `Verify Banner ${number}`, `Title: ${banner.title}`, false);


        await AssertionHelper.verifyText(this.subtitle, banner.subtitle, `Verify Banner ${number}`, `Subtitle: ${banner.subtitle}`, false);

        await AssertionHelper.verifyVisible(this.description, `Verify Banner ${number}`, 'Verify Banner Description', false);
        
        await AssertionHelper.verifyVisible(this.moreInfoButton, `Verify Banner ${number}`,`${banner.button} button`, false);

    }

    async verifyBannerTitle(expectedTitle) {
        await expect(this.title).toHaveText(expectedTitle);

    }

    async verifySliderDots(expectedCount) {
        await expect(this.sliderDots).toHaveCount(expectedCount);
        await expect(this.activeSlider).toHaveCount(1);
    }

    async goToBanner(index, banner){
        const dot = this.sliderDots.nth(index);

        await expect(dot).toBeVisible();

        await dot.click();

        // Wait until this specific dot becomes active
        await expect(dot).toHaveClass(/slick-active/, {
            timeout: 20000
        });

        // Wait until the banner title is visible
        await expect(this.title).toBeVisible({
            timeout: 20000
        });
        
    }

    async verifyBannerNavigation(banner){
        let number = this.link++;
        await Promise.all([
            this.page.waitForURL(url => url.toString().includes(banner.expectedUrl), {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            }),
            this.moreInfoButton.click()
        ]);
      
        report.addResult(
            `Verify Banner ${number}`,
            `Click on ${banner.button} button`,
            'Pass',
            `Successfully navigated to ${banner.title} page`
        );

    }
}