---
title: Third-party authentication with SurrealDB
date: 2023-11-23T00:00:00Z
image: ./third-party-authentication-with-surrealdb.png
tags:
  - nextjs
  - surrealdb
published: true
---

This tutorial will cover creating a Next.js site with Google authentication using [Auth.js](https://authjs.dev/) or NextAuth, where users will be able to create and edit posts using a [SurrealDB](https://surrealdb.com/) database. I will also cover using [Lucia](https://lucia-auth.com/), another authentication library.

The authentication flow looks like:
- authenticate with Google
- sign in or sign up as a SurrealDB user

From my understanding, the Google profile's `sub` value is stable and unique across all Google accounts, so it should be safe to use as the user `id`. If there's a better way of doing things, let me know.

For the provider, I will use Google but the steps should be applicable to most, if not any other third party provider.


## Prerequisites

1. Next.js + Auth.js project
   - to use a starter project, follow the [instructions here](https://github.com/nextauthjs/next-auth-example)

2. SurrealDB database
   - check out [this tutorial](https://surrealdb.com/install) for how to install and run SurrealDB locally

We can use [Surrealist](https://surrealist.app) to connect to our database, run queries and view tables from a browser.

![Surrealist](../../assets/posts/third-party-authentication-with-surrealdb/surrealist.png)

## Project Setup

Install the SurrealDB [JavaScript SDK](https://surrealdb.com/docs/integration/sdks/javascript) using your preferred package manager:

```shell
npm install surrealdb.js
```

Create a `surrealdb.ts` file in a `lib` folder or similar and add:

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

We will import this `Surreal` instance whenever we need to connect to our database.

### Optional - SurrealDB adapter
Auth.js has an [adapter](https://authjs.dev/reference/adapter/surrealdb) - using this will create a new record in the `account` and `user` tables for every sign-in (as a part of their [database model](https://authjs.dev/getting-started/adapters#models)). Using this is optional as we won't be using this data or the helper functions.

## Lucia 

Lucia is framework-agnostic which means it's mobile-compatible by default unlike Auth.js ([some discussion here](https://github.com/nextauthjs/next-auth/issues/1110)). With Auth.js, you would need extra authentication code for a mobile app or if you're using a site with an unsupported framework. 

With Lucia, you can still use the Next.js API for both versions of your app (web and mobile) to authenticate with, without using a separate backend.

## Summary

The final code is available here, and you can check out the demo.

In the future, there will likely be official integrations available to make third-party authentication easier with SurrealDB with common providers.

Let me know if you have any suggestions or improvements to the process, or anything missing/incorrect.