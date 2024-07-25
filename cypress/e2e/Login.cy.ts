import { LoginPage } from '../pages/login.page';
import { Users } from '../fixtures/users.json';
import { prepareRandomUser } from '../factories/user.factory';
import { messages } from '../fixtures/messages.json';

describe('Login tests', () => {
    let loginPage: LoginPage;

    beforeEach(() => {
        // Arrange
        loginPage = new LoginPage();
        loginPage.open();
    });

    it(
        'Should login with standard user',
        { tags: ['@smoke', '@login'] },
        () => {
            // Act
            loginPage.login(
                Users.standard_user.login,
                Users.standard_user.password,
            );
            // Assert
            cy.url().should('include', '/inventory.html');
        },
    );

    it(
        'Should not be able to login with locked out user',
        { tags: ['@login'] },
        () => {
            // Act
            loginPage.login(
                Users.locked_out_user.login,
                Users.locked_out_user.password,
            );
            // Assert
            cy.get(loginPage.error_message).should(
                'have.text',
                messages.login.lockedOutError,
            );
        },
    );

    it(
        'Should not be able to login with unregistered user',
        { tags: ['@smoke', '@login'] },
        () => {
            // Arrange
            const randomUser = prepareRandomUser();
            // Act
            loginPage.login(randomUser.login, randomUser.password);
            // Assert
            cy.get(loginPage.error_message).should(
                'have.text',
                messages.login.unknownUserError,
            );
        },
    );

    it(
        'Should be able to login with problem user',
        { tags: ['@login'] },
        () => {
            // Act
            loginPage.login(
                Users.problem_user.login,
                Users.problem_user.password,
            );
            // Assert
            cy.url().should('include', '/inventory.html');
        },
    );

    it(
        'Should be able to login with performance glitch user - one with performance issues - slow login',
        { tags: ['@login'] },
        () => {
            // Act
            loginPage.login(
                Users.performance_glitch_user.login,
                Users.performance_glitch_user.password,
            );
            // Assert
            cy.url().should('include', '/inventory.html');
        },
    );
});
