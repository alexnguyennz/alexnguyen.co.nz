---
title: Third-party authentication with SurrealDB
date: 2023-11-23T00:00:00Z
image: ./third-party-authentication-with-surrealdb.png
tags:
  - nextjs
  - surrealdb
published: true
---

This post will walk through creating a Next.js site which will have Google authentication

The flow looks like:
- authenticate with Google
- sign in or sign up as a SurrealDB user

[SurrealDB](https://surrealdb.com/) is a new database offering which also features a simple but flexible authorization feature - for example, restricting editing or deletion of posts to the user that created it. Currently, there's no official integrations for providers like Google or GitHub.

For this demo, we will use Next.js and cover two popular authentication libraries - [Auth.js](https://authjs.dev/) or NextAuth and [Lucia](https://lucia-auth.com/). 

For the provider, I will use Google but the steps should be applicable to most, if not any other third party provider.

## Setup

Follow the [instructions here](https://next-auth.js.org/getting-started/example#new-project) to set up a basic Next.js + Auth.js project. 

```typescript
git clone https://github.com/nextauthjs/next-auth-example
npm install // or yarn install / pnpm install
```

## Auth.js

```typescript
interface Props {
  title?: string;
}

const { title } = Astro.props;
```


### Optional - SurrealDB adapter
Auth.js has an [adapter](https://authjs.dev/reference/adapter/surrealdb) - using this will create a new record in the `account` and `user` tables for every sign-in (Auth.js's [database model](https://authjs.dev/getting-started/adapters#models)). Using this is optional as we won't be using this data or the helper functions.

## Lucia 

Lucia is more flexible than Auth.js and is also framework (and JavaScript runtime) agnostic. For example, Auth.js is not mobile-compatible. With Lucia, you can still use the Next.js API for both versions of your app (web and mobile) to authenticate with, without using a separate backend.

## Summary

In the future, there will likely be official integrations available to make third-party authentication easier with SurrealDB with common providers.

Let me know if you have any suggestions or improvements to the process, or anything missing/incorrect.