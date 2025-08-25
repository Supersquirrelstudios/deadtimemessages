# DeadTime – Digital Legacy Platform

DeadTime is a full-stack application designed to help users record video, audio
and text messages that will be automatically delivered to their loved ones
after a user’s death or prolonged inactivity. This repository contains the
source code for the mobile app (React Native), backend API (Express/MongoDB)
and marketing website.

## Repository Structure

```
deadtime/
├── app/               # React Native (Expo) mobile application
│   ├── package.json
│   ├── App.js
│   └── src/
│       ├── screens/   # Individual screen components
│       └── components/# Reusable components (empty for now)
│
├── backend/           # Node/Express API server
│   ├── package.json
│   ├── .env.example
│   ├── models/        # Mongoose models
│   └── src/
│       ├── index.js   # Express server entry point
│       └── routes/    # Route definitions for users and messages
│
├── website/           # Static marketing site
│   └── public/
│       ├── index.html
│       └── assets/
│           ├── style.css
│           └── logo.png
│
├── docs/              # Legal documents
│   ├── privacy.html
│   └── terms.html
└── README.md
```

## Mobile Application

The mobile app is built with [Expo](https://expo.dev/), which allows for
cross‑platform development on iOS, Android and the web. To run the app
locally:

1. Install [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) (e.g. `npm install -g expo-cli`).
2. Navigate to the `deadtime/app` directory and install dependencies:

   ```bash
   cd deadtime/app
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Use the Expo Go app on your mobile device or an emulator to preview the app.

> **Note:** This is a prototype. Integrations for video/audio recording,
> authentication, S3 uploads and background jobs need to be implemented.

## Backend API

The backend uses Express and MongoDB via Mongoose to store user and message
metadata. To run the API locally:

1. Install Node.js.
2. Copy `.env.example` to `.env` and fill in your MongoDB connection string,
   AWS credentials (for S3), SMTP configuration and other secrets.
3. Install dependencies and start the server:

   ```bash
   cd deadtime/backend
   npm install
   npm start
   ```

The server will start on `http://localhost:5000` by default.

## Website

The marketing website is a static site located in `deadtime/website/public`. It
uses plain HTML and CSS (with Google Fonts) and can be deployed to any static
hosting provider (e.g. Netlify, Vercel). To view locally, simply open
`website/public/index.html` in a browser.

## Legal Documents

The `docs` directory contains the Privacy Policy and Terms of Service. These
documents have been drafted to comply with modern data protection standards,
including GDPR and CCPA. They emphasise data minimisation, explicit consent
requirements【32231640842400†L104-L114】, privacy by design【937969418581650†L111-L119】, encryption and backup best
practices【35789964984834†L262-L269】, and users' rights to access, delete and
withdraw consent for their data【937969418581650†L123-L139】. Make sure to review and
customize them for your jurisdiction and business needs.

## Contributing

If you wish to contribute or propose enhancements, please open an issue or
submit a pull request. We welcome improvements to the design, functionality
and documentation.

## License

This project is for demonstration purposes and does not include a formal
license. Please contact the author for licensing inquiries.