/**
 * Simple Express + MySQL2 server for Student Admissions
 *
 * Endpoints:
 *  GET /api/students          -> list all
 *  GET /api/students/:id      -> get single
 *  POST /api/students         -> create
 *  PUT /api/students/:id      -> update
 *  DELETE /api/students/:id   -> delete
 *
 * Uses environment variables from .env:
 *  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
 *
 * To run:
 *  npm install
 *  node server.js
 */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2/promise');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

async function getPool(){
  if(!global.__db){
    global.__db = await mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tallylite',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return global.__db;
}

// API routes
app.get('/api/students', async (req,res)=>{
  try{
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id DESC');
    res.json(rows);
  }catch(err){ console.error(err); res.status(500).send('DB error'); }
});

app.get('/api/students/:id', async (req,res)=>{
  try{
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM students WHERE id=?', [req.params.id]);
    if(rows.length===0) return res.status(404).send('Not found');
    res.json(rows[0]);
  }catch(err){ console.error(err); res.status(500).send('DB error'); }
});

app.post('/api/students', async (req,res)=>{
  try{
    const body = req.body;
    const pool = await getPool();
    const [result] = await pool.query(
      `INSERT INTO students (name, course, duration, admission_date, total_fees, paid_fees, remaining_fees, contact, remarks, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [body.name, body.course, body.duration, body.admission_date, body.total_fees||0, body.paid_fees||0, body.remaining_fees||0, body.contact, body.remarks || '']
    );
    const [rows] = await pool.query('SELECT * FROM students WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  }catch(err){ console.error(err); res.status(500).send('DB error'); }
});

app.put('/api/students/:id', async (req,res)=>{
  try{
    const body = req.body;
    const pool = await getPool();
    await pool.query(
      `UPDATE students SET name=?, course=?, duration=?, admission_date=?, total_fees=?, paid_fees=?, remaining_fees=?, contact=?, remarks=? WHERE id=?`,
      [body.name, body.course, body.duration, body.admission_date, body.total_fees||0, body.paid_fees||0, body.remaining_fees||0, body.contact, body.remarks||'', req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM students WHERE id=?', [req.params.id]);
    res.json(rows[0]);
  }catch(err){ console.error(err); res.status(500).send('DB error'); }
});

app.delete('/api/students/:id', async (req,res)=>{
  try{
    const pool = await getPool();
    await pool.query('DELETE FROM students WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  }catch(err){ console.error(err); res.status(500).send('DB error'); }
});

// Fallback to index.html for SPA
app.get('*', (req,res)=> res.sendFile(path.join(__dirname, 'public','index.html')));

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
