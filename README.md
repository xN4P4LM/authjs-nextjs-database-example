> This is a modified version of the Auth.js next-auth example project located at <https://github.com/nextauthjs/next-auth-example> and would not be possible without it existing. Please support the original authors by contributing to their project.

# Auth.js using Next.js, MikroORM, and MariaDB

This is an example of [Auth.js](https://authjs.dev/) using [Next.js](https://nextjs.org/), [MikroORM](https://mikro-orm.io/), and [MariaDB](https://mariadb.org/) using the yarn package manager

## Why?

After experiencing challenges with setting up an ORM with Auth.js, I decided to create this example project to help others get started.

Hopefully this will help others get started with Auth.js and MikroORM. If you have any questions or suggestions, please feel free to open an issue or pull request.

## Getting Started

1. Clone the repository

2. Install dependencies

   ```bash
   yarn install
   ```

   1. **Note**: You may need to patch the `@auth/mikro-orm-adapter` package. It has a bug that prevents the proper export of the required entities. I have a PR to resolve this issue https://github.com/nextauthjs/next-auth/pull/12445 - Once it is merged you can ignore this step. Here is a oneliner to patch the package for now:

      ```bash
      jq '.exports["."].default="./index.js"' node_modules/@auth/mikro-orm-adapter/package.json > tmp && \
      mv tmp node_modules/@auth/mikro-orm-adapter/package.json
      ```

3. Create a `.env` file from the `.env.local.example` file and fill in the values with the appropriate values for your environment.

4. Confirm MikroORM is configured correctly by running the following command:

   ```bash
   yarn db debug
   ```

5. Start the database

   ```bash
   docker-compose up -d mariadb
   ```

6. Run the MikroORM migrations to create the database schema

   ```bash
   # Create the migration
   yarn db:migration:create
   # Apply the migration
   yarn db:migration:apply
   ```

7. Start the development server

   ```bash
   yarn dev
   ```

## License

This project keeps the original licesnse from the parent project

ISC
