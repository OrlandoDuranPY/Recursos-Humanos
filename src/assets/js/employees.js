window.onload = init;
let headers = {};
let url = 'http://localhost:3000/';

function init() {
  if (localStorage.getItem('token')) {
    headers = {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token'),
      },
    };
    loadEmployees();
  } else {
    window.location.href = 'index.html';
  }
}

/* ========================================
Cargar todos los empleados desde la DB
========================================= */
function loadEmployees() {
  axios
    .get(url + 'employee/', headers)
    .then(function (res) {
      console.log(res);
      displayEmployees(res.data.message);
    })
    .catch(function (err) {
      console.log(err);
    });
}


/* ========================================
Redirigir al formulario de update
========================================= */
function redirectToUpdateForm(id) {
  // Redirigir a la página del formulario de actualización, pasando el ID del empleado como parámetro
  window.location.href = './employees/update.html?id=' + id;
}


/* ========================================
Borrar un empleado por id
========================================= */
function deleteEmployee(id) {
    if(localStorage.getItem('token')){
        headers = {
            headers: {
                Authorization: 'bearer ' + localStorage.getItem('token'),
            }
        }
    }
    axios
      .delete(url+`employee/${id}`, headers)
      .then(function(res) {
        if (res.status === 200) {
          // Empleado eliminado correctamente
        //   console.log(res.data.message);
        //   console.log('Borrar usuario '+id);
          window.location.href = 'dashboard.html';
        } else {
          // No se encontró el empleado
          console.log(res.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  

/* ========================================
Mostrar todos los empleados
========================================= */
function displayEmployees(employees) {
    const table_body = document.getElementById('table_body');
    for (let i = 0; i < employees.length; i++) {
      table_body.innerHTML += `
        <tr class="bg-white border-b">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            ${employees[i].name}
          </th>
          <td class="px-6 py-4">${employees[i].last_name}</td>
          <td class="px-6 py-4">${employees[i].phone}</td>
          <td class="px-6 py-4">${employees[i].email}</td>
          <td class="px-6 py-4">${employees[i].address}</td>
          <td class="px-6 py-4">
            <button type="button"
            onclick="redirectToUpdateForm(${employees[i].id})"
              class="text-white bg-yellow-300 hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
  
            <button onclick="deleteEmployee(${employees[i].id})" type="button" class="text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </td>
        </tr>`;
    }
  }
  

