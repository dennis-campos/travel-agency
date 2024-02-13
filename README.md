# TRAVEL AGENCY SYSTEM

A travel agency system to book your dream destination.

## STACK

- Next.Js
- Drizzle
- Lucia Auth
- Draft UI / React Aria Components
- TailwindCSS

## GETTING STARTED

Using docker to spin up a DB

```bash
docker compose up -d
```

Create a `.env.local` file and add the following:

```
DATABASE_URL="postgres://user:password@localhost:3333/my-app-db"
AUTH_SECRET="mySuperAuthSecret"
```

```bash
npm install
```

Run the app

```bash
npm run dev
```
