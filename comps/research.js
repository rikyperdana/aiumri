comps.research = x => [
  m('p', 'Sedang dalam pengembangan..'),

  // Form input: buku, artikel, web
  m('h3', `${state.openCiteContent ? 'Edit' : 'Tambah'} Sitasi`),

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
        'journal.page': {type: String, optional: true, label: 'Nomor halaman'},
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
        name: {type: String, label: 'Nama situs'},
        url: {type: String, label: 'Link URL'},
        date: {type: Date, label: 'Tanggal terbit'},
        access: {type: Date, label: 'Tanggal diakses'},
        authors: {type: Array, label: 'Para penulis'},
        'authors.$': {type: Object, label: 'Penulis'},
        'authors.$.firstName': {type: String, label: 'Nama pangkal'},
        'authors.$.lastName': {type: String, label: 'Nama akhir'},
        content: {
          type: String, label: 'Konten penting dalam situs ini',
          autoform: {type: 'textarea'}
        }
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
          ['group'], ['title', 'name'], ['url'],
          ['date', 'access'], ['authors'], ['content']
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
          delete state.openCiteContent,
          m.redraw()
        ]
      }}
    ]
  })),

  // Generated Daftar Pustaka
  state.referenceList && m(autoForm({
    id: 'references',
    doc: {reference: state.referenceList.join('\n\n')},
    schema: {
      reference: {
        type: String, label: 'Daftar Pustaka',
        autoform: {type: 'textarea', rows: 12},
        optional: true
      }
    },
    submit: {value: 'Copy'},
    action: doc => [
      navigator.clipboard.writeText(doc.reference),
      alert('Sudah tercopy, silahkan paste di tempat lain.')
    ],
    buttons: [{label: 'Tutup', opt: {
      class: 'is-warning', onclick: x => [
        delete state.referenceList, m.redraw()
      ]
    }}]
  })),

  // Bank Riset: berkategori
  m('h3', 'Bank Data Sitasi'),
  m(autoTable({
    id: 'citations',
    search: true,
    heads: {
      open: 'Lihat',
      group: 'Group', title: 'Judul',
      authors: 'Penulis', year: 'Tahun',
      journal: 'Penerbit',
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
        // journal: rec.journal?.name,
        journal: ors([
          rec.journal?.name, // kalau jurnal
          rec.publisher // kalau buku
        ]),
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
    onclick: x => null,
    buttons: [
      {label: 'MLA', opt: rows => ({
        class: 'is-primary',
        onclick: x => _.assign(state, {referenceList:rows.map(
          item => withAs(Object.values(item.data)[0], source => ({
            'Buku': `${source.authors[0].lastName}, ${source.authors[0].firstName}. ${source.title}. ${source.city}. ${source.publisher}, ${source.year}.`,
            'Artikel': `${source.authors[0].lastName}, ${source.authors[0].firstName}. "${source.title}". ${source.journal?.name}, ${source.journal?.volume}, ${source.journal?.issue} (${source.journal?.year}): ${source.journal?.page}`,
            'Web': `${source.authors[0].lastName}, ${source.authors[0].firstName}. "${source.title}". ${source.name}, ${new Date(source.date).toLocaleDateString('en-gb')}. ${source.url}, ${new Date(source.access).toLocaleDateString()}`
          })[source.type])
        ).sort((a, b) => a.localeCompare(b))})
        && m.redraw()
      })},
      {label: 'APA', opt: rows => ({
        class: 'is-primary',
        onclick: x => _.assign(state, {referenceList: rows.map(
          item => withAs(Object.values(item.data)[0], source => ({
            'Buku': `${source.authors[0].lastName}, ${source.authors[0].firstName.slice(0,1)}. (${source.year}). ${source.title}. ${source.city}: ${source.publisher}.`,
            'Artikel': `${source.authors[0].lastName}, ${source.authors[0].firstName.slice(0,1)}. ${source.title}. ${source.journal?.name}, Vol. ${source.journal?.volume}, Issue ${source.journal?.issue}, ${source.journal?.page}.`,
            'Web': `${source.authors[0].lastName}, ${source.authors[0].firstName.slice(0,1)}. (${new Date(source.date).toLocaleDateString()}). ${source.title}. ${source.url}`
          })[source.type])
        ).sort((a, b) => a.localeCompare(b))})
        && m.redraw()
      })},
      {label: 'Diskusikan', opt: rows => ({
        class: 'is-info',
        onclick: x => _.assign(state, {
          discussAI: true, bahanDiskusi: rows.map(
            i => Object.values(i.data)[0]
          )
        }) && m.redraw()
      })}
    ]
  })),

  // Diskusikan dengan AI
  state.discussAI && [
    m('h3', 'Diskusikan dengan AI'),
    m(autoForm({
      id: 'researchDiscuss',
      schema: {
        question: {
          type: String, label: 'Pertanyaan',
          autoform: {type: 'textarea'}
        }
      },
      submit: {value: 'Tanyakan'},
      action: doc => [
        (new state.aiModule.GoogleGenerativeAI(randomGemini()))
        .getGenerativeModel({model: 'gemini-2.5-flash'})
        .generateContent(promptRQA(state.bahanDiskusi, doc.question))
        .then(result => withAs(
          result.response.text(), answer => [
            localStorage.setItem('researchQA', `
              ${doc.question} \n\n ${answer}
            `), m.redraw()
          ]
        ))
      ]
    })),
    localStorage.researchQA && m('article.message',
      m('.message-body', m('p', m.trust(marked.parse(
        localStorage.researchQA
      ))))
    )
  ]
]

const promptRQA = (material, question) => `
  Please consider this set of citations:
  \n ${JSON.stringify(material, null, 2)}
  \n Then answer the following question:
  \n ${question}
`
