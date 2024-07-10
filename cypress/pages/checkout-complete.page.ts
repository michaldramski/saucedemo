import { BasePage } from './base.page';
import { CartComponent } from './cart.component';
import { MainMenuComponent } from './main-menu.component';

export class CheckoutComplete extends BasePage {
    main_menu = new MainMenuComponent();
    cart_menu = new CartComponent();
    complete_header = `[data-test="complete-header"]`;
    complete_text = `[data-test="complete-text"]`;

    open(): void {
        super.open('checkout-complete.html');
    }

    getOrderCompleteHeaderText(): Cypress.Chainable<string> {
        return cy.get(this.complete_header).invoke('text');
    }

    getOrderCompleteText(): Cypress.Chainable<string> {
        return cy.get(this.complete_text).invoke('text');
    }
}
