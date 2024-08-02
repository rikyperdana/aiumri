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
          autoform: {help: `
            Gunakan sebuah / beberapa keyword tertentu,
            pisahkan dengan tanda koma.
          `}
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
          label: 'Konten penting dalam artikel ini',
        },
        fileLink: {
          type: String, optional: true,
          label: 'Link ke file'
        }
      },

      'Buku': {
        group: {
          type: String, label: 'Grup Sitasi',
          autoform: {help: `
            Gunakan sebuah / beberapa keyword tertentu,
            pisahkan dengan tanda koma.
          `}
        },
        title: {
          type: String, label: 'Judul buku',
          autoform: {type: 'textarea', rows: 2}
        },
        authors: {type: Array, label: 'Para penulis'},
        'authors.$': {type: Object, label: 'Penulis'},
        'authors.$.firstName': {type: String, label: 'Nama pangkal'},
        'authors.$.lastName': {type: String, label: 'Nama akhir'},
        year: {type: Number, label: 'Tahun terbit'},
        publisher: {type: String, label: 'Penerbit'},
        city: {type: String, label: 'Kota terbit'},
        synopsis: {
          type: String, label: 'Sinopsis / Ringkasan',
          autoform: {type: 'textarea'}
        },
        content: {
          type: String, label: 'Konten penting dalam buku ini',
          autoform: {type: 'textarea'}
        },
        isbn: {type: Number, label: 'ISBN'},
        fileLink: {type: String, label: 'Link ke file buku'}
      },

      'Web': {
        group: {
          type: String, label: 'Grup Sitasi',
          autoform: {help: `
            Gunakan sebuah / beberapa keyword tertentu,
            pisahkan dengan tanda koma.
          `}
        },
        title: {type: String, label: 'Judul halaman'},
        url: {type: String, label: 'Link URL'},
        date: {type: Date, label: 'Tanggal terbit'},
        authors: {type: Array, label: 'Para penulis'},
        'authors.$': {type: Object, label: 'Penulis'},
        'authors.$.firstName': {type: String, label: 'Nama pangkal'},
        'authors.$.lastName': {type: String, label: 'Nama akhir'},
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
      },

      'Buku': {
        top: [
          ['group'], ['title'], ['authors'],
          ['year', 'publisher', 'city'],
          ['synopsis', 'content'],
          ['isbn', 'fileLink']
        ],
        'authors.$': [['firstName', 'lastName']]
      },

      'Web': {
        top: [
          ['group'], ['title'],
          ['date', 'url'], ['authors']
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
          ...doc, type: ors([
              state.citeType,
              state.openCiteContent?.type
            ])
          }}
        ))
      ),
      delete state.citeType,
      m.redraw(), scroll(0, 0)
    ],

    buttons: [
      {label: 'Batal', opt: {
        class: 'is-warning',
        onclick: e => [
          e.preventDefault(),
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
      group: 'Group', title: 'Judul',
      authors: 'Penulis', year: 'Tahun',
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
        year: ors([
          rec.year, // buku
          rec.journal?.year, // artikel
          rec.date && (new Date(rec.date)).getYear() + 1900 // web
        ]),
        journal: rec.journal?.name,
        authors: (rec.authors || [])
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