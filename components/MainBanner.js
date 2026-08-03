import { expect } from '@playwright/test';


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

    async verifyBanner(){
        await expect(this.subtitle).toBeVisible();
        
        await expect(this.title).toBeVisible();
        await expect(this.description).toBeVisible();
        await expect(this.moreInfoButton).toBeVisible();
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

    async openBanner(index){
        await this.sliderDots.nth(index).click();
    }

    async clickMoreInfo(){
        await this.moreInfoButton.click();
    }
}