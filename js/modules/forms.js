import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimeId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thank you! We will contact you',
        failure: 'something went wrong...'
    };

    forms.forEach(item => {
        bindPostData(item);
    })


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;

            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');



            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)   
            // .then(data => data.text())
            .then(data => {
                 console.log(data);
                showThanksModal(message.success);
                // form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimeId);

        const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal('.modal');
            }, 4000);
    }

        fetch('http://localhost:3000/menu')
            .then(data => data.json())
            .then(res => console.log(res));


}
export default forms;