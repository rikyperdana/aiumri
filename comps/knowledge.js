comps.knowledge = x => [
  m('h3', 'Pohon Ilmu'),

  withAs(
    JSON.parse(localStorage.currentTree || '{}'),
    tree => Object.keys(tree).length > 0
    && m('article.message', [
      m('.message-header', m('p', localStorage.treeTitle)),
      m('#ground', {oncreate: vnode =>
        vnode.dom.appendChild(renderjson(tree))
      })
    ])
  ),

  m(autoForm({
    id: 'knowledge',
    schema: {topic: {
      type: String, autoform: {
        help: 'Disarankan dalam English'
      }
    }},
    submit: {
      value: 'Create',
      class: state.isLoading ?
        'is-loading is-info' : 'is-info'
    },
    action: doc => [
      Object.assign(state, {isLoading: true}),
      (new state.aiModule.GoogleGenerativeAI(randomGemini()))
      .getGenerativeModel({model: 'gemini-1.5-flash'})
      .generateContent(`
        Please create a deeply nested object in JSON format
        that best represents the knowledge about "${doc.topic}"
        as deep as your brain allows to. Please provide only
        the JSON with no entailing details.
      `)
      .then(result => [
        delete state.isLoading,
        localStorage.setItem(
          'treeTitle', doc.topic
        ),
        localStorage.setItem(
          'currentTree',
          JSON.stringify(JSON.parse(
            result.response.text()
            .replaceAll('\n', '')
            .replaceAll('  ', '')
            .split('```')[1]
            .substr(4) || '{}'
          )),
        ),
        m.redraw()
      ])
    ],
    buttons: localStorage.currentTree && [
      {label: 'Reset', opt: {
        class: 'is-warning',
        onclick: e => confirm('Yakin reset pohon ini?')
        && [
          e.preventDefault(),
          localStorage.removeItem('treeTitle'),
          localStorage.removeItem('currentTree'),
          m.redraw(), scroll(0, 0)
        ]
      }},
      {label: 'Simpan', opt: {
        class: 'is-success',
        onclick: e => [
          e.preventDefault(),
          localStorage.setItem(
            'forest', JSON.stringify(Object.assign(
              JSON.parse(localStorage.forest || '{}'),
              {[localStorage.treeTitle]: localStorage.currentTree}
            ))
          ),
          alert('Pohon berhasil disimpan'),
          m.redraw(), scroll(0, 0)
        ]
      }}
    ]
  })),

  m('h3', 'Kebun Ilmu'),
  m(autoTable({
    id: 'forest',
    heads: {
      open: 'Lanjut',
      title: 'Judul',
      remove: 'Hapus'
    },
    rows: Object.entries(JSON.parse(
      localStorage.forest || '{}'
    )).map(([title, content]) => ({
      data: {title, content},
      row: {
        title,
        open: m(
          '.button.is-small.is-rounded.is-primary',
          {onclick: x => [
            localStorage.setItem('treeTitle', title),
            localStorage.setItem('currentTree', content),
            m.redraw()
          ]},
          m('span.icon', m('i.fas.fa-arrow-right'))
        ),
        remove: m(
          '.button.is-small.is-rounded.is-danger',
          {onclick: x => confirm('Yakin hapus pohon ini?') && [
            localStorage.setItem('forest', JSON.stringify(
              _.omit(JSON.parse(localStorage.forest || '{}'), title)
            )),
            m.redraw()
          ]},
          m('span.icon', m('i.fas.fa-times'))
        )
      }
    })),
    onclick: x => null
  }))
]