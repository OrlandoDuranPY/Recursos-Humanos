window.onload = init;

function init() {
    document.getElementById('link_signin').addEventListener('click', () => {
        window.location.href = 'signin.html';
    });

    document.getElementById('login_submit').addEventListener('click', login)
}

function login(e){
    e.preventDefault();
    let email = document.getElementById('input_email').value;
    let password = document.getElementById('input_password').value;
    // console.log(`Email: ${email}, Password:${password}`);

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            email: email,
            password: password
        }
    }).then(function(res) {
        console.log(res.data);
        if(res.data.code === 200){
            localStorage.setItem('token', res.data.message);
            window.location.href = 'dashboard.html';
        }
    }).catch(function (err){
        console.log(err);
    });
}