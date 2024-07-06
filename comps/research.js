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
    doc: state.openCiteContent,
    schema: ({
      'Artikel': {
        group: {
          type: String, label: 'Grup Sitasi',
          autoform: {help: 'Gunakan sebuah keyword tertentu'}
        },
        title: {
          type: String, label: 'Judul Artikel',
          autoform: {type: 'textarea'}
        },
        authors: {type: Array, label: 'Para Penulis'},
        'authors.$': {type: Object},
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
        },
        fileLink: {
          type: String, optional: true,
          label: 'Link ke file'
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
          ['group'], ['title'],
          ['journal', 'authors'],
          ['content'], ['fileLink']
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
    action: doc => [
      localStorage.setItem(
        'citations',
        JSON.stringify(Object.assign(
          JSON.parse(localStorage.citations || '{}'),
          {[state.openCiteId || randomId()]: {
            ...doc, type: state.citeType
          }}
        ))
      ),
      delete state.citeType,
      m.redraw(), scroll(0, 0)
    ],
    buttons: [
      {label: 'Batal', opt: {
        class: 'is-warning',
        onclick: x => [
          delete state.citeType,
          m.redraw()
        ]
      }}
    ]
  })),

  // Bank Riset: berkategori
  m('h3', 'Bank Data Sitasi'),
  m(autoTable({
    id: 'citations',
    heads: {
      open: 'Lihat',
      group: 'Group',
      title: 'Judul',
      authors: 'Penulis',
      year: 'Tahun',
      journal: 'Jurnal',
      remove: 'Hapus'
    },
    rows: Object.entries(JSON.parse(
      localStorage.citations || '{}'
    )).map(([id, rec]) => ({
      data: {[id]: rec},
      row: {
        title: rec.title,
        group: rec.group,
        year: rec.journal.year,
        journal: rec.journal.name,
        authors: rec.authors
          .map(i => i.lastName).join(', '),
        open: m(
          '.button.is-small.is-rounded.is-primary',
          {onclick: x => [
            Object.assign(state, {
              citeType: rec.type || state.citeType,
              openCiteContent: rec,
              openCiteId: id
            }),
            m.redraw(), scroll(0, 0)
          ]},
          m('span.icon', m('i.fas.fa-arrow-right'))
        ),
        remove: m(
          '.button.is-small.is-rounded.is-danger',
          {onclick: x => confirm('Yakin hapus ini?') && [
            localStorage.setItem('citations', JSON.stringify(
              _.omit(JSON.parse(localStorage.citations || '{}'), id)
            ))
          ]},
          m('span.icon', m('i.fas.fa-times'))
        )
      }
    })),
    onclick: x => null
  }))

  // Diskusikan dengan AI
]