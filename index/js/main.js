function toggleMenu(){
    let header__menu = document.querySelector('.header__menu--res');
    let toggle = document.querySelector('.toggle');
    header__menu.classList.toggle('active');
    toggle.classList.toggle('active');
}