import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import infoCards from '../test-data/infoCardDetails.json' with { type: 'json' };
import headerMenus from '../test-data/headerMenu.json' with { type: 'json'};
import { report } from '../utils/ReportManager.js';

test.describe('Home Page Verification', () =>{
    let startTime;

    test.beforeEach(async ({ browserName }) => {
        startTime = Date.now();
        report.setBrowser(browserName);
    });

    test.afterEach(async () => {
        const endTime = Date.now();

        report.setExecutionTime(endTime - startTime);

        await report.saveReport();
    });

    test('Verify Home Page UI design', async({ page }) =>{
       
        const homePage = new HomePage(page);
        
        //Navigate to application
        await test.step('Navigate to Home Page', async () => {
            await homePage.navigate();
        });

        await test.step('Accept cookies', async({page}) => {
            await homePage.cookieBanner.acceptCookies();
        })
        
        await test.step('Verify header components', async({page}) => {
            await homePage.header.verifyHeader();
        })

        for(const menu of headerMenus){        
            // Verify Header
            await test.step(`Verify ${menu} menu`, async() => {
                await homePage.header.verifyMenu(menu);
            })
        }

        // Verify Main Banner
        await test.step('Verify Banner on Homepage', async () => {
            await homePage.mainBanner.verifyBanner();
        });

        await page.goto(process.env.BASE_URL);

        await homePage.cookieBanner.acceptCookies();

        // Looping all cards
        for(const card of infoCards){
            
            await homePage.waitForHomePage();

            await test.step(`Verify "${card.title}" card `, async() => {
                await homePage.infoCard.verifyCard(card);
            });
        
            await test.step(`Navigate To "${ card.title }" page`, async() => {
                await homePage.infoCard.verifyCardNavigation(card);
                
            });
            await page.goto(process.env.BASE_URL, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            await homePage.cookieBanner.acceptCookies();
        }
    });
   
});