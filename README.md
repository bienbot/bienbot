# Bienbot

### Discord bot with admin dashboard

---

## Screenshots

![Dashboard Screenshot](https://s3.eu-west-3.amazonaws.com/www.data.lkarasinski.pl/bienbot/bienbot_dashboard.png)

![User Panel Screenshot](https://s3.eu-west-3.amazonaws.com/www.data.lkarasinski.pl/bienbot/user_panel.png)

---

## Tech Stack

**Frontend**

-   React
-   Typescript
-   Next.JS
-   Styled Components
-   Framer Motion

**Backend**

-   Express
-   Express session
-   Passport

**Bot**

-   Discord.JS
-   discord-player
-   ffmpeg
-   sodium

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TOKEN`

`YT_COOKIES`

To run bot you will need to create `adminConfig.ts` file in
`apps/bot` directory and provide firestore admin config object

---

## Setting up development environment

1. Install:

    - [node.js](https://nodejs.org/en/) V16 (V17 won't work in some cases)
    - [git](https://git-scm.com/downloads)

2. Clone this repository `git clone https://github.com/lkarasinski/bienbot`

3. Install nx globally `npm install -g nx`

4. Install dependencies `npm install`

---

## Run Locally

Run bienbot app

```bash
  nx serve [app_name]
```

Run bienbot library

```bash
  nx run [library_name]:[action]
```

---

## Roadmap

-   [x] Discord SSO Authentication
-   [x] Discord bot
-   [x] Discord music player
-   [x] UI Library
-   [x] Dashboard
-   [x] User Panel
-   [ ] Messages Panel
-   [ ] Events Panel
-   [ ] Channels Panel
-   [ ] Leaderboads Panel
-   [ ] Members Panel
-   [ ] Fuzzy search box

---

## Authors

-   [@lkarasinski](https://www.github.com/lkarasinski)
-   [@mattponiat](https://www.github.com/mattponiat)
