# Fathima Hashim Resume — React + Express + MongoDB

This project converts the supplied HTML/CSS resume into a React frontend. The original resume layout, Arial font, light-gray page background, white resume sheet, headings and spacing are retained. Resume content is stored in a local MongoDB database and loaded through an Express API using Axios.

## Project structure

- `server/` — Express API, Mongoose model, local MongoDB connection and seed script
- `client/` — React + Vite frontend, Axios GET request and original-style CSS

## 1. Requirements

Install:
- Node.js (LTS)
- MongoDB Community Server (local installation)
- Visual Studio Code (optional)

During MongoDB installation, install it as a Windows Service if that option is available. Start the MongoDB Server service before running this project. MongoDB Compass is optional; it is only a graphical tool to view the local database.

## 2. Open the project in VS Code

Extract the ZIP. In VS Code choose **File → Open Folder** and select `fathima-resume-fullstack`.

Open Terminal → New Terminal. Make sure the terminal is in the project root folder (the folder containing this README and the `server` and `client` folders).

## 3. Install packages

Run these commands in the project root terminal:

```bash
npm install
npm run install-all
```

## 4. Configure the backend

In the terminal:

```bash
cd server
copy .env.example .env
```

The `.env` file uses the local database connection:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fathima_resume
```

This is a local MongoDB connection. No Atlas account is needed. If `copy` says the file already exists, keep the existing `.env` and check that its `MONGODB_URI` line matches the value above.

## 5. Insert the resume into MongoDB (one time)

Still inside the `server` folder, run:

```bash
npm run seed
```

Expected message: `Resume data inserted/updated successfully.`

The database is `fathima_resume`; the collection created by Mongoose is `resumes`. The seed script inserts the details taken from the supplied HTML file. You can edit `server/seed.js` to change the resume content, then run `npm run seed` again to update the stored resume.

Return to the root folder:

```bash
cd ..
```

## 6. Start both frontend and backend

From the project root:

```bash
npm run dev
```

Open the React website:

`http://localhost:5173`

The backend API is:

`http://localhost:5000/api/resume`

You can open the API URL in Chrome to see the JSON resume data. The website itself is served by Vite on port 5173.

## 7. How the requirements are implemented

1. **HTML/CSS to React:** `client/src/App.jsx` contains the resume UI; `client/src/cv.css` retains the original design.
2. **Node + Express:** `server/server.js` creates the backend.
3. **Local MongoDB:** the connection is `mongodb://127.0.0.1:27017/fathima_resume`.
4. **Mongoose schema:** `server/models/Resume.js` defines the resume fields and arrays.
5. **GET API:** `GET /api/resume` returns the saved resume document as JSON.
6. **Axios:** `axios.get('http://localhost:5000/api/resume')` fetches the data.
7. **React dynamic rendering:** `useState` stores the response, `useEffect` loads it, and `.map()` displays education, skills, projects, certifications, interests and languages.

## Troubleshooting

- **MongoDB connection refused / ECONNREFUSED:** Start the MongoDB Server Windows service. The API cannot connect until the local database server is running.
- **Resume not found:** Run `npm run seed` from inside the `server` folder.
- **Cannot find module:** Run `npm install` in the root, then `npm run install-all`.
- **Port already in use:** Close the other process using port 5000 or 5173, or change the relevant port.
- **Only JSON appears in the browser:** That is expected at `http://localhost:5000/api/resume`; open `http://localhost:5173` for the React resume page.
- Keep both terminal processes running while using the app.
