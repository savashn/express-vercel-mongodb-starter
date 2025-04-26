## express-vercel-mongodb-starter

A starter kit to build serverless APIs on Vercel with Express, TypeScript and Mongoose.

## Installation

### 0. Clone this repository and install all dependencies

```sh
git clone https://github.com/savashn/express-vercel-mongodb-starter.git
cd express-vercel-mongodb-starter
npm install
```

### 1. Add your environment variables

Create a `.env` file in the root directory and add your `DB_URI` to connect your database. Don't forget to add `CORS_ORIGIN` too for your frontend app and `JWT_SECRET` for authentication.

### 2. Install Vercel CLI globaly

```sh
npm i -g vercel
```

### 3. Login to your Vercel account

```sh
vercel login
```

### 4. Finally, RUN:

```sh
vercel dev
```

OR

```sh
npm start
```
