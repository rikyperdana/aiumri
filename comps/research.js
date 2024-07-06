comps.research = x => [
  m('p', 'Sedang dalam pengembangan'),
  // Form input: buku, artikel, web

  m('h3', 'Tambah Sitasi'),

  !state.citeType ? m(autoForm({
    id: 'citeType',
    schema: {tipe: {
      type: String, autoform: {
        type: 'select', options: x => [
          'Artikel', 'Buku', 'Web'
        ].map(i => ({value: i, label: i}))
      }
    }},
    submit: {value: 'Pilih'},
    action: doc => [
      Object.assign(state, {citeType: doc.tipe})
    ]
  })) :

  m(autoForm({
    id: 'newCite',
    schema: ({
      'Artikel': {
        group: {
          type: String, label: 'Grup Sitasi',
          autoform: {help: 'Pengelompokan sitasi ini'}
        },
        title: {type: String, label: 'Judul Artikel'},
        authors: {type: Array, label: 'Para Penulis'},
        'authors.$': {type: Object, label: 'Penulis'},
        'authors.$.firstName': {type: String, label: 'Nama Pangkal'},
        'authors.$.lastName': {type: String, label: 'Nama Akhir'},
        journal: {type: Object},
        'journal.name': {type: String, label: 'Nama Jurnal'},
        'journal.year': {type: Number, label: 'Tahun terbit'},
        'journal.volume': {type: Number, optional: true, label: 'Nomor volume'},
        'journal.issue': {type: Number, optional: true, label: 'Nomor Issue'},
        'journal.page': {type: Number, optional: true, label: 'Nomor halaman'},
        'journal.city': {type: String, optional: true, label: 'Kota penerbit'},
        'journal.doi': {type: String, optional: true, label: 'Link DOI'},
        content: {
          type: String,
          autoform: {type: 'textarea'},
          label: 'Konten penting dalam artikel',
        }
      },
      'Buku': {
        title: {type: String}
      },
      'Web': {
        title: {type: String}
      }
    })[state.citeType],
    layout: ({
      'Artikel': {
        top: [
          ['group', 'title'],
          ['journal', 'authors']
        ],
        journal: [
          ['name'],
          ['year', 'volume', 'issue'],
          ['page', 'city', 'doi']
        ],
        'authors.$': [['firstName', 'lastName']]
      }
    })[state.citeType],
    submit: {value: 'Simpan'},
    buttons: [
      {label: 'Batal', opt: {
        class: 'is-warning',
        onclick: x => [
          delete state.citeType,
          m.redraw()
        ]
      }}
    ]
  }))

  // Bank Riset: berkategori
  // Diskusikan dengan AI
]