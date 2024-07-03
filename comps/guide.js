const guides = [
  // Kategori AI Chat
  {category: 'AI Chat', title: 'Cara pakai', content: `
    Buka menu AI Chat, ketikkan pesan atau pertanyaan yang ingin
    ditanyakan kepada AI. Simbol loading akan berputar dalam kotak
    pertanyaan dan akan padam ketika AI akhirnya memberikan respon.
    Silahkan lanjutkan percakapan sesuai kebutuhan. Semakin rinci
    pertanyaan yang diajukan, maka akan semakin spesifik pula jawaban
    yang akan dibalas oleh AI. Tidak ada batasan sepanjang apa
    percakapan yang mampu ditangani oleh AI, selagi percakapan yang
    dibawa oleh user masih masuk akal menurut manusia atau dapat
    dipahami oleh model AI yang tersedia.
  `},
  {category: 'AI Chat', title: 'Simpan Percakapan', content: `
    Aplikasi AI chat lain pada umumnya punya memori yang terbatas
    oleh waktu, percakapan yang berlangsung hari ini tidak akan
    diingat oleh AI tersebut minggu depan bahkan esok. Aplikasi ini
    dirancang untuk mampu mengingat percakapan dalam jangka waktu
    yang panjang. Untuk dapat menyimpan sebuah percakapan, klik
    tombol Simpan dan berikan judul percakapan yang sesuai.
    Percakapan tersebut akan tersimpan dalam memori browser dan
    user bisa melanjutkan percakapan yang sama dengan AI tersebut
    baik esok maupun tahun depan (dalam browser yang sama).
  `},
  {category: 'AI Chat', title: 'Lanjut Percakapan', content: `
    Memori adalah menu yang dapat kamu gunakan untuk melihat memori
    percakapan apa saja yang diingat oleh browser-mu. Klik tombol
    Lanjut untuk melanjutkan percakapan yang sama dengan AI. Tidak
    ada batasan seberapa banyak memori yang bisa disimpan dalam
    browser kamu. Tapi sekedar informasi, setiap browser punya
    kapasitas berbeda dalam menyimpan percakapan. Memori browser
    terbesar pertama adalah Opera, kedua Firefox, ketiga Chrome.
  `},
  {category: 'AI Chat', title: 'Lama loading', content: `
    Neural Processing Unit butuh waktu untuk menerima input,
    mengolahnya, dan merancang jawaban yang relevan untuk diberikan
    kepada user. AI pada dasarnya adalah AutoComplete versi canggih.
    Semakin kompleks pertanyaan, semakin lama waktu yang dibutuhkan
    server untuk mengembalikan respon. Waktu tunggu normal respon AI
    pada aplikasi ini adalah sekitar 30 detik hingga 1 menit. Bila
    lebih lama dari itu maka ada kemungkinan masalah jaringan atau
    kendala lainnya. Silahkan refresh halaman aplikasi untuk
    mengembalikan ke kondisi semula.
  `},
  {category: 'AI Chat', title: 'AI Engine', content: `
    Aplikasi ini menggunakan Public API key dari Google Gemini
    Developer Studio. Versi yang digunakan adalah Google Gemini
    1.5 Flash. Ini adalah model LLM yang ringan dan cepat untuk
    memberikan respon kepada user, namun cukup cerdas untuk
    mengetahui banyak hal dan mampu mengikuti konteks pembicaraan.
    Kedepannya developer akan menambahkan pilihan model/otak baru
    yaitu ChatGPT 3.5 Turbo dari OpenAI.
  `},

  // Kategori Bilingual
  {category: 'Bilingual', title: 'Cara pakai', content: `
    Menu Bilingual ini dapat kamu gunakan untuk melakukan percakapan
    multi bahasa dengan lawan bicara yang saling tidak memahami
    bahasa satu sama lain. Hingga saat ini sudah tersedia 13 bahasa
    berbeda yang didukung oleh AI dalam aplikasi ini. Cukup pilih
    bahasa yang digunakan lawan bicara, maka teks apapun yang kita
    inputkan akan diterjemahkan ke bahasa yang ditunjuk. Tunjukkan
    atau bacakan hasil terjemahan kepada lawan bicara, dan biarkan
    lawan bicara tersebut memberikan respon melalui input teks
    dengan pilihan bahasa Indonesia atau yang kamu pahami. Riwayat
    percakapan akan terlihat dan dapat disimpan ke dalam memori
    percakapan Bilingual bila diinginkan. Teknologi penerjemah yang
    digunakan tidak sama dengan Google Translate, AI dapat mengenali
    maksud pesan yang disampaikan dan menghasilkan terjemahan yang
    paling mendekati maksud yang ingin disampaikan dalam bahasa
    tujuan.
  `},

  // Kategori Pohon Ilmu
  {category: 'Pohon Ilmu', title: 'Cara pakai', content: `
    Kamu dapat menggunakan menu ini untuk membangun sebuah pohon
    pengetahuan akan suatu topik khusus yang kamu sebutkan. Input
    kata kunci pengetahuan yang diinginkan, maka AI akan membuat
    sebuah pohon JSON yang berisi percabangan pengetahuan yang
    sesuai dengan kata kunci tersebut. Ukuran pohon tersebut bisa
    besar ataupun kecil tergantung faktor seperti seberapa spesifik
    topik yang diminta dan seberapa paham AI tentang topik tersebut.
    Waktu loading yang dibutuhkan AI dapat berkisar dari 1 hingga 3
    menit. Jika lebih lama dari itu mungkin ada kendala jaringan,
    AI yang error, atau topik yang diminta bertentangan dengan
    batasan topik yang AI izinkan. Silahkan refresh browser untuk
    kembalikan ke kondisi semula. Membuat pohon topik yang sama
    pada waktu yang berbeda berpotensi mengeluarkan hasil yang
    berbeda pula.
  `},

  // Kategori Setting
  {category: 'Pengaturan', title: 'Backup/Restore', content: `
    Aplikasi ini tidak menggunakan DB di sisi server, sehingga
    user akan merasa aman bahwa datanya tidak disimpan pihak lain
    di suatu tempat. Satu-satunya penyimpanan yang aplikasi ini
    gunakan adalah localStorage atau memori internal browser yang
    saat ini kamu gunakan. Bila browser ini dihapus dari perangkat
    maka hilanglah semua memori percakapan yang pernah disimpan.
    Maka dari itu aplikasi ini menyediakan fitur Backup agar user
    dapat mengunduh file .json yang berisi semua memori tersebut.
    Fitur Restore dapat digunakan untuk mengembalikan memori yang
    lama ke browser baru di perangkat yang sama ataupun yang lain.
  `},
  {category: 'Pengaturan', title: 'Profilku', content: `
    Ini adalah kolom informasi yang opsional, boleh diabaikan bila
    user ingin tetap anonim/tanpa identitas ketika berinteraksi
    dengan AI Chat. Namun bila diisi, maka saat mulai berinteraksi
    AI bisa belajar tentang profil user yang sedang mengajak bicara
    dan menyesuaikan gaya jawaban dengan user yang bertanya.
    Algoritma penyesuaian ini adalah Retrieval-Augmented Generation,
    sebuah algoritma yang memungkinkan AI menyesuaikan jawaban
    kedepannya berdasarkan pengetahuan spesifik yang diberikan.
    Silahkan pelajari sendiri.
  `},

  // Kategori Aplikasi
  {category: 'Aplikasi', title: 'Privasi & Keamanan', content: `
    Aplikasi ini dirancang tidak memiliki database di sisi server.
    Semua memori yang tersimpan dalam browser kamu terletak dalam
    localStorage. Kelebihan skema ini 1) beban server kecil karena
    tidak perlu urusi database, 2) user tidak perlu login, 3) pihak
    umum dapat menggunakan aplikasi ini secara bebas. Kelemahan dari
    skema ini 1) semua memori hilang ketika kamu hapus browser dari
    perangkat yang kamu gunakan, 2) tidak ada penyimpanan cloud, 3)
    backup data harus dilakukan manual. Silahkan cek source code
    aplikasi ini untuk melihat keseluruhan logika aplikasi.
  `},
  {category: 'Aplikasi', title: 'Software Update', content: `
    Aplikasi ini berbasis web (duh!). Jadi update akan berlangsung
    secara otomatis tanpa perlu perintah langsung dari user. Versi
    terkini adalah 1.0.2 yang berarti aplikasi ini sudah siap untuk
    digunakan dengan fitur yang ada, diupayakan bebas dari bugs,
    dan akan senantiasa dipantau kualitasnya oleh developer.
  `},
  {category: 'Aplikasi', title: 'Lisensi Software', content: `
    Aplikasi ini dirancang, dikembangkan, dan dipublikasikan secara
    Open Source. Siapapun dipersilahkan untuk melihat, mengambil,
    memodifikasi, dan mendistribusikan kembali source code aplikasi
    ini untuk kebutuhan pendidikan. Sementara untuk kebutuhan bisnis,
    silahkan hubungi pengembang untuk mendapatkan lisensi hak guna.
    Source code aplikasi ini dapat dilihat di alamat repository
    https://github.com/rikyperdana/aiumri
  `},
  {category: 'Aplikasi', title: 'Disclaimer', content: `
    Aplikasi AI Chat ini menggunakan otak Large Language Model dari
    Google Gemini 1.5 Flash yang sudah di sensor sedemikian rupa
    untuk meminimalisir dan mencegah potensi jawaban yang mengandung
    unsur agama, politik, ras, dan hal etik lainnya. Dan tidak
    tertutup kemungkinan bahwa jawaban yg dikeluarkan dapat
    mengandung konten yang tidak tepat, bias, atau bentuk negatif
    lainnya. Aplikasi ini disajikan apa adanya. Segala bentuk
    tanggung jawab penggunaan aplikasi kembali pada masing-masing
    user. Gunakan secara bijaksana.
  `}
]

comps.guide = x => [
  m('h3', 'Panduan Aplikasi'),
  m(autoTable({
    id: 'faqs',
    heads: {
      category: 'Kategori',
      title: 'Judul',
    },
    rows: guides.map(guide => ({
      data: guide, row: {
        category: guide.category,
        title: guide.title
      }
    })),
    onclick: data => [
      Object.assign(state, {readGuide: data}),
      m.redraw()
    ]
  })),
  m('.modal',
    {class: state.readGuide && 'is-active'},
    m('.modal-background'),
    m('.modal-content', m('.box', [
      m('h4', state.readGuide?.title),
      m('p', state.readGuide?.content)
    ])),
    m('.modal-close.is-large', {onclick: x => [
      delete state.readGuide, m.redraw()
    ]})
  )
]