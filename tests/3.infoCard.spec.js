import { test } from '../fixtures/fixtures.js';
import infoCards from '../test-data/infoCardDetails.json' with { type: 'json' };

test.describe('Info Cards', () => {

    test('Verify Info Cards', async ({ homePage }) => {

        for (const card of infoCards) {

            await test.step(`Verify ${card.title}`, async () => {

                await homePage.infoCard.verifyCard(card);

            });

        }

    });

});