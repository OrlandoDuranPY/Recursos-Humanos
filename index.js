/* ========================================
REQUIRES/DEPENDENCIAS
========================================= */
const morgan = require('morgan');
const express = require('express');
const app = express();
/* ========================================
REQUIRES/ROUTING
========================================= */
const empleado = require('./routes/employee');
const user = require('./routes/user');
/* ========================================
REQUIRES/MIDDLEWARES
========================================= */
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');
/* ========================================
MIDDLEWARES
========================================= */
app.use(cors);
app.use(morgan('dev')); // 'dev' Para que sirva solo en desarrollo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================================
RUTAS
========================================= */
app.get('/', index);
app.use('/user', user);
app.use(auth);
app.use('/employee', empleado);
app.use(notFound);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
