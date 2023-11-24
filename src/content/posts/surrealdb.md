---
title: Third-party authentication with SurrealDB
date: 2023-11-23T00:00:00Z
image: ./surrealdb.png
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

For this demo, we will use Next.js and two libraries for authenticating - Auth.js (NextAuth) and Lucia. For the authentication provider, I will use Google but the steps should be applicable to most, if not any other third party provider - change to another Auth.js adapter if it exists or use another method of authenticating with your site/app.

Auth.js has an [official SurrealDB adapter](https://authjs.dev/reference/adapter/surrealdb) - what this will do is after authenticating with Google is create a record in the `account` and `user` table for every sign-in (following Auth.js's [database model](https://authjs.dev/getting-started/adapters#models) process). This part is optional as we won't be using any of these records or the SurrealDB helper functions.

## Lucia 

[Lucia](https://lucia-auth.com/) is an authentication library - for . Auth.js also is not compatible with mobile so if you plan to add mobile app support later, it may not be the right tool. This means that using Lucia (or setting up your own authentication code), you could still use Next.js's API for both versions (web and mobile) of your app instead of using a separate service or backend for authentication.

In the future, there will likely be official integrations available to make third-party authentication easier with SurrealDB.

Let me know if you have any suggestions or improvements to the process, or anything missing/incorrect.