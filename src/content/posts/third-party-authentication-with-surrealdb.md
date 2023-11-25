---
title: Third-party authentication with SurrealDB
date: 2023-11-23T00:00:00Z
image: ./third-party-authentication-with-surrealdb.png
tags:
  - nextjs
  - surrealdb
  - google
published: true
---

This tutorial will cover setting up third-party authentication with [SurrealDB](https://surrealdb.com/) in a Next.js app using [Auth.js](https://authjs.dev/) or NextAuth. The goal will be to be able to sign in, and create and edit posts with user permissions. I will also cover using [Lucia](https://lucia-auth.com/), another authentication library.

We'll use Google for authentication - for another provider, you will need to adapt the code accordingly.

The authentication flow looks like:
- authenticate with Google
- sign in or sign up as a SurrealDB user

From my understanding, the Google profile's `sub` value is stable and unique across all Google accounts, so it should be safe to use as the user `id`. If there's a better way of doing things, let me know.

## Prerequisites

1. Next.js and Auth.js app - [starter project here](https://github.com/nextauthjs/next-auth-example)
2. SurrealDB database
   - [follow this tutorial](https://surrealdb.com/install) on setting up SurrealDB locally
3. Get Google OAuth credentials - [instructions here](https://developers.google.com/identity/protocols/oauth2)
   1. create an OAuth Client (of type `Web`)
   2. copy the Client ID and Client Secret, and add an Authorized Redirect URI of `http://localhost:3000/api/auth/callback/google`

We can use [Surrealist](https://surrealist.app) to connect to our database, run queries and view tables from a browser.

![Surrealist](../../assets/posts/third-party-authentication-with-surrealdb/surrealist.png)

## Project Setup

Install the SurrealDB [JavaScript SDK](https://surrealdb.com/docs/integration/sdks/javascript) using your preferred package manager:

```shell
npm install surrealdb.js
```

Create a `surrealdb.ts` file in a `lib` (or similar) folder and add:

```typescript
import { Surreal } from "surrealdb.js";

const connectionString = process.env.SURREAL_ENDPOINT!;
const namespace = process.env.SURREAL_NAMESPACE!;
const database = process.env.SURREAL_DATABASE!;
const username = process.env.SURREAL_USERNAME!;
const password = process.env.SURREAL_PASSWORD!;

const db = new Surreal();

db.connect(`${connectionString}/rpc`, {
   namespace,
   database,
   auth: { username, password },
});

export { db };
```

We will import this SurrealDB client whenever we need to use our database.

### Optional - SurrealDB adapter
Auth.js has an [adapter](https://authjs.dev/reference/adapter/surrealdb) - using this will create a new record in the `account` and `user` tables for every sign-in (as a part of their [database model](https://authjs.dev/getting-started/adapters#models)). Using this is optional as we won't be using this data or the helper functions.

## Lucia 

Lucia is framework-agnostic which means it's mobile-compatible by default unlike Auth.js ([discussion here](https://github.com/nextauthjs/next-auth/issues/1110)). With Auth.js, you would need different authentication code for a mobile app or if you're using a site with an unsupported framework. 

With Lucia, you can still use the Next.js API for both versions of your app (web and mobile) to authenticate with, without using a separate backend.

## Summary

The final code is available here, and you can check out the demo.

In the future, there will likely be official integrations available to make third-party authentication easier with SurrealDB with common providers.

Let me know if you have any suggestions or questions, or if there's anything missing or incorrect.