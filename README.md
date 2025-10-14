# Client-Database-Application


### Overview
The purpose of this project is to establish the foundation for a scalable, database-driven web application. This initial application will allow users to input, store, and search for client information. The primary focus is on creating a clean, modular, and extendable structure for future development, rather than a fully-featured product.

------

### Objectives

The core goals for this foundational project are to develop a basic, functional web application where "main users" can:

    Add new client information.

Search and view client records.
Store client data in a structured database.
Ensure the project is built in a clean, extendable way for future development.

    Setting up a database to store client information (e.g., name, contact details, notes, etc.).

-------

### Managing your local posgresSQL database

1. First you have to install porgresSQL on your computer, and make a new database. Call it something suitable, and remember the port and password used.

2. Configure the .env.example file. Remember to remove the .example in the file name so that .env works

    DATABASE_URL="postgresql://<"username (if added, if not leave blank)">:<'password'>@localhost:<'port number'>/<'database_name'>?schema=public"
    DATABASE_URL="postgresql://<username>:<password>@localhost:<port>/<database_name>?schema=public"

Example

    DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"

3. run the following in the terminal of vscode to generate the Prisma client. Run this in App directory

    npx prisma generate

4. Then add migrations to yur database, to generate the tables using the prisma.schema

    npx prisma migrate dev

5. Then finally, to add some data into the database run in the App directory the seed

    npx tsx prisma/seed.ts

-------

Creating a simple UI or form for entering and viewing client data.
Implementing a search function to find clients based on their stored information.
Providing clear documentation/notes  (see Documentation section below)

    Database Use: The system must use a database (e.g., SQLite, MySQL, PostgreSQL, etc.) for client data storage.

-------
