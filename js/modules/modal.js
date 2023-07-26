function modal () {
    const modalTrigger = document.querySelectorAll('[data-modal]'), modal = document.querySelector('.modal');

        function openModal (){
            modal.classList.add('show');
            modal.classList.remove('hide');
            // modal.classList.toogle('show');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimeId);
        }
    
        function closeModal (){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow='';
        }

    modalTrigger.forEach(btn => {

        btn.addEventListener('click', openModal);

    }) 
                


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const modalTimeId = setTimeout(openModal, 5000); //open for later!!!!!!!!!!!!!!!!!!

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll',showModalByScroll)
    }
}
   
    window.addEventListener('scroll',showModalByScroll);
}

module.exports = modal;