# SolsticeAR - Server

> Server repo for SolsticeAR, a platform that allows you to create, manage and track Web AR experiences.

# Tech Used

- Apollo Server / GraphQL
- PostgreSQL
- Sequelize

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [Usage](#Usage)
1. [Team](#team)
1. [Contributing](#contributing)

### Requirements

First make sure you have the following installed on your machine:

- Node.js
- PostgreSQL

And then open up PostgreSQL and create a database called `solstice`

In terminal:

```
psql
create database solstice;
```

### Development

> OBS: Please make sure postgres is running.

- First, install all package dependencies. In the terminal type:

```
yarn
```

Run all migrations:

```
npx sequelize-cli db:migrate
```

And then seed the DB:

```
npx sequelize-cli db:seed:all
```

Run the server:

```
node index.js
```

Open browser at: `http://localhost:4000` to checkout the API's docs.

> For more info on how to use the API, please consult GraphQL's docs

## Usage

> 1. Send GraphQL query to localhost:4000/
> 2. Customize the query so that you only get the data you need

### Queries

- getAdmin(email: String!): Admin

```
{
  getAdmin(email: String) {
    id
    name
    email
    industry
  }
}

```

### Mutations

- register(adminData: NewAdmin): Admin

```
mutation {
  register(adminData:{
    name: String!
    email: String!
    password: String!
    industry: String
  }) {
    name
    email
    industry
  }
}
```

- login(email: String, password: String): LoginResponse

```
mutation {
  login(email:String, password: String) {
    token
    admin {
      name
      email
      industry
    }
  }
}
```
