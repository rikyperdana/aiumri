const guides = [
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
  {category: 'AI Chat', title: 'Privasi & Keamanan', content: `
    Aplikasi ini dirancang tidak memiliki database di sisi server.
    Semua memori yang tersimpan dalam browser kamu terletak dalam
    localStorage. Kelebihan skema ini 1) beban server kecil karena
    tidak perlu urusi database, 2) user tidak perlu login, 3) pihak
    umum dapat menggunakan aplikasi ini secara bebas. Kelemahan dari
    skema ini 1) semua memori hilang ketika kamu hapus browser dari
    perangkat yang kamu gunakan, 2) tidak ada penyimpanan cloud, 3)
    backup data harus dilakukan manual. Silahkan cek source code
    aplikasi ini untuk melihat keseluruhan logika aplikasi.
  `}
]

comps.guide = x => m('.container', [
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
])

/*
makeModal = name => m('.modal',
  {class: state[name] && 'is-active'},
  m('.modal-background'),
  m('.modal-content', state[name]),
  m('.modal-close.is-large', {onclick: () =>
    [state[name] = null, m.redraw()]
  })
), // BUG: yg di dalam modal tidak mempan m.redraw()
*/