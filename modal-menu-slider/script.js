const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

//Toggle Nav Bar
toggle.addEventListener('click',() => {
    document.body.classList.toggle('show-nav')
});

//Show Modal
open.addEventListener('click', () => {
    modal.classList.add('show-modal')
});

//Hide Modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

//Hide Modal on outside click
window.addEventListener('click', e => e.target == modal? modal.classList.remove('show-modal'): false);