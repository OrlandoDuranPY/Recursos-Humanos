window.onload = init;

function init() {
    document.getElementById('link_login').addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    document.getElementById('signin_submit').addEventListener('click', signin)
}

function signin(e){
    e.preventDefault();
    let name = document.getElementById('input_name').value;
    let email = document.getElementById('input_email').value;
    let password = document.getElementById('input_password').value;
    // console.log(`Name: ${name}, Email: ${email}, Password:${password}`);

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            name: name,
            email: email,
            password: password
        }
    }).then(function(res) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Registrado correctamente'
          })
        // window.location.href = 'login.html';
    }).catch(function (err){
        console.log(err);
    });
}