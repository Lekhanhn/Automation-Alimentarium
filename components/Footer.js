
export class Footer{

    constructor(page){
        this.page = page;

        this.subscribeNow = page.locator('#edit-email');

        this.subscribeSubmit = page.locator('#edit-actions-submit');

        

    }

}