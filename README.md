# Linkleaf

A [Linktree](https://linktr.ee/) clone built using Next, NextAuth, Tailwind & MongoDB.

> **Warning**
> This app is a work in progress that I'm building in public. It is currently in alpha. Make sure to read the security notes down below before using.

LIVE DEMO: http://www.leaflink.vercel.app

## About this Project

This project is an learning experiment on how to build a simple, modern fullstack web application using NextJS 13 and server components, and is currently in Beta stage.

The goal of this app is to create a simple content management system that allows users to create an account & login, aanage a public page featuring links, and share their public page with the world.

## Features

- **NextJS 13**'& the new `/app` dir,
- Server & Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- Database on **MongoDB**
- UI Components built using **Radix UI** & **[shadcn/ui](https://ui.shadcn.com/)**
- Styled using **Tailwind CSS**
- Written in **TypeScript**

## Roadmap

- [ ] Error handling & user notifications
- [ ] Validation using **Zod**
- [ ] Adding Loading UI
- [ ] Add OG image using @vercel/og
- [ ] Toaster Notifications
- [ ] Google Authentication with **NextAuth.js**
- [ ] Page Themes Options
- [ ] Proper Testing
- [ ] Refactoring of Data Fetching

## Known Issues

- [ ] Issues with re-fetching data when navigating between pages. The current workaround is to force a refresh during navigation.
- [ ] Data validation needs to be implemented.
- [ ] A yet unknown timeout error sometimes crashes the app. Needing better error handling in the backend & frontend. In the meantime, clearing the cache seems to help.

## Security & User Information Notice

In this current state, the app is available to use as a **DEMO ONLY**, as security and testing still need to be run to make sure the application does not have any security issues.

All of the user data for this web app are stored in a MongoDB Database, and passwords are being safely encrypted using **bcrypt**.

Nonetheless, due to the learning nature of this project and the nature of **NextJS 13**'s server components, there is still testing to do to make sure none of the sensitive data gets passed down to the client accidentally.

**When using this app, please make sure to not enter any sensitive information**, and only do so for testing and demo purposes.

Also, keep in mind **database will be wiped out periodically & without warning**, as this app is still in its testing stages. Make sure to backup any information you would like to keep.

## Commit History

In order to keep track of commit history, I use some emoji symbols.

- 👋 Initial Setup
- ⭐ General Info & News
- 🌈 Frontend & Styling
- ⚙️ Feature
- 🔨 Fix
- 📂 Refactor

Although I do not always create separate commits for each of them. I'm hoping to be more consistent with their usage as development progresses.
