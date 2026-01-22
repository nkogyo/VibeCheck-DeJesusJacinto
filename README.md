# VibeCheck 411L (Node.js API + Button Smash UI)

This project has:
- **backend/** — Node.js + Express API (returns JSON)
- **frontend/** — HTML + JS buttons that `fetch()` data from the API

---

## Requirements (on the other computer)
- **Node.js** installed  
  Check:
  ```bash
  node -v
  npm -v

## Fork and Clone from Github to your PC:
git clone <YOUR_GITHUB_REPO_LINK>
cd VibeCheck-DeJesusJacinto

## Install dependencies
cd backend
npm install

## Start the backend server
node index.js

## Run the frontend
Go to frontend/
Open index.html in your browser (double-click)

## API Endpoints

GET /api/fortune → { fortune: "..." }

GET /api/joke → { joke: "..." }

GET /api/vibe?mood=happy|tired|stressed → { mood, emoji, message }

POST /api/smash → { smashes: number }

GET /api/smashes → { smashes: number }

GET /api/secret?code=411L → { message: "..." } (403 if wrong code)

