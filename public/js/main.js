/*================================= toggle icon navbar ===================================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
};                                                                                                                                                             

/*================================= scroll section active link ===================================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    /*================================= sticky navbar ===================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================================= remove toggle icon and navbar ===================================*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/*================================= scroll reveal ===================================*/
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*================================= typed js ===================================*/

const typed = new Typed('.multiple-text', {
    // strings: ['A Full Stack Developer', 'And a Mern Stack Developer'],
    strings: ['specializing in the MERN stack as a full-stack developer.'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
}); 