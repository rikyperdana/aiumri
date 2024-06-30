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
          result.response.text()
          .replaceAll('\n', '')
          .replaceAll('  ', '')
          .split('```')[1]
          .substr(4)
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
    ]
  }))
]