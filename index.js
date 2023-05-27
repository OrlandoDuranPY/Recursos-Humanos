/* ========================================
REQUIRES/DEPENDENCIAS
========================================= */
const express = require('express');
const app = express();
/* ========================================
REQUIRES/ROUTING
========================================= */

/* ========================================
REQUIRES/MIDDLEWARES
========================================= */


/* ========================================
MIDDLEWARES
========================================= */

/* ========================================
RUTAS
========================================= */
app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Bienvenido a Recursos Humanos');
});
// app.get('/', index);
// app.use('/user', user);
// app.use(auth);
// app.use(notFound);


app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});