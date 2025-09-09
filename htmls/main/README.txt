Tally-like Student Admissions (Node + MySQL)
===========================================

What this archive contains
- public/index.html    -> Modified frontend (admission form + list)
- server.js           -> Express server with REST API using mysql2
- package.json        -> Node deps
- .env.example        -> environment variables example
- db-setup.sql        -> SQL to create database/table

Quick setup (Windows / macOS / Linux)
1. Install Node.js (v18+ recommended) and MySQL server.
2. Create the database & table:
   - Run the SQL in `db-setup.sql` using your MySQL client:
     mysql -u root -p < db-setup.sql
3. Copy `.env.example` to `.env` and edit values:
   - set DB_USER, DB_PASSWORD, DB_NAME etc.
4. Install dependencies and run:
   npm install
   npm start
5. Open http://localhost:3000 in your browser.

Notes
- The server serves the frontend from /public, and the API lives under /api/students.
- Edit DB credentials in .env if your MySQL uses different user/password/host/port.
- For production use, consider using process manager (pm2), HTTPS, and proper security.

If you need a packaged installer or help deploying on a VPS, tell me your OS and I'll give step-by-step commands.
