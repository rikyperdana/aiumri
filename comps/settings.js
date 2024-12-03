const
modulAPI = m('.box', [
  m('h4', 'Gemini API'),
  m(autoForm({
    id: 'geminiAPI',
    doc: JSON.parse(localStorage.geminiAPI || '[]'),
    schema: {api: {type: String, autoform: {
      help: 'Belum punya? Ambil disini => https://aistudio.google.com/apikey'
    }}},
    submit: {value: 'Simpan'},
    action: doc => localStorage.setItem(
      'geminiAPI', JSON.stringify(doc)
    )
  }))
]),

modulPilihanTema = m('.box', [
  m('h4', 'Tema Aplikasi'),
  m(autoForm({
    id: 'themeSelection',
    schema: {theme: {
      type: String, label: 'Pilihan Tema',
      autoform: {type: 'select', options: x => [
        'default', 'cerulean', 'cosmo', 'cyborg', 'darkly',
        'flatly', 'journal', 'litera', 'lumen', 'lux',
        'materia', 'minty', 'nuclear', 'pulse', 'sandstone',
        'simplex', 'slate', 'solar', 'spacelab', 'superhero',
        'united', 'yeti'
      ].map(theme => ({
        value: theme,
        label: _.startCase(theme)
      }))}
    }},
    submit: {value: 'Pilih'},
    action: doc => [
      localStorage.setItem('appTheme', doc.theme),
      window.location.reload()
    ],
    buttons: [{label: 'Galeri', opt: {
      class: 'is-success', onclick: e => [
        e.preventDefault(), window.open(
          'https://github.com/rikyperdana/simrs/wiki/Theme-Gallery',
          '_blank'
        )
      ]
    }}]
  }))
]),

modulBackupRestore =  m('.box', [
  m('h4', 'Backup & Restore'),
  m('p', 'Karena App ini tidak menggunakan DB di sisi server, maka pilihannya adalah backup dan restore apa yang ada di dalam browser.'),
  m('.ul', [
    'Klik Backup dan dapatkan file .json',
    'Klik Restore dan berikan file .json',
    'Klik Destroy untuk lupakan semua memori.'
  ].map(list => m('li', list))), m('br'),
  m('.buttons', [
    m('.button.is-info', {onclick: x => saveAs(
      new Blob(
        [JSON.stringify(Object.assign({}, {
          threads: localStorage.threads,
          memories: localStorage.memories,
          appTheme: localStorage.appTheme
        }))],
        {type: 'text/plain;charset=utf-8'}
      ),
      `Backup AI UMRI ${(new Date()).toLocaleDateString('en-gb')}.json`
    )}, 'Backup'),
    m('.button.is-warning', {
      onclick: x => alert('Restore is coming soon..')
    }, 'Restore'),
    m('.button.is-danger', {
      onclick: x =>
        confirm('Yakin lupakan semua memori?')
        && localStorage.removeItem('memories')
        && alert('Semua memori sudah terhapus')
    }, 'Destroy')
  ])
]),

modulRAG = m('.box', [
  m('h4', 'Perkenalan User'),
  m('p', 'Perkenalkan dirimu kepada AI untuk jawaban yang lebih personal. Abaikan form ini bila ingin tetap anonim dihadapan AI.'),
  m(autoForm({
    id: 'myProfile',
    doc: JSON.parse(localStorage.myProfile || '{}'),
    schema: {
      nick: {
        type: String, label: 'Panggilan',
        optional: true
      },
      bio: {
        type: String, label: 'Tentang kamu', optional: true,
        autoform: {
          type: 'textarea',
          help: 'App ini tidak punya DB sisi server. Semua info diatas hanya ada dalam browser kamu, tepatnya di localStorage.'
        },
      }
    },
    submit: {value: 'Ingat aku'},
    action: doc => [
      localStorage.setItem('myProfile', JSON.stringify(doc)),
      m.redraw(), alert('Baik, akan diingat.')
    ]
  }))
]),

modulUkuranFont = m('.box', [
  m('h4', 'Ukuran Font Chat'),
  m(autoForm({
    id: 'fontSize',
    schema: {fontSize: {
      type: String, label: 'Pilihan Ukuran',
      autoform: {
        type: 'select', options: x => [
          {value: 'is-small', label: 'Kecil'},
          {value: '', label: 'Normal'},
          {value: 'is-medium', label: 'Besar'},
          {value: 'is-large', label: 'Ekstra'}
        ]
      }
    }},
    submit: {value: 'Pilih'},
    action: ({fontSize}) => [
      localStorage.setItem('fontSize', fontSize),
      alert('Pilihan ukuran font baru tersimpan.')
    ]
  }))
])

comps.settings = x => [
  m('h3', 'Pengaturan'),
  modulAPI,
  m('.columns', [
    m('.column', modulPilihanTema),
    m('.column', modulUkuranFont)
  ]),
  modulBackupRestore,
  modulRAG
]