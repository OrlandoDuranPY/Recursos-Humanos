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
  }
}

/* ========================================
Agregar un empleado
========================================= */
function createEmployee(event) {
  event.preventDefault();

  let name = document.getElementById('create_name').value;
  let last_name = document.getElementById('create_last_name').value;
  let phone = document.getElementById('create_phone').value;
  let email = document.getElementById('create_email').value;
  let address = document.getElementById('create_address').value;

  axios
    .post(
      url + 'employee/',
      {
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
        address: address,
      },
      headers
    )
    .then(function (res) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Empleado agregado correctamente',
      });

      document.getElementById('create_name').value = '';
      document.getElementById('create_last_name').value = '';
      document.getElementById('create_phone').value = '';
      document.getElementById('create_email').value = '';
      document.getElementById('create_address').value = '';
    })
    .catch(function (err) {
      console.log(err);
    });
}
