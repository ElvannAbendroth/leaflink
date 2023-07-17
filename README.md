# Linkleaf

Linkleaf is [Linktree](https://linktr.ee/) clone that allows users to manage and create their own public links page to share with the world.  This web application was built with NextJS 13, NextAuth, TailwindCSS & MongoDB.  The live demo app can be found here: http://www.leaflink.vercel.app


## WARNING: Important Security Note

In this current state, the app is available to use as a **DEMO ONLY**, as security and testing still need to be run to make sure the application does not have any security issues.

### Storage of User's Data & Passwords

All of the user data for this web app are stored in a MongoDB Database, and passwords are being safely encrypted.

Nonetheless, dues to the nature of NextJS and server components, there is still testing to do to make sure none of the sensitive data gets passed down to the client.

**When using this app, please make sure to not enter any sensitive information**, and only do so for testing and demo purposes.

### Database Wipeout

The database will be wiped out periodically as this app is still in its testing stages.  Make sure to consistently backup any information you would like to keep.

## Upcoming Features & Project Tasks
- [ ] Toaster Notifications
- [ ] Frontend Data Validation
- [ ] Backend Data Validation
- [ ] Authentication with Google Account
- [ ] Page Themes Options
- [ ] Frontend Testing
- [ ] Backend Testing
- [ ] Refactoring of Data Fetching


## Commit History

In order to keep track of commit history, I use some emoji symbols.

- ⭐ General Info & News
- 🌈 Frontend & Styling
- ⚙️ Feature
- 🔨 Fix
- 📂 Refactor

Although I do not always create separate commits for each of them.  I'm hoping to be more consistent with their usage as development progresses.