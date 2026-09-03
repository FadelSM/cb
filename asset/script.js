/**
 * XI-1 Saintek - Main JavaScript
 * Website Kelas SMA PGRI 3 Jakarta
 */

let typingTimeout = null;

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
    initLanguageSwitcher();
    
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

// Typing Effect (Supports Multi-Language)
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const currentLang = localStorage.getItem('language') || 'id';
  
  const phrases = currentLang === 'en' ? [
    'Welcome To Website XI.1 Saintek',
    '3rd Floor Class',
    'Web Developer FadelSM'
  ] : [
    'Selamat Datang di Website XI.1 Saintek',
    'Kelas Lantai 3',
    'Pengembang Web FadelSM'
  ];
  
  if (typingTimeout) clearTimeout(typingTimeout);
  
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
    
    typingTimeout = setTimeout(typeText, typingSpeed);
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

// Students Section (Dynamic Language)
function initStudentsSection() {
  const studentsGrid = document.querySelector('.students-grid');
  if (!studentsGrid) return;
  studentsGrid.innerHTML = '';
  
  const currentLang = localStorage.getItem('language') || 'id';

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
    
    const isMale = student.gender === 'Laki-Laki';
    const genderColor = isMale ? '#4f46e5' : '#ec4899';
    const genderIcon = isMale ? 'fas fa-mars' : 'fas fa-venus';
    const genderText = currentLang === 'en' ? (isMale ? 'Male' : 'Female') : student.gender;
    const badgeText = currentLang === 'en' ? 'Student of XI-1' : 'Siswa XI-1';
    
    card.innerHTML = `
      <div class="student-avatar" style="background: linear-gradient(135deg, ${genderColor}, ${genderColor}cc); overflow: hidden;">
        <img src="${student.image}" alt="${student.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <h3 class="student-name">${student.name}</h3>
      <p class="student-gender">
        <i class="${genderIcon}"></i> ${genderText}
      </p>
      <span class="student-badge">${badgeText}</span>
    `;
    
    studentsGrid.appendChild(card);
  });
}

// Homeroom Section (Dynamic Language)
function initHomeroomSection() {
  const homeroomGrid = document.querySelector('.homeroom-grid');
  if (!homeroomGrid) return;
  
  const currentLang = localStorage.getItem('language') || 'id';
  const roleText = currentLang === 'en' ? 'Homeroom Teacher of XI.1 Saintek' : 'Wali Kelas XI.1 Saintek';
  const subjectText = currentLang === 'en' ? 'Teacher' : 'Guru';
  const badgeText = currentLang === 'en' ? 'Class Advisor' : 'Pembimbing Kelas';

  homeroomGrid.innerHTML = `
    <div class="homeroom-card">
      <div class="homeroom-icon">
        <i class="fas fa-chalkboard-teacher"></i>
      </div>
      <h3 class="homeroom-name">Bu Afrinawati, M.Pd</h3>
      <p class="homeroom-role">${roleText}</p>
      <p class="homeroom-subject">${subjectText}</p>
      <span class="homeroom-badge">${badgeText}</span>
    </div>
  `;
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

// Language Switcher Engine
function initLanguageSwitcher() {
  const translations = {
    id: {
      "preloader.loading": "Tunggu...",
      "nav.about": "Tentang",
      "nav.students": "Siswa",
      "nav.lesson": "Pelajaran",
      "nav.homeroom": "Wali Kelas",
      "nav.gallery": "Galeri",
      "nav.contact": "Kontak",

      "hero.desc": "Selamat datang di website resmi kelas <span class=\"text-highlight\">XI.1 Saintek</span> SMA PGRI 3 Jakarta. Kelas yang penuh <span class=\"text-highlight\">prestasi</span> dan <span class=\"text-highlight\">kebersamaan</span>.",
      "hero.btnAbout": "Tentang Kelas",
      "hero.btnStudents": "Lihat Siswa",
      "hero.scroll": "Scroll ke bawah",

      "about.sectionTitlePrefix": "Tentang",
      "about.sectionSubtitle": "Mengenal lebih dekat kelas kebanggaan SMA PGRI 3 Jakarta",
      "about.tabStory": "Profil Kelas",
      "about.tabMission": "Visi & Misi",
      "about.tabApproach": "Karakter",

      "about.profileTitle": "Profil Kelas XI.1 Saintek",
      "about.profileP1": "<strong>XI.1 Saintek</strong> adalah kelas unggulan di SMA PGRI 3 Jakarta yang berfokus pada bidang Sains dan Teknologi. Kelas ini terdiri dari <strong>18 siswa laki-laki</strong> dan <strong>15 siswa perempuan</strong> yang memiliki semangat belajar tinggi.",
      "about.profileP2": "Kami adalah generasi muda yang siap menghadapi tantangan masa depan dengan bekal ilmu pengetahuan, keterampilan, dan karakter yang kuat. Di kelas ini, kami belajar bukan hanya untuk nilai, tetapi untuk menjadi pribadi yang bermanfaat bagi masyarakat.",
      "about.profileP3": "Dengan bimbingan dari Ibu Afrinawati, M.Pd sebagai wali kelas, kami selalu berusaha memberikan yang terbaik dalam setiap kegiatan akademik maupun non-akademik.",

      "mission.mainTitle": "Visi & Misi",
      "mission.visionTitle": "Visi",
      "mission.visionText": "Menjadi kelas unggulan yang mencetak generasi cerdas, berkarakter, dan berprestasi di bidang sains dan teknologi.",
      "mission.missionTitle": "Misi",
      "mission.val1Title": "Berprestasi",
      "mission.val1Desc": "Meningkatkan prestasi akademik dan non-akademik di berbagai bidang",
      "mission.val2Title": "Berkarakter",
      "mission.val2Desc": "Membangun karakter yang jujur, disiplin, dan bertanggung jawab",
      "mission.val3Title": "Bersolidaritas",
      "mission.val3Desc": "Menjalin kebersamaan dan gotong royong antar sesama siswa",

      "char.mainTitle": "Karakter Kelas",
      "char.c1Title": "Cerdas & Kritis",
      "char.c1Desc": "Kami selalu berusaha untuk berpikir kritis dalam memecahkan masalah dan terus mengasah kemampuan berpikir logis.",
      "char.c2Title": "Peduli & Berbagi",
      "char.c2Desc": "Kami memiliki kepedulian tinggi terhadap sesama dan selalu siap membantu teman yang membutuhkan.",
      "char.c3Title": "Inovatif & Kreatif",
      "char.c3Desc": "Kami selalu berinovasi dan berkreasi dalam berbagai kegiatan untuk menghasilkan karya terbaik.",
      "char.c4Title": "Kompetitif & Sportif",
      "char.c4Desc": "Kami menjunjung tinggi sportivitas dalam setiap kompetisi dan berusaha menjadi yang terbaik dengan cara yang sehat.",

      "homeroom.titlePrefix": "Wali",
      "homeroom.titleHighlight": "Kelas",
      "homeroom.subtitle": "Penggerak dan pembimbing XI-1 Saintek",

      "students.titlePrefix": "Siswa",
      "students.unit": "siswa",

      "schedule.titlePrefix": "Jadwal Pelajaran",
      "schedule.subtitle": "Jadwal kegiatan belajar",
      "day.monday": "Senin",
      "day.tuesday": "Selasa",
      "day.wednesday": "Rabu",
      "day.thursday": "Kamis",
      "day.friday": "Jumat",

      "subject.mtktl": "MTK TL",
      "subject.religion": "AGAMA",
      "subject.biology": "BIOLOGI",
      "subject.mtkwajib": "MTK WAJIB",
      "subject.chemistry": "KIMIA",
      "subject.history": "SEJARAH",
      "subject.art": "SENI RUPA",
      "subject.english": "B.INGGRIS",
      "subject.counseling": "BK",
      "subject.civics": "PKN",
      "subject.physics": "FISIKA",
      "subject.indonesian": "B.INDONESIA",
      "subject.pe": "PENJAS",

      "gallery.titlePrefix": "Galeri",
      "gallery.titleHighlight": "Kelas",
      "gallery.g1Title": "Foto Bareng Walas",
      "gallery.g1Desc": "Fotbar XI.1 Saintek",
      "gallery.g2Title": "Kegiatan Olahraga",
      "gallery.g2Desc": "Suasana Fotbar Olahraga XI.1 Saintek",
      "gallery.g3Title": "Kegiatan Olahraga Lompat Tali",
      "gallery.g4Title": "Kegiatan Senirupa",
      "gallery.g4Desc": "Suit Maju duluan presentasi",
      "gallery.g5Title": "Lomba",
      "gallery.g5Desc": "Lomba Sarung Terbang XI.1 Saintek",
      "gallery.g6Title": "Lomba",
      "gallery.g6Desc": "Lomba Estafet Sarung XI.1 Saintek",
      "gallery.g7Title": "Lomba",
      "gallery.g7Desc": "Lomba Magic Speed Number XI.1 Saintek",
      "gallery.g8Title": "Lomba",
      "gallery.g8Desc": "Lomba Estafet Spons Final XI.1 Saintek",
      "gallery.g9Title": "Lomba",
      "gallery.g9Desc": "Lomba Estafet Spons XI.1 Saintek",

      "footer.built": "Dibuat di sela sela tugas sekolah."
    },
    en: {
      "preloader.loading": "Loading...",
      "nav.about": "About",
      "nav.students": "Students",
      "nav.lesson": "Lesson",
      "nav.homeroom": "Homeroom Teacher",
      "nav.gallery": "Gallery",
      "nav.contact": "Contact",

      "hero.desc": "Welcome to the official website of class <span class=\"text-highlight\">XI.1 Saintek</span> SMA PGRI 3 Jakarta. A class full of <span class=\"text-highlight\">achievements</span> and <span class=\"text-highlight\">togetherness</span>.",
      "hero.btnAbout": "About Class",
      "hero.btnStudents": "View Students",
      "hero.scroll": "Scroll down",

      "about.sectionTitlePrefix": "About",
      "about.sectionSubtitle": "Getting to know the pride class of SMA PGRI 3 Jakarta better",
      "about.tabStory": "Class Profile",
      "about.tabMission": "Vision & Mission",
      "about.tabApproach": "Character",

      "about.profileTitle": "Class Profile of XI.1 Saintek",
      "about.profileP1": "<strong>XI.1 Saintek</strong> is an excellent class at SMA PGRI 3 Jakarta focusing on Science and Technology. This class consists of <strong>18 male students</strong> and <strong>15 female students</strong> with high learning enthusiasm.",
      "about.profileP2": "We are a young generation ready to face future challenges equipped with knowledge, skills, and strong character. In this class, we learn not only for grades, but to become beneficial individuals for society.",
      "about.profileP3": "Under the guidance of Mrs. Afrinawati, M.Pd as our homeroom teacher, we always strive to give our best in every academic and non-academic activity.",

      "mission.mainTitle": "Vision & Mission",
      "mission.visionTitle": "Vision",
      "mission.visionText": "To become an outstanding class producing smart, characterful, and high-achieving generations in science and technology.",
      "mission.missionTitle": "Mission",
      "mission.val1Title": "High Achieving",
      "mission.val1Desc": "Enhancing academic and non-academic achievements in various fields",
      "mission.val2Title": "Strong Character",
      "mission.val2Desc": "Building honest, disciplined, and responsible character",
      "mission.val3Title": "Solidarity",
      "mission.val3Desc": "Fostering togetherness and mutual assistance among students",

      "char.mainTitle": "Class Character",
      "char.c1Title": "Smart & Critical",
      "char.c1Desc": "We always strive to think critically in solving problems and honing logical thinking skills.",
      "char.c2Title": "Caring & Sharing",
      "char.c2Desc": "We care deeply about others and are always ready to help friends in need.",
      "char.c3Title": "Innovative & Creative",
      "char.c3Desc": "We constantly innovate and create in various activities to produce the best work.",
      "char.c4Title": "Competitive & Sporty",
      "char.c4Desc": "We uphold sportsmanship in every competition and strive to be the best in a healthy way.",

      "homeroom.titlePrefix": "Homeroom",
      "homeroom.titleHighlight": "Teacher",
      "homeroom.subtitle": "The motivator and mentor of XI-1 Saintek",

      "students.titlePrefix": "Students of",
      "students.unit": "students",

      "schedule.titlePrefix": "Class Schedule",
      "schedule.subtitle": "Learning activity schedule",
      "day.monday": "Monday",
      "day.tuesday": "Tuesday",
      "day.wednesday": "Wednesday",
      "day.thursday": "Thursday",
      "day.friday": "Friday",

      "subject.mtktl": "ADV. MATH",
      "subject.religion": "RELIGION",
      "subject.biology": "BIOLOGY",
      "subject.mtkwajib": "MATH",
      "subject.chemistry": "CHEMISTRY",
      "subject.history": "HISTORY",
      "subject.art": "FINE ARTS",
      "subject.english": "ENGLISH",
      "subject.counseling": "COUNSELING",
      "subject.civics": "CIVICS",
      "subject.physics": "PHYSICS",
      "subject.indonesian": "INDONESIAN",
      "subject.pe": "PHYS. ED.",

      "gallery.titlePrefix": "Class",
      "gallery.titleHighlight": "Gallery",
      "gallery.g1Title": "Photo with Homeroom Teacher",
      "gallery.g1Desc": "Group photo of XI.1 Saintek",
      "gallery.g2Title": "Sports Activity",
      "gallery.g2Desc": "Group photo during sports activity",
      "gallery.g3Title": "Jump Rope Activity",
      "gallery.g4Title": "Fine Arts Activity",
      "gallery.g4Desc": "Roshambo before presentation",
      "gallery.g5Title": "Competition",
      "gallery.g5Desc": "Flying Sarong Contest XI.1 Saintek",
      "gallery.g6Title": "Competition",
      "gallery.g6Desc": "Sarong Relay Contest XI.1 Saintek",
      "gallery.g7Title": "Competition",
      "gallery.g7Desc": "Magic Speed Number Contest XI.1 Saintek",
      "gallery.g8Title": "Competition",
      "gallery.g8Desc": "Sponge Relay Contest Final XI.1 Saintek",
      "gallery.g9Title": "Competition",
      "gallery.g9Desc": "Sponge Relay Contest XI.1 Saintek",

      "footer.built": "Built between school assignments."
    }
  };

  let currentLang = localStorage.getItem('language') || 'id';

  function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
  }

  applyTranslations(currentLang);

  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.dataset.lang;
      currentLang = selectedLang;
      localStorage.setItem('language', selectedLang);
      applyTranslations(selectedLang);
      initHomeroomSection();
      initStudentsSection();
      initTypingEffect();
    });
  });
}
