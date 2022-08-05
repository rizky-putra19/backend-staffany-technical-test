## Stacks
- Framework: Hapi JS
- ORM: TypeORM
- DB: PostgreSQL

## How to Install
0. Clone this repo
1. `cd <cloned_dir>`
2. `npm i`
3. `cp env.example .env`
4. fill your .env settings with these
```
PORT="3000"

DB_HOST="localhost"
DB_PORT="5432"
DB_USERNAME="<your postgres username>"
DB_PASSWORD="<your postgres password>"
DB_NAME="<your db name>"
```
5. Create a PostgreSQL database with name that you specifies in .env (which is, **DB_NAME**)

## How to run
1. `npm run dev`
2. `npm run test`

## Project Structures

* Database Entities are located inside `./src/database/default/entity/`. Entities contains the database schema.
* Database Repositories are located inside `./src/database/default/repository/`. Repositories contains CRUD Operations.
* Business Logics are located inside `./src/usecases/`
* API Endpoint routing are located inside `./src/routes/`
