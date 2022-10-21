const newGroupBttn = document.querySelector('#newGroupBttn');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.delete');


newGroupBttn.addEventListener('click', () => {
    modal.classList.add('is-active');
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
});