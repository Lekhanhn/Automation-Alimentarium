import { test, expect } from '@playwright/test';
import { NavigationMenu } from './NavigationMenu.js';
import { report } from '../utils/ReportManager.js';
import { AssertionHelper } from '../helpers/AssertionHelper.js';

export class Header{
    constructor(page){
        this.page=page;

        this.logo = this.logo = page.locator('img[alt^="logo"]');

        this.menusList = page.locator('.main-menu-list');
      
        this.searchIcon = page.locator('.open-header-search');
        this.ticketButton = page.getByRole('link', {name:'TICKETS', exact: true});
        this.profileIcon = page.locator('.user-header-link');
        this.languageSelector = page.locator('.language-wrap .active');

        this.navigatetoSubMenu = new NavigationMenu(page);

    }

    async verifyMenu(menu){
        const menuName = this.menusList.filter({ 
            has: this.page.getByRole('link', {name: menu.menu, exact:true })
        });
       
        await AssertionHelper.verifyVisible(menuName, 'Header',`${menu.menu} Menu`,false)
        
    }

    async verifyHeader() {

        await AssertionHelper.verifyVisible(this.logo, 'Header', 'Logo', false);

        await AssertionHelper.verifyVisible(this.searchIcon,'Header','Search Icon',false);

        await AssertionHelper.verifyVisible(this.ticketButton,'Header','Tickets Button',false);

        await AssertionHelper.verifyVisible(this.profileIcon,'Header','Profile Icon',false);

        await AssertionHelper.verifyVisible(this.languageSelector,'Header','Language Selector',false);
    }

    async clicklogo(){
        await this.logo.click();
    }

    async openSearch(){
        await this.searchIcon.click();
    }

    async clickTickets(){
        await this.ticketButton.click();
    }

    async openProfile(){
        await this.profileIcon.click();
    }

    async changeLanguage(){
        await this.languageSelector.click();
    }    

}