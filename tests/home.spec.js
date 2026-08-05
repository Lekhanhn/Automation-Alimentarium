import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import infoCards from '../test-data/infoCardDetails.json' with { type: 'json' };
import headerMenus from '../test-data/headerMenu.json' with { type: 'json'};
import { report } from '../utils/ReportManager.js';
import banners from '../test-data/banners.json' with { type: 'json'};

test.describe('Home Page Verification', () =>{
    let startTime;
    let homePage;

    test.beforeAll(() => {
        startTime = Date.now();
    })

    test.beforeEach(async ({ page, browserName }) => {
        
        report.setBrowser(browserName);
        homePage =  new HomePage(page);
        await homePage.navigate();
        await homePage.cookieBanner.acceptCookies();
        await homePage.waitForHomePage();
    });

    test.afterAll( async () => {
        const totalTime = Date.now() - startTime;
        report.setExecutionTime(totalTime);
        await report.saveReport();  
    })

    test('Verify Header Components', async({page}) => {
        await homePage.header.verifyHeader();
    });

    test('Verify Header Menus', async() => {
        for(const menu of headerMenus){        
            // Verify Header
            await test.step(`Verify ${menu} menu`, async() => {
                await homePage.header.verifyMenu(menu);
            })
        }
    });

    test('Verify Sliding Banners On Homepage', async() => {
        test.setTimeout(120000);

        for (let i = 0; i < banners.length; i++) {
             if (i > 0) {
                await homePage.navigate();
                await homePage.cookieBanner.acceptCookies();
                await homePage.waitForHomePage();
            }

            await test.step(`Verify "${banners[i].title}" banner`, async () => {

                               
                await homePage.mainBanner.goToBanner(i, banners[i]);

                await homePage.mainBanner.verifyBanner(banners[i]);

                await homePage.mainBanner.verifyBannerNavigation(banners[i]); 
                 

            });

        }          
    });

    test('Verify Info Cards', async() => {
       for(const card of infoCards){
            await test.step(`Verify "${card.title}" card `, async() => {
            await homePage.infoCard.verifyCard(card);
            });
        } 
    });

    test('Verify Info Card Navigation', async() => {
        test.setTimeout(120000);
        for(const card of infoCards){
            await test.step(`Navigate To "${ card.title }" page`, async() => {
            await homePage.infoCard.verifyCardNavigation(card);
            // Return to home for next card
            await homePage.navigate();
            await homePage.cookieBanner.acceptCookies();
            await homePage.waitForHomePage();
            });
        }
    });
   
});