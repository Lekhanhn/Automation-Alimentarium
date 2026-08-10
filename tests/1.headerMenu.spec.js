import { test } from '../fixtures/fixtures.js';
import headerMenus from '../test-data/headerMenu.json' with { type: 'json' };

test.describe('Header Menus', () => {

    test('Verify Header Menus', async ({ homePage }) => {

        for (const menu of headerMenus) {

            await test.step(`Verify ${menu.menu}`, async () => {

                await homePage.header.verifyMenu(menu);

            });

        }

    });

});