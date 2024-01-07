window.onload = function() {
   let loginForm = document.querySelector('.login-form');
   let loginButton = document.querySelector('#login-btn');
   let closeButton = document.querySelector('#close-login-form');

   if (loginForm && loginButton && closeButton) {
      loginButton.onclick = () => {
         loginForm.classList.add('active');
      }

      closeButton.onclick = () => {
         loginForm.classList.remove('active');
      }
   } else {
      console.log("Login form, login button, or close button not found on the page.");
   }

   let menu = document.querySelector('#menu-btn');
   let navbar = document.querySelector('.header .nav');

   if (menu && navbar) {
      menu.onclick = () => {
         menu.classList.toggle('fa-times');
         navbar.classList.toggle('active');
      }
   } else {
      console.log("Menu button or navbar not found on the page.");
   }

   window.onscroll = () => {
      if (loginForm) {
         loginForm.classList.remove('active');
      }
      if (menu) {
         menu.classList.remove('fa-times');
      }
      if (navbar) {
         navbar.classList.remove('active');
      }

      if (window.scrollY > 0) {
         let header = document.querySelector('.header');
         if (header) {
            header.classList.add('active');
         }
      } else {
         let header = document.querySelector('.header');
         if (header) {
            header.classList.remove('active');
         }
      }
   }
}

function clearRadio() {
   let radio = document.getElementById("option1");
   if (radio) {
      radio.checked = false;
   } else {
      console.log("Radio button with id 'option1' not found on the page.");
   }
}
