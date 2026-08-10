import { test } from '../fixtures/fixtures.js';
import infoCards from '../test-data/infoCardDetails.json' with { type: 'json' };

test.describe('Info Card Navigation', () => {

    test('Verify Info Card Navigation', async ({ homePage }) => {

        test.setTimeout(120000);

        for (const card of infoCards) {

            await test.step(`Navigate ${card.title}`, async () => {

                await homePage.infoCard.verifyCardNavigation(card);

                await homePage.navigate();

                await homePage.cookieBanner.acceptCookies();

                await homePage.waitForHomePage();

            });

        }

    });

});