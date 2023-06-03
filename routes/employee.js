const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

/* ========================================
  Insertar un empleado
  ========================================= */
empleado.post('/', async (req, res, next) => {
  const { name, last_name, phone, email, address } = req.body;

  // Verificar que vengan todos los datos
  if (name && last_name && phone && email && address) {
    let query = 'INSERT INTO employees(name, last_name, phone, email, address)';
    query += ` VALUES ('${name}', '${last_name}', '${phone}', '${email}', '${address}')`;
    const rows = await db.query(query);
    console.log(rows);

    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, message: 'Empleado insertado correctamente' });
    }
    return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
  }
  return res.status(500).json({ code: 500, message: 'Campos incompletos' });
});

/* ========================================
Borrar un empleado mediante su id
========================================= */
empleado.delete('/:id([0-9]{1,3})', async (req, res, next) => {
  const query = `DELETE FROM employees WHERE id=${req.params.id}`;
  const rows = await db.query(query);
  if (rows.affectedRows === 1) {
    return res
      .status(200)
      .json({ code: 200, message: 'Empleado borrado correctamente' });
  }

  return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

/* ========================================
Modificar un empleado completamente
========================================= */
empleado.put('/:id([0-9]{1,3})', async (req, res, next) => {
  const { name, last_name, phone, email, address } = req.body;

  if (name && last_name && phone && email && address) {
    let query = `UPDATE employees SET name='${name}', last_name='${last_name}', `;
    query += `phone='${phone}', email='${email}', address='${address}' WHERE id=${req.params.id};`;

    try {
      const rows = await db.query(query);
      console.log(rows);

      if (rows.affectedRows === 1) {
        return res.status(200).json({ code: 200, message: 'Empleado actualizado correctamente' });
      } else {
        return res.status(500).json({ code: 500, message: 'No se encontró el empleado o no se realizaron cambios' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
    }
  } else {
    return res.status(400).json({ code: 400, message: 'Faltan campos requeridos' });
  }
});


/* ========================================
Modificar un empleado parcialmente
========================================= */
empleado.patch('/:id([0-9]{1,3})', async (req, res, next) => {
  if (req.body.name) {
    let query = `UPDATE employees SET name='${req.body.name}' WHERE id=${req.params.id}`;

    const rows = await db.query(query);
    console.log(rows);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: 'Empleado actualizado correctamente' });
    }

    return res.status(500).json({ code: 500, message: 'Ocurrió un error' });
  }

  return res.status(500).json({ code: 500, message: 'Campos incompletos' });
});

/* ========================================
Mostrar todos los empleados
========================================= */
empleado.get('/', async (req, res, next) => {
  // Retorna todo el objeto pokemon
  const employee = await db.query('SELECT * FROM employees');
  return res.status(200).json({ code: 200, message: employee });
});

/* ========================================
Mostrar empleado por numero
========================================= */
empleado.get('/:id([0-9]{1,3})', async (req, res, next) => {
  // ID = el parametro recibido - 1 (tomando en cuenta la posicion del objeto)
  const id = req.params.id - 1;
  /** Si el id se encuentra entre la posicion 0 (que es el id 1 del pokemon)
   * y 150 (que es el id 151 del pokemon), entonces retorna el pokemon que
   * solicitamos, caso contrario retorna el error 404
   */
  if (id >= 1 && id <= 722) {
    const employee = await db.query(
      'SELECT * FROM employees WHERE id=' + id + ';'
    );
    return res.status(200).json({ code: 200, message: employee });
  }

  return res.status(400).send({ code: 404, message: 'Empleado no encontrado' });
});

/* ========================================
    Mostrar empleado por nombre
  ========================================= */
empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {
  const name = req.params.name;

  /** Definimos un arreglo "pkmn" que va a almacenar todos los
   * pokemon que tengan el nombre que solicitamos por la URL,
   * el if retorna el/los pokemon que cumplan la condicion
   */
  //   const pkmn = pkmDB.filter((p) => {
  //     return p.name.toUpperCase() === name.toUpperCase() && p;
  //   });
  const employee = await db.query(
    'SELECT * FROM employees WHERE name=' + name + ';'
  );

  /** Comprobamos que el arreglo employee tenga al menos un elemento
   * en el arreglo, si es asi, entonces retornamos el contenido
   * de lo contrario retornamos un status 404
   */
  employee.length > 0
    ? res.status(200).json({ code: 200, message: employee })
    : res.status(400).send({ code: 404, message: 'Empleado no encontrado' });
});

module.exports = empleado;
