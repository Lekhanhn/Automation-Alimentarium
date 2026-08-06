import { test } from '../fixtures/fixtures.js';
import banners from '../test-data/banners.json' with { type: 'json' };

test.describe('Homepage Banners', () => {

    test('Verify Sliding Banners', async ({ homePage }) => {

        test.setTimeout(120000);

        for (let i = 0; i < banners.length; i++) {

            if (i > 0) {

                await homePage.navigate();
                await homePage.cookieBanner.acceptCookies();
                await homePage.waitForHomePage();

            }

            await test.step(`Verify ${banners[i].title}`, async () => {

                await homePage.mainBanner.goToBanner(i);

                await homePage.mainBanner.verifyBanner(banners[i]);

                await homePage.mainBanner.verifyBannerNavigation(banners[i]);

            });

        }

    });

});