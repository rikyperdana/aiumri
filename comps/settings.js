comps.settings = x => [
  m('h3', 'Pengaturan'),
  m('.box', [
    m('h4', 'Tampilan'),
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
  m('.box', [
    m('h4', 'Backup & Restore'),
    m('p', 'Karena App ini tidak menggunakan DB di sisi server, maka pilihannya adalah backup dan restore apa yang ada di dalam browser.'),
    m('.ul', [
      m('li', 'Klik Backup dan dapatkan file .json'),
      m('li', 'Klik Restore dan berikan file .json')
    ]), m('br'),
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
      m('.button.is-danger', {
        onclick: x => alert('Restore is coming soon..')
      }, 'Restore')
    ])
  ]),
  m('.box', [
    m('h4', 'Profilku'),
    m('p', 'Perkenalkan dirimu kepada AI untuk jawaban yang lebih personal. Abaikan form ini bila ingin tetap anonim dihadapan AI.'),
    m(autoForm({
      id: 'myProfile',
      doc: JSON.parse(localStorage.myProfile || '{}'),
      schema: {
        name: {
          type: String, label: 'Nama Lengkap',
          optional: true
        },
        nick: {
          type: String, label: 'Nama Panggilan',
          optional: true
        },
        bio: {
          type: String, label: 'Biodata', optional: true,
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
  ])
]