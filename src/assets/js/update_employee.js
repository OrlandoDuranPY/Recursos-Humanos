
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

function submitForm(event){
  event.preventDefault();
  // Obtener el valor del ID desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // Llamar a la función updateEmployee con el ID obtenido
  updateEmployee(id);
}

function updateEmployee(id) {
  console.log('Actualizar empleados');
    let name = document.getElementById('update_name').value;
    let last_name = document.getElementById('update_last_name').value;
    let phone = document.getElementById('update_phone').value;
    let email = document.getElementById('update_email').value;
    let address = document.getElementById('update_address').value;
    console.log(`${name}, ${last_name}, ${phone}, ${email}, ${address}`);

    axios
      .put(
        url + 'employee/' + id,
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
          title: 'Empleado actualizado correctamente',
        });
  
        document.getElementById('update_name').value = '';
        document.getElementById('update_last_name').value = '';
        document.getElementById('update_phone').value = '';
        document.getElementById('update_email').value = '';
        document.getElementById('update_address').value = '';
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  