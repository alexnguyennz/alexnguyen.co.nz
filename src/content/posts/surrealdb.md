---
title: Third party authentication with SurrealDB
date: 2023-11-23T00:00:00Z
image: ./surrealdb.png
tags:
  - nextjs
  - surrealdb
published: true
---

For this demo, we will use Next.js and two libraries for authenticating - Auth.js (NextAuth) and Lucia. I will use Google but the steps should be applicable to most, if not any other third party authentication - change to another Auth.js adapter if it exists or create your own method.

Auth.js has an [official SurrealDB adapter](https://authjs.dev/reference/adapter/surrealdb) - what this will do is after authenticating with Google is create a record in the `accounts` and `users` table for every sign-in (which is the standard process of Auth.js's [database model](https://authjs.dev/getting-started/adapters#models)). This part is optional for this tutorial, we won't be using any of these records or the helper functions to interact with our SurrealDB database.

[Lucia](https://lucia-auth.com/) is an authentication library that is more flexible than Auth.js. Auth.js also is not compatible with mobile so if you plan to add mobile app support later (or if you're using [Tamagui](https://tamagui.dev/) or [Solito](https://solito.dev/) with Next.js), it may not be the right tool. This means that using Lucia (or setting up your own authentication code), you could still use Next.js's API for both versions (web and mobile) of your app instead of using a separate service/backend.

In the future, there will likely be official integrations available to make third-party authentication easier as SurrealDB's features mature.

