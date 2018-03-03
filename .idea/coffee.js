'use strict'

function Coffee() {
    this.checkSetup(); //вызов ф-ции о проверки наличия FireBase

    this.registration = document.getElementById('registation');
    this.authorization = document.getElementById('authorization');
    this.authorized = document.getElementById('authorized');
    this.authButton = document.getElementById('auth');
    this.registrButton = document.getElementById('register');
    this.auth_login = document.getElementById('auth_login');
    this.auth_password = document.getElementById('auth_password');
    this.register_login = document.getElementById('register_login');
    this.register_password = document.getElementById('register_password');
    this.confirm_password = document.getElementById('register_confirmation');
    this.exit = document.getElementById('exit');
    this.sidebar = document.getElementById('sidebar');
    this.burger = document.getElementById('burger');


    this.authButton.addEventListener('click', this.authorize.bind(this));
    this.registrButton.addEventListener('click', this.registr.bind(this));
    this.exit.addEventListener('click', this.goaway.bind(this));
    this.initFirebase();

}


Coffee.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Coffee.prototype.onAuthStateChanged = function(user) {
    if (user) { // User is signed in!
        // Get profile pic and user's name from the Firebase user object.
        var userName = user.email;


        // Set the user's profile pic and name.
        this.authorized.innerHTML = "Приветствуем Вас!<br>" + userName.slice(0, userName.indexOf('@'));

        // Show user's profile and sign-out button.
        this.sidebar.removeAttribute('hidden');
        this.burger.removeAttribute('hidden');
        this.authorized.removeAttribute('hidden');
        this.exit.removeAttribute('hidden');

        // Hide sign-in button.
        this.registration.setAttribute('hidden', 'true');
        this.authorization.setAttribute('hidden', 'true');

    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        this.registration.setAttribute('hidden', 'true');
        this.authorized.setAttribute('hidden', 'true');
        this.exit.setAttribute('hidden', 'true');
        this.sidebar.setAttribute('hidden', 'true');
        this.burger.setAttribute('hidden', 'true');

        this.authorization.removeAttribute('hidden');

    }
};

Coffee.prototype.registr = function() {
    // Sign up Firebase

    if (this.register_password.value != this.confirm_password.value) {
        window.alert('Пароли не совпадают!');
        return;
    }

    this.auth.createUserWithEmailAndPassword(this.register_login.value, this.register_password.value).catch(function(error) {
        // Handle Errors here.
        window.alert(error.code + ":" + error.message);
    });
};

Coffee.prototype.authorize = function() {
    // Sign in Firebase
    this.auth.signInWithEmailAndPassword(this.auth_login.value, this.auth_password.value).catch(function(error) {
        // Handle Errors here.
        window.alert(error.code + ":" + error.message);

    });
};

Coffee.prototype.goaway = function () {
    this.auth.signOut();

    this.register_login.value = "";
    this.register_password.value = "";
    this.auth_login.value = "";
    this.auth_password.value = "";
    this.confirm_password.value = "";
}


Coffee.prototype.checkSetup = function() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
};

window.onload = function() {
    window.coffee = new Coffee();
};