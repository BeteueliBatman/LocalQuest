# LocalQuest

LocalQuest is a React application for finding and completing small local challenges across Georgia.

## Live site

[Open LocalQuest](https://local-quest-neon.vercel.app/)

## Main features

- quest list with search, region, category and difficulty filters
- dynamic quest detail pages
- login and logout with a saved token
- protected dashboard and create-quest page
- joined and completed quest progress with Zustand (the Redux alternative approved for this project)
- validated forms with React Hook Form
- real GET and POST requests
- current weather for the selected quest city
- responsive mobile-first design
- React Testing Library tests

## Demo login

- username: `emilys`
- password: `emilyspass`

## Run the project

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run lint
npm test
npm run build
```

## APIs

- [DummyJSON](https://dummyjson.com/) for quests, login and POST requests
- [Open-Meteo](https://open-meteo.com/) for current weather

DummyJSON simulates new records instead of saving them permanently on its server. After a successful POST, LocalQuest keeps the new quest in Zustand and localStorage.

The photos are free images downloaded from [Unsplash](https://unsplash.com/).
