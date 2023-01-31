const btn = document.getElementById('btn');
const inpEmail = document.getElementById('inp1');
const inpPass = document.getElementById('inp2');
const err = document.createElement('p');
const loader = document.getElementById('preload');
const btnText = document.getElementById('btnText');

function sendRequest(){
    loader.style.display = 'block';
    let email = inpEmail.value;
    let pass = inpPass.value;
    

    if (email == '' && pass == ''){
        err.classList.add('error');
        inpEmail.classList.add('js-input-error');
        inpPass.classList.add('js-input-error');
        err.innerHTML = "Заполните все поля!";
        btn.before(err);
        loader.style.display = 'none';
    } else { 
        btnText.style.display = 'none';
        loader.style.display = 'block';
        err.remove();
        inpEmail.classList.remove('js-input-error');
        inpPass.classList.remove('js-input-error');
        console.log('click');
        let url = `https://test-works.pr-uni.ru/api/login/index.php?login=${email}&password=${pass}`;
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText); 
            }
            return response.json();

        })
        .then(json => {

            if(json.status == 'error') {
                err.classList.add('error');
                inpEmail.classList.add('js-input-error');
                inpPass.classList.add('js-input-error');
                err.innerHTML = json.errorMessage;
                btn.before(err);
                loader.style.display = 'none';
                btnText.style.display = 'block';

            }else {
                btnText.style.display = 'none';
                loader.style.display = 'block';
                inpEmail.classList.add('js-form__input-succsess');
                inpPass.classList.add('js-form__input-succsess');
                inpEmail.disabled = true;
                inpPass.disabled = true;
                btn.disabled = true;

                document.cookie = `token=${json.token}`;
                
                const form = document.querySelector('.form');

                const message = document.createElement('div');
                const messageText = document.createElement('div');
                const container = document.querySelector('.wrapper');
            
                messageText.innerHTML = `${json.user.name} , Вы успешно авторизованы!`;
                form.remove();
                container.append(message);
                message.append(messageText);
                message.classList.add('message');
            }

            

        })
        
    }
}

btn.onclick = sendRequest;