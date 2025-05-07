# chat_node

## Morgan

[Morgan](https://www.npmjs.com/package/morgan) is an HTTP logger middleware for **Node.js** and **Express**.

- Logs incoming requests to the server.
- Useful for debugging, monitoring, and measuring performance.
- Commonly used in development and testing.

📦 _Official NPM package_: `morgan`

## Turso

[Turso](https://turso.tech) is a **fast, lightweight, and distributed** SQL database built on SQLite.

- Designed to run close to the user (edge computing).
- Ideal for modern apps with low latency.
- SQLite-compatible and easy to use from both frontend and backend.

📦 _Official NPM client_: `@turso/client`

install Turso CLI in windows wsl:
curl -sSfL https://get.tur.so/install.sh | bash

## cmd: turso db create

Created group default at aws-us-east-1 in 719ms.
Created database saving-constrictor at group default in 1.211s.

Start an interactive SQL shell with:

turso db shell saving-constrictor

To see information about the database, including a connection URL, run:

turso db show saving-constrictor

To get an authentication token for the database, run:

turso db tokens create saving-constrictor

## 📦 Dependency for Working with Turso

To connect your application with **Turso**, you need to install the official LibSQL client and the `dotenv` library to manage environment variables.

### Installation

```bash
npm install @libsql/client dotenv
```

# ramdom users

https://random-data-api.com/api/users/random_user
