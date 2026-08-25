/**
 * XI-1 Saintek - Main JavaScript
 * Website Kelas SMA PGRI 3 Jakarta
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  
  setTimeout(() => {
    initTheme();
    initNavigation();
    initTypingEffect();
    initTabsSystem();
    initStudentsSection();
    initHomeroomSection();
    initCurrentYear();
    initStarsBackground();
    
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
      });
    }
  }, 1500);
});

// Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 2000);
}

// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
  }
  
  function updateThemeIcons(isDark) {
    const navIcon = themeToggle.querySelector('i');
    if (isDark) {
      navIcon.classList.remove('fa-moon');
      navIcon.classList.add('fa-sun');
    } else {
      navIcon.classList.remove('fa-sun');
      navIcon.classList.add('fa-moon');
    }
  }
  
  themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateThemeIcons(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const body = document.body;
  
  const backdrop = document.createElement('div');
  backdrop.classList.add('mobile-backdrop');
  body.appendChild(backdrop);
  
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    backdrop.classList.add('active');
    body.classList.add('no-scroll');
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');
    body.classList.remove('no-scroll');
  }
  
  mobileMenuToggle.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 100)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
  
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
      backToTop.style.visibility = window.scrollY > 500 ? 'visible' : 'hidden';
    });
  }
}

// Typing Effect
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const phrases = [
    'Welcome To Website XI.1 Saintek',
    'Kelas Lantai 3'
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let pauseDuration = 1500;
  
  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = pauseDuration;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  typeText();
}

// Tabs System
function initTabsSystem() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Students Section
function initStudentsSection() {
  const studentsGrid = document.querySelector('.students-grid');
  if (!studentsGrid) return;
  
  const students = [
    { name: 'Akhtar Jaya Wardhana', gender: 'Laki-Laki', image: 'src/akhtar.jpg' },
    { name: 'Azhar Aziz Hamdani', gender: 'Laki-Laki', image: 'src/azhar.jpg' },
    { name: 'Bagus Raditya Faturrahman', gender: 'Laki-Laki', image: 'src/bagus.jpg' },
    { name: 'Damar Cahyo Panuluh', gender: 'Laki-Laki', image: 'src/damar.jpg' },
    { name: 'Dewi Thoatika Nurjanah', gender: 'Perempuan', image: 'src/dewi.jpg' },
    { name: 'Eka Puspita Novita Damayanti', gender: 'Perempuan', image: 'src/puspit.jpg' },
    { name: 'Evan Al Rasyid', gender: 'Laki-Laki', image: 'src/evan.jpg' },
    { name: 'Fadel Shafwan Maliki', gender: 'Laki-Laki', image: 'src/fadel.jpg' },
    { name: 'Faqih Arya Pasha', gender: 'Laki-Laki', image: 'src/faqih.jpg' },
    { name: 'Fazril Ilyas', gender: 'Laki-Laki', image: 'src/fazril.jpg' },
    { name: 'Firdaus Ilham', gender: 'Laki-Laki', image: 'src/ilham.jpg' },
    { name: 'Fitri Lailan Najmi', gender: 'Perempuan', image: 'src/fitri.jpg' },
    { name: 'Intan Aliyana', gender: 'Perempuan', image: 'src/intan.jpg' },
    { name: 'Jenius Hosevan Simon Panjaitan', gender: 'Laki-Laki', image: 'src/jenius.jpg' },
    { name: 'Kayla Khalidah Tajudin', gender: 'Perempuan', image: 'src/kayla.jpg' },
    { name: 'Keyla Nur Hasanah', gender: 'Perempuan', image: 'src/keyla.jpg' },
    { name: 'Khoirul Anisa Putri', gender: 'Perempuan', image: 'src/kep.jpg' },
    { name: 'Lequinsha Zalyandra Bilqis', gender: 'Perempuan', image: 'src/lequin.jpg' },
    { name: 'Lintang Azzalea Pratama', gender: 'Perempuan', image: 'src/lintang.jpg' },
    { name: 'Lutfiah Thalita Azmi', gender: 'Perempuan', image: 'src/tata.jpg' },
    { name: 'Miftah Khoiron Ramadhan', gender: 'Laki-Laki', image: 'src/miftah.jpg' },
    { name: 'Moura Dealova Kanza Adiba T.', gender: 'Perempuan', image: 'src/moura.jpg' },
    { name: 'Muhammad Rizky Maulana', gender: 'Laki-Laki', image: 'src/jajat.jpg' },
    { name: 'Nabilla Oktavia Andini', gender: 'Perempuan', image: 'src/okta.jpg' },
    { name: 'Nova Zaidah', gender: 'Perempuan', image: 'src/nova.jpg' },
    { name: 'Rayiandra Abinaya', gender: 'Laki-Laki', image: 'src/abi.jpg' },
    { name: 'Rizqi Khoiril Ibad', gender: 'Laki-Laki', image: 'src/aril.jpg' },
    { name: 'Steven Febrian Pratama', gender: 'Laki-Laki', image: 'src/steven.jpg' },
    { name: 'Zafir Raihan Basri', gender: 'Laki-Laki', image: 'src/zafir.jpg' },
    { name: 'Zalfa Zahirah', gender: 'Perempuan', image: 'src/zalfa.jpg' }
  ];
  
  students.forEach((student, index) => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.style.animationDelay = `${index * 50}ms`;
    
    const genderColor = student.gender === 'Laki-Laki' ? '#4f46e5' : '#ec4899';
    const genderIcon = student.gender === 'Laki-Laki' ? 'fas fa-mars' : 'fas fa-venus';
    
    card.innerHTML = `
      <div class="student-avatar" style="background: linear-gradient(135deg, ${genderColor}, ${genderColor}cc); overflow: hidden;">
        <img src="${student.image}" alt="${student.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <h3 class="student-name">${student.name}</h3>
      <p class="student-gender">
        <i class="${genderIcon}"></i> ${student.gender}
      </p>
      <span class="student-badge">Siswa XI-1</span>
    `;
    
    studentsGrid.appendChild(card);
  });
}

// Homeroom Section
function initHomeroomSection() {
  const homeroomGrid = document.querySelector('.homeroom-grid');
  if (!homeroomGrid) return;
  
  const homeroom = {
    name: 'Bu Afrinawati, M.Pd',
    role: 'Wali Kelas XI.1 Saintek',
    subject: 'Guru',
    icon: 'fas fa-chalkboard-teacher'
  };
  
  const card = document.createElement('div');
  card.className = 'homeroom-card';
  
  card.innerHTML = `
    <div class="homeroom-icon">
      <i class="${homeroom.icon}"></i>
    </div>
    <h3 class="homeroom-name">${homeroom.name}</h3>
    <p class="homeroom-role">${homeroom.role}</p>
    <p class="homeroom-subject">${homeroom.subject}</p>
    <span class="homeroom-badge">Pembimbing Kelas</span>
  `;
  
  homeroomGrid.appendChild(card);
}

// Current Year
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Stars Background
function initStarsBackground() {
  const starsContainer = document.getElementById('stars-background');
  if (!starsContainer) return;
  
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.7 + 0.3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: white;
      opacity: ${opacity};
      left: ${x}%;
      top: ${y}%;
      animation: twinkle ${duration}s infinite alternate;
    `;
    
    starsContainer.appendChild(star);
  }
}
