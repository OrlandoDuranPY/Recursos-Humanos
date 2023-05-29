const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

/* ========================================
Mostrar todos los usuarios
========================================= */
user.get('/', async (req, res, next) => {
  const query = `SELECT * FROM users`;
  const rows = await db.query(query);

  return res.status(200).json({ code: 200, message: rows });
});

/* ========================================
Agregar un usuario nuevo
========================================= */
user.post('/signin', async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    let query = 'INSERT INTO users (name, email, password) ';
    query += `VALUES ('${name}', '${email}', '${password}')`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, message: 'Usuario registrado correctamente' });
    }

    return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
  }

  return res.status(400).json({ code: 400, message: 'Campos incompletos' });
});

user.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  const rows = await db.query(query);

  if(email && password){
    if(rows.length == 1){
        const token = jwt.sign({
            id: rows[0].id,
            email: rows[0].email
        }, 'debugkey');
        return res.status(200).json({ code: 200, message: token });
      }else{
        return res.status(401).json({code:401, message: 'Usuario y/o contraseña incorrectos'});
      }
  }
  return res.status(500).json({code:500, message: 'Campos incompletos'});
  
});

module.exports = user;
