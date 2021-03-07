const signinbtn = document.getElementById('signin');
const auth = firebase.auth();

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
}

signinbtn.addEventListener('click', e => {
    auth.onAuthStateChanged(function(user){
        if(user){
            var email = user.email;
            window.location.replace("dashboard.html");
        }else{
            // alert("No User Found Incorrect Email/Password");
        }
    })
        .then(()=>{
            console.log('Data has been saved successfully !')})
        .catch(error => {
            console.error(error)
        });

});





