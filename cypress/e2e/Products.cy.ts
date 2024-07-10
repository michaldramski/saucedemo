import { LoginPage } from '../pages/login.page';
import { Users } from '../fixtures/users.json';
import { ProductsPage } from '../pages/products.page';
import { SortOptions } from '../support/sort-options';

describe('Products tests', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

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

    it('Should sort products names alphabetical Z to A', () => {
        // Act
        productsPage.sortProducts(SortOptions.ZA);
        // Assert
        productsPage.getInventoryItemsNames().then((names) => {
            const sortedNames = names.sort().reverse();
            expect(names).to.deep.equal(sortedNames);
        });
    });

    it('Should sort products prices from high to low', () => {
        // Act
        productsPage.sortProducts(SortOptions.HighToLow);
        // Assert
        productsPage.getInventoryItemsPrices().then((prices) => {
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sortedPrices);
        });
    });
});
