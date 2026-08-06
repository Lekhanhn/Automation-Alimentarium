import { test } from '../fixtures/fixtures.js';

test.describe('Header Components', () => {

    test('Verify Header Components', async ({ homePage }) => {

        await homePage.header.verifyHeader();

    });

});