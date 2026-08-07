// ============================================================
// DATA SISWA (Ubah sesuai kelas Anda — total 33 siswa)
// ============================================================
const students = [
    { name: 'Akhtar Jaya Wardhana', nickname: 'Atar', ig: '@akhtrwrdhnaa' },
    { name: 'Azhar Aziz Hamdani', nickname: 'Azhar', ig: '@zhencuyh' },
    { name: 'Bagus Raditya Faturrahman', nickname: 'Bagus', ig: '@tidaaaav' },
    { name: 'Damar Cahyo Panuluh', nickname: 'Damar', ig: '@damarcahyop' },
    { name: 'Dewi Thoatika Nurjanah', nickname: 'Dewi', ig: '@dewi' },
    { name: 'Eka Puspita Novita Damayanti', nickname: 'Puspit', ig: '@' },
    { name: 'Evan Al Rasyid', nickname: 'Evan', ig: '@vanlrsyd' },
    { name: 'Fadel Shafwan Maliki', nickname: 'Fadel', ig: '@fadelshafwanmaliki' },
    { name: 'Faqih Arya Pasha', nickname: 'Faqih', ig: '@f4qiiharyp_' },
    { name: 'Fazril Ilyas', nickname: 'Fazril/Zril', ig: '@whyp_jril' },
    { name: 'Firdaus Ilham', nickname: 'Uus/ham', ig: '@hamm_uus' },
    { name: 'Fitri Lailan Najmi', nickname: 'Fitri', ig: '@_lailannjmii' },
    { name: 'Intan Aliyana', nickname: 'Intan', ig: '@intanealyna' },
    { name: 'Jenius Hosevan Simon Panjaitan', nickname: 'Jen', ig: '@jennnl__' },
    { name: 'Juwita Apriyani', nickname: 'Juwita', ig: '@' },
    { name: 'Kayla Khalidah Tajudin', nickname: 'Kay', ig: '@' },
    { name: 'Keyla Nur Hasanah', nickname: 'Key', ig: '@' },
    { name: 'Khoirul Anisa Putri', nickname: 'Kep', ig: '@' },
    { name: 'Lequinsha Zalyandra Bilqis', nickname: 'Lequin', ig: '@' },
    { name: 'Lintang Azzalea Pratama', nickname: 'Lintang', ig: '@' },
    { name: 'Lutfiah Thalita Azmi', nickname: 'Tata', ig: '@' },
    { name: 'Miftah Khoiron Ramadhan', nickname: 'Miftah', ig: '@' },
    { name: 'Moura Dealova Kanza Adiba T', nickname: 'Moura', ig: '@' },
    { name: 'Muhammad Rizky Maulana', nickname: 'Jajat', ig: '@' },
    { name: 'Muhammad Adelio Faustin AB', nickname: 'Adel', ig: '@' },
    { name: 'Nabilla Oktavia Andini', nickname: 'Okta', ig: '@' },
    { name: 'Nova Zaidah', nickname: 'Nova', ig: '@' },
    { name: 'Poros Baroki Bumas', nickname: 'Poros', ig: '@' },
    { name: 'Rayiandra Abinaya', nickname: 'Abi', ig: '@' },
    { name: 'Rizqi Khoiril Ibad', nickname: 'Aril', ig: '@' },
    { name: 'Steven Febrian Pratama', nickname: 'Steven', ig: '@' },
    { name: 'Zafir Raihan Basri', nickname: 'Zafir', ig: '@' },
    { name: 'Zalfa Zahirah', nickname: 'Zalfa', ig: '@' },
];

// ============================================================
// DATA KESAN & PESAN
// ============================================================
const testimonials = [
    { msg: '"Terima kasih Bu Ratna sudah sabar menghadapi kami yang super ribut. Kami sayang Ibu!"', from: '— Seluruh XII IPA 3' },
    { msg: '"Tiga tahun bareng kalian rasanya kayak naik roller coaster. Senang, sedih, kesel, kangen, semua jadi satu."', from: '— Andi Pratama' },
    { msg: '"Kelas ini adalah rumah kedua. Tempat aku bisa jadi diri sendiri tanpa takut dihakimi."', from: '— Citra Ayu' },
    { msg: '"Maafin aku ya guys kalo selama ini suka minjem pulpen terus ilang. Love you all!"', from: '— Budi Santoso' },
    { msg: '"Semoga kita semua sukses dan bisa reunian di puncak kesuksesan masing-masing. Aamiin."', from: '— Fajar Ramadhan' },
    { msg: '"Gonna miss the chaos, the laughter, and the "PR-nya udah belum?" every single morning."', from: '— Dewi Lestari' },
];

// ============================================================
// FUNGSI RENDER
// ============================================================

/**
 * Render kartu biodata siswa ke dalam grid
 */
function renderStudents() {
    const grid = document.getElementById('studentGrid');
    if (!grid) return;

    let html = '';
    students.forEach((s, i) => {
        const initials = s.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

        // Warna avatar berbeda untuk setiap siswa (HSL)
        const hue = (i * 37) % 360;

        html += `
        <div class="student-card">
            <div class="student-avatar" style="background: hsl(${hue}, 60%, 55%);">${initials}</div>
            <h4>${s.name}</h4>
            <div class="nickname">"${s.nickname}"</div>
            <a href="https://instagram.com/${s.ig.replace('@', '')}" target="_blank" rel="noopener" class="social">${s.ig}</a>
        </div>`;
    });
    grid.innerHTML = html;
}

/**
 * Render kartu kesan & pesan
 */
function renderTestimonials() {
    const grid = document.getElementById('testimonialGrid');
    if (!grid) return;

    let html = '';
    testimonials.forEach(t => {
        html += `
        <div class="testimonial-card">
            <div class="msg">${t.msg}</div>
            <div class="from">${t.from}</div>
        </div>`;
    });
    grid.innerHTML = html;
}

// ============================================================
// SMOOTH SCROLL NAVIGASI
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================================
// INIT
// ============================================================
function init() {
    renderStudents();
    renderTestimonials();
    initSmoothScroll();
}

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', init);
