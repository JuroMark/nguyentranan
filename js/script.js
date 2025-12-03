let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-x');
  navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

/*================Typed.js============ */
const typed = new Typed('.multiple-text', {
  strings: ['NodeJS Developer', 'Fullstack Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

/*================ScrollReveal============ */
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Validate Vietnamese phone number
function validateVietnamesePhone(phone) {
  // Remove all spaces and special characters
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');

  // Vietnamese phone patterns:
  // Mobile: 03|05|07|08|09 + 8 digits
  // With country code: +84 or 84
  const vnPhonePattern = /^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;

  return vnPhonePattern.test(cleanPhone);
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Check if EMAIL_CONFIG is defined
    if (typeof EMAIL_CONFIG === 'undefined') {
      formMessage.style.color = '#ff6b6b';
      formMessage.textContent = 'Lỗi cấu hình. Vui lòng kiểm tra file config.js';
      console.error('EMAIL_CONFIG is not defined. Make sure config.js is loaded.');
      return;
    }

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate phone number
    if (!validateVietnamesePhone(phone)) {
      formMessage.style.color = '#ff6b6b';
      formMessage.textContent = 'Vui lòng nhập số điện thoại Việt Nam hợp lệ (VD: 0912345678, +84912345678)';
      return;
    }

    // Show loading message
    formMessage.style.color = '#59b2f4';
    formMessage.textContent = 'Đang gửi...';

    // Initialize EmailJS with public key from config
    emailjs.init(EMAIL_CONFIG.publicKey);

    // Send email using EmailJS
    const templateParams = {
      from_name: fullName,
      from_email: email,
      phone: phone,
      subject: subject,
      message: message,
      to_email: 'annguyentran35@gmail.com',
    };

    emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams).then(
      function (response) {
        formMessage.style.color = '#4ade80';
        formMessage.textContent = 'Gửi tin nhắn thành công! Cảm ơn bạn đã liên hệ.';
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
        }, 5000);
      },
      function (error) {
        formMessage.style.color = '#ff6b6b';
        formMessage.textContent = 'Có lỗi xảy ra. Vui lòng thử lại sau.';
        console.error('EmailJS Error:', error);
      }
    );
  });
}
