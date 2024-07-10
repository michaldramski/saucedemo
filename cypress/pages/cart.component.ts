export class CartComponent {
    cart_button = `[data-test="shopping-cart-link"]`;
    cart_badge = `[data-test="shopping-cart-badge"]`;

    openCart(): void {
        cy.get(this.cart_button).click();
    }

    getCartBadgeItemCount(): Cypress.Chainable<number> {
        return cy.get(this.cart_badge).invoke('text').then((text) => {
            return parseInt(text, 10);
        })
    }
}
