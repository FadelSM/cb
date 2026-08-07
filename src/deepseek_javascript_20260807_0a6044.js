// ============================================================
// DATA SISWA (Ubah sesuai kelas Anda — total 36 siswa)
// ============================================================
const students = [
    { name: 'Andi Pratama', nickname: 'Andi', quote: '"Ngoding dulu, galau kemudian."', ig: '@andi_pratama' },
    { name: 'Siti Nurhaliza', nickname: 'Siti', quote: '"Cita-cita setinggi langit."', ig: '@sitinurhaliza' },
    { name: 'Budi Santoso', nickname: 'Bud', quote: '"Tidur adalah investasi."', ig: '@budisantoso' },
    { name: 'Citra Ayu', nickname: 'Citra', quote: '"Kamera adalah saksi bisu."', ig: '@citra.ayu' },
    { name: 'Dewi Lestari', nickname: 'Dewi', quote: '"Catatan rapi, hidup rapi."', ig: '@dewilestari' },
    { name: 'Eko Prasetyo', nickname: 'Eko', quote: '"Olahraga sebelum segalanya."', ig: '@eko_pras' },
    { name: 'Fajar Ramadhan', nickname: 'Fajar', quote: '"Adzan dulu, baru nugas."', ig: '@fajar_rmd' },
    { name: 'Gina Aulia', nickname: 'Gina', quote: '"Buku adalah sahabat."', ig: '@ginaaulia' },
    { name: 'Hana Safira', nickname: 'Hana', quote: '"Makan, tidur, repeat."', ig: '@hanasafira' },
    { name: 'Indra Kusuma', nickname: 'Indra', quote: '"Gitar dulu, soal belakangan."', ig: '@indrakusuma' },
    { name: 'Joko Widodo', nickname: 'Jokowi', quote: '"Kerja, kerja, kerja."', ig: '@jokowi_muda' },
    { name: 'Kiki Amalia', nickname: 'Kiki', quote: '"Drama is my life."', ig: '@kikiamalia' },
    { name: 'Lala Marlina', nickname: 'Lala', quote: '"Tersenyum dalam ujian."', ig: '@lalamarlina' },
    { name: 'Mira Putri', nickname: 'Mira', quote: '"Makeup dulu baru belajar."', ig: '@miraputri' },
    { name: 'Nina Rahayu', nickname: 'Nina', quote: '"Humble but hungry."', ig: '@ninarahayu' },
    { name: 'Omar Bakri', nickname: 'Omar', quote: '"Satpam kelas 24/7."', ig: '@omarbakri' },
    { name: 'Putri Ayuningtyas', nickname: 'Putri', quote: '"Menari dalam pelajaran."', ig: '@putriayu' },
    { name: 'Qori Hidayat', nickname: 'Qori', quote: '"Tilawah dulu, baru diskusi."', ig: '@qorihidayat' },
    { name: 'Rian Hidayat', nickname: 'Rian', quote: '"Uang adalah segalanya."', ig: '@rianhidayat' },
    { name: 'Siska Wulandari', nickname: 'Siska', quote: '"Rebahan adalah hak."', ig: '@siskawulan' },
    { name: 'Tono Supriyadi', nickname: 'Tono', quote: '"Motor dulu, cinta kemudian."', ig: '@tonosupriyadi' },
    { name: 'Umi Kalsum', nickname: 'Umi', quote: '"Masak untuk teman-teman."', ig: '@umikalsum' },
    { name: 'Vina Panduwinata', nickname: 'Vina', quote: '"Bernyanyi sampai lulus."', ig: '@vinapandu' },
    { name: 'Wahyu Nugroho', nickname: 'Wahyu', quote: '"Mimpi besar, usaha keras."', ig: '@wahyunugroho' },
    { name: 'Xena Anggraini', nickname: 'Xena', quote: '"Prajurit wanita sejati."', ig: '@xena_angg' },
    { name: 'Yoga Prasetya', nickname: 'Yoga', quote: '"Meditasi sebelum ulangan."', ig: '@yogapras' },
    { name: 'Zahra Aulia', nickname: 'Zahra', quote: '"Bunga di taman kelas."', ig: '@zahraaulia' },
    { name: 'Adi Nugroho', nickname: 'Adi', quote: '"Gaming is life."', ig: '@adinugroho' },
    { name: 'Bella Safitri', nickname: 'Bella', quote: '"Fashion before passion."', ig: '@bellasafitri' },
    { name: 'Candra Kirana', nickname: 'Candra', quote: '"Puisi dalam sunyi."', ig: '@candrakirana' },
    { name: 'Dimas Ardiansyah', nickname: 'Dimas', quote: '"Basket adalah nafas."', ig: '@dimasardi' },
    { name: 'Erlin Kusuma', nickname: 'Erlin', quote: '"Tawa adalah obat."', ig: '@erlinkusuma' },
    { name: 'Fikri Haikal', nickname: 'Fikri', quote: '"Debat dulu, damai kemudian."', ig: '@fikrihaikal' },
    { name: 'Gilang Ramadhan', nickname: 'Gilang', quote: '"Drummer sejati."', ig: '@gilangram' },
    { name: 'Hesti Purwanti', nickname: 'Hesti', quote: '"Rajin pangkal kaya."', ig: '@hestipur' },
    { name: 'Ilham Maulana', nickname: 'Ilham', quote: '"Koding adalah jalan ninja."', ig: '@ilham_maul' },
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
            <div class="quote">${s.quote}</div>
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