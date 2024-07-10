# Tests for saucedemo application

This cypress framework is testing website https://www.saucedemo.com/

### To run test cases

Default:

```
npx cypress open
```

Use any script from package.json e.g. to open at spec list

```
npm run cy:open:chrome
```

to run all tests without browser

```
npm run cy:run:all
```

to run all tests in chrome browser

```
npm run cy:run:all:chrome
```

to run specific spec in chrome browser e.g. login/products/shopping

```
npm run cy:run:login:chrome
npm run cy:run:products:chrome
npm run cy:run:shopping:chrome
```
