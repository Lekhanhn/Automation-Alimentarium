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
        
    }

    async verifyBanner(banner){

        await AssertionHelper.verifyText(this.subtitle, banner.subtitle, 'Banner', banner.subtitle);

        await AssertionHelper.verifyText(this.title, banner.title, 'Banner', banner.title);

        await AssertionHelper.verifyVisible(this.description, 'Banner', 'Description');
        
        await AssertionHelper.verifyText(this.moreInfoButton, banner.button, 'Banner', banner.button);
        
        
        // await expect(this.subtitle).toHaveText(banner.subtitle);

        // await expect(this.title).toHaveText(banner.title);

        // await expect(this.description).toBeVisible();

        // await expect(this.moreInfoButton).toHaveText(banner.button);

        // report.addResult(
        //     'Banner',
        //     banner.title,
        //     'Pass',
        //     'Banner verified'
        // );
            // await expect(this.subtitle).toBeVisible();
            
            // await expect(this.title).toBeVisible();
            // report.addResult(
            //             'Banner',
            //             this.title,
            //             'Pass',
            //             `Banner is visible`
            //         );
            // await expect(this.description).toBeVisible();
            // await expect(this.moreInfoButton).toBeVisible();
    }

    // async verifySubtitle(title){
    //     const subtitle =  this.subtitle.filter({
    //         has: this.page.locator('h2',{ hasText: title})
    //     })

    //     await expect(subtitle).toBeVisible()
    // }

    // async verifyTitle(title){
    //     const bannertitle  =  this.title.filter({
    //         has: this.page.locator('h2',{ hasText: title})
    //     })

    //     await expect(bannertitle).toBeVisible()
    // }

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
        // const dot = this.sliderDots.nth(index);
        // await dot.click();
        // await expect(dot).toHaveClass(/slick-active/);
        
        // await expect(this.title).toHaveText(banner.title, {
        //     timeout: 10000
        // });
    }

    async verifyBannerNavigation(banner){
        await Promise.all([
            this.page.waitForURL(url => url.toString().includes(banner.expectedUrl), {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            }),
            this.moreInfoButton.click()
        ]);
      
        report.addResult(
            'Banner Navigation',
            banner.title,
            'Pass',
            'Successfully navigated'
        );

    }
}