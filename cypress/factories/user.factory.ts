import {
    BasicUserCredentialsModel,
    LoginUserModel,
} from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUser(): LoginUserModel {
    const user: LoginUserModel = {
        login: faker.internet.userName(),
        password: faker.internet.password({ length: 10 }),
    };

    return user;
}

export function prepareUserCredentials(): BasicUserCredentialsModel {
    const user: BasicUserCredentialsModel = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode(),
    };
    return user;
}
