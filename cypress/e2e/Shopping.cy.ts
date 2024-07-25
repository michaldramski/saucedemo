import { LoginPage } from '../pages/login.page';
import { Users } from '../fixtures/users.json';
import { ProductsPage } from '../pages/products.page';
import { getRandomNumber } from '../support/helpers';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformation } from '../pages/checkout-information.page';
import { messages } from '../fixtures/messages.json';
import { faker } from '@faker-js/faker/locale/en';
import { prepareUserCredentials } from '../factories/user.factory';
import { CheckoutOverview } from '../pages/checkout-overview.page';
import { CheckoutComplete } from '../pages/checkout-complete.page';

describe('Shopping tests', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    beforeEach(() => {
        // Arrange
        loginPage = new LoginPage();
        loginPage.open();
        loginPage.login(
            Users.standard_user.login,
            Users.standard_user.password,
        );
        productsPage = new ProductsPage();
    });

    it(
        'Should add product (Sauce Labs Backpack) into basket and check if item is in basket',
        { tags: ['@smoke', '@shopping'] },
        () => {
            // Arrange
            const productNumber: number = 0; // Sauce Labs Backpack number in products.json
            cartPage = new CartPage();
            // Act
            cy.fixture('/products').then((productsData) => {
                productsPage.addProductIntoBasket(
                    productsData.products[productNumber].name,
                );
            });
            productsPage.cart_menu.openCart();
            // Assert
            cartPage.getCartItemsNames().then((names) => {
                expect(names).to.include('Sauce Labs Backpack');
            });
        },
    );

    it(
        'Should add random product into basket and check count of items in basket',
        { tags: ['@shopping'] },
        () => {
            // Arrange
            const minNumber: number = 1;
            const maxNumber: number = 6;
            const numberOfItems: number = 1;
            const productNumber: number = getRandomNumber(minNumber, maxNumber);
            // Act
            productsPage.addProductIntoBasket(productNumber);
            productsPage.cart_menu.openCart();
            // Assert
            productsPage.cart_menu.getCartBadgeItemCount().then((count) => {
                expect(count).to.equal(numberOfItems);
            });
        },
    );

    describe('Test Cases of Checkout', () => {
        let checkoutInformation: CheckoutInformation;
        beforeEach(() => {
            // Arrange
            const productName = 'Sauce Labs Bike Light';
            cartPage = new CartPage();
            // Act
            productsPage.addProductIntoBasket(productName);
            productsPage.cart_menu.openCart();
            cartPage.navigateToCheckout();
        });

        it(
            'Should verify error messages for credentials in checkout ',
            { tags: ['@shopping'] },
            () => {
                // Arrange
                const checkoutUrl =
                    'https://www.saucedemo.com/checkout-step-two.html';
                checkoutInformation = new CheckoutInformation();
                // Act
                checkoutInformation.navigateToOverview();
                // Assert
                checkoutInformation.getErrorMessage().as('firstError');
                cy.get('@firstError').should(
                    'equal',
                    messages.checkout.userInformation.firstNameRequired,
                );
                // Act
                checkoutInformation.fillFirstName(faker.person.firstName());
                checkoutInformation.navigateToOverview();
                // Assert
                checkoutInformation.getErrorMessage().as('secondError');
                cy.get('@secondError').should(
                    'equal',
                    messages.checkout.userInformation.lastNameRequired,
                );
                // Act
                checkoutInformation.fillLastName(faker.person.lastName());
                checkoutInformation.navigateToOverview();
                // Assert
                checkoutInformation.getErrorMessage().as('thirdError');
                cy.get('@thirdError').should(
                    'equal',
                    messages.checkout.userInformation.postalCodeRequired,
                );
                // Act
                checkoutInformation.fillPostalCode(faker.person.jobArea());
                checkoutInformation.navigateToOverview();
                // Assert
                cy.url().should('equal', checkoutUrl);
            },
        );

        it(
            'Should be able to complete order',
            { tags: ['@smoke', '@shopping'] },
            () => {
                // Arrange
                checkoutInformation = new CheckoutInformation();
                const checkoutOverview: CheckoutOverview =
                    new CheckoutOverview();
                const checkoutComplete: CheckoutComplete =
                    new CheckoutComplete();
                // Act
                checkoutInformation.navigateToOverview();
                const { firstName, lastName, postalCode } =
                    prepareUserCredentials();
                checkoutInformation.completeInformation(
                    firstName,
                    lastName,
                    postalCode,
                );
                checkoutInformation.navigateToOverview();
                checkoutOverview.completeOrder();
                // Assert
                checkoutComplete
                    .getOrderCompleteHeaderText()
                    .should(
                        'equal',
                        messages.checkout.orderComplete
                            .orderCompletedHeaderMessage,
                    );
                checkoutComplete
                    .getOrderCompleteText()
                    .should(
                        'equal',
                        messages.checkout.orderComplete
                            .orderCompletedTextMessage,
                    );
            },
        );
    });
});
