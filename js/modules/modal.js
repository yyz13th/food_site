function openModal (modalSelector, modalTimeId){
   const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toogle('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimeId);
    if(modalTimeId){
    clearInterval(modalTimeId);
    }
}

function closeModal (modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow='';
}

function modal (triggerSelector, modalSelector, modalTimeId) {
    const modalTrigger = document.querySelectorAll(triggerSelector), 
    modal = document.querySelector(modalSelector);


    modalTrigger.forEach(btn => {

        btn.addEventListener('click', () => openModal(modalSelector, modalTimeId));

    }) 
                


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modalSelector);
        }
    });

   

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimeId);
            window.removeEventListener('scroll',showModalByScroll)
    }
}
   
    window.addEventListener('scroll',showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};