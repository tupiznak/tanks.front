(function () {
    'use strict';

    if (typeof window === 'object') {

        //import
        let user = {login:""};
        let addressHost = "https://tanksback.herokuapp.com/";

        let Button = window.Button;
        let Form = window.Form;

        let loginPage = document.querySelector('.js-login');
        let profilePage = document.querySelector('.js-profile');

        let formLogin = new Form({
            el: document.createElement('div'),
            data: {
                title: 'Hi! Please login',
                fields: [
                    {
                        name: 'login',
                        type: 'text',
                        attrs: 'autofocus placeholder="Login" required '
                    },
                    {
                        name: 'email',
                        type: 'email',
                        attrs: 'placeholder="E-mail" required '
                    },
                    {
                        name: 'password',
                        type: 'password',
                        attrs: 'placeholder="Password" required '
                    }
                ],
                controls: [
                    {
                        text: 'LogIn',
                        attrs: {
                            type: 'submit'
                        }
                    }
                ]
            }
        });

        let formProfile = new Form({
            el: document.createElement('div'),
            data: {
                title: '',
                fields: [],
                controls: [
                    {
                        text: 'LogOut',
                        attrs: {
                            type: 'submit'
                        }
                    }
                ]
            }
        });


        loginPage.appendChild(formLogin.el);
        profilePage.appendChild(formProfile.el);

        loginPage.hidden = false;

        formLogin.on('submit', event => {
            event.preventDefault();

            let formData = formLogin.getFormData();

            let xhr = new XMLHttpRequest();

            xhr.open('POST', addressHost+'api/user/add', false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(formData));

            if (xhr.status === 200) {
                loginPage.hidden = true;
                profilePage.hidden = false;

                let responseData = JSON.parse(xhr.response);
                let responseDataFields = [];

                Object.keys(responseData).forEach(element => {
                    if (!element) {
                        return;
                    }
                    responseDataFields.push({
                        text: element + ' : ' + responseData[element]
                    });
                });
                user.login = responseData['login'];
                formProfile.reFill({
                    data: {
                        title: 'Hi! ' + user.login,
                        fields: responseDataFields
                    }
                });
            }
        });

        formProfile.on('submit', event=> {
            event.preventDefault();

            profilePage.hidden = true;
            loginPage.hidden = false;

            let xhr = new XMLHttpRequest();

            xhr.open('POST', addressHost+'api/user/del', false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(user));

            alert(`by, ${user.login}, you are deleted`)

        });
    }

    function hello(text) {
        return 'Привет, ' + text;
    }

    if (typeof exports === 'object') { // for NodeJS
        exports.hello = hello;
    }

})();

