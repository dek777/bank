const burgerBtn = document.querySelector('#burger-btn');
const content = document.querySelector('.content-wrap');
const headerMenu = document.querySelector('.header-menu');

burgerBtn.addEventListener('click', () => {
  toggleMenu();
})

content.addEventListener('click', (e) => {
  if (headerMenu.classList.contains('header-menu_active')){
    if (!e.target.closest('header-menu') && e.target.getAttribute('id') != 'burger-btn') {
      toggleMenu();
    }
  }
})

function toggleMenu(){
  burgerBtn.classList.toggle('active');
  headerMenu.classList.toggle('header-menu_active');
  document.querySelector('.content-wrap').classList.toggle('content-wrap_transformed');
  //document.querySelector('body').classList.toggle('lock');/* Блокировка скролла страницы, когда меню открыто */
}