# loginPageAPI

You will need to clone this directory running `git clone https://github.com/jonathan-v93/loginPageAPI` from your terminal in your desired location.

**You will need to install these dependancies and dev dependacies**

```
npm i express
npm i psql
npm i dotenv
npm i pg
```

```
npm i -D jest
npm i -D jest-extended
npm i -D husky
npm i -D pg-format

```

**Before Starting on the porject, setup the database and run the seed file to create the tables and populate them**

```
npm run setup-dbs
npm run seed
```

**To run the tests for the project use**

```
npm t
```

**Minimum version of npm needed -> 8.1.2**

**Minimum version of postgres needed -> 1.5.0**


**setup database .env**
You will need create a .env.development and .env.test file with a link to each appropriate database. This should look like:
PGDATABASE=loginapp         <- for development 
PGDATABASE=loginapp_test    <- for test

