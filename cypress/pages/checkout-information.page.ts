import { BasePage } from './base.page';
import { CartComponent } from './cart.component';
import { MainMenuComponent } from './main-menu.component';

export class CheckoutInformation extends BasePage {
    main_menu = new MainMenuComponent();
    cart_menu = new CartComponent();
    first_name_input = `[data-test="firstName"]`;
    last_name_input = `[data-test="lastName"]`;
    postal_code_input = `[data-test="postalCode"]`;
    error_message = `[data-test="error"]`;
    cancel_button = `[data-test="cancel"]`;
    continue_button = `[data-test="continue"]`;

    open(): void {
        super.open('checkout-step-one.html');
    }

    fillFirstName(firstName: string): void {
        cy.get(this.first_name_input).type(firstName);
    }

    fillLastName(lastName: string): void {
        cy.get(this.last_name_input).type(lastName);
    }

    fillPostalCode(postalCode: string): void {
        cy.get(this.postal_code_input).type(postalCode);
    }

    completeInformation(firstName: string, lastName: string, postalCode: string): void {
        this.fillFirstName(firstName);
        this.fillLastName(lastName);
        this.fillPostalCode(postalCode);
    }

    navigateToOverview() {
        cy.get(this.continue_button).click();
    }

    getErrorMessage(): Cypress.Chainable<string> {
        return cy.get(this.error_message).invoke('text');
    }
}
