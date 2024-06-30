comps.knowledge = x => [
  m('h3', 'Pohon Ilmu'),

  withAs(
    Object.entries(JSON.parse(
      localStorage.currentTree || '{}'
    ))[0],
    ([title, tree]) => m('article.message', [
      m('.message-header', m('p', title)),
      m('#ground', {oncreate: vnode =>
        vnode.dom.appendChild(renderjson(tree))
      })
    ])
  ),

  m(autoForm({
    id: 'knowledge',
    schema: {
      topic: {
        type: String, label: 'Topik',
      },
      language: {
        type: String, label: 'Bahasa',
        autoform: {type: 'select', options: x => [
          'Indonesia', 'English'
        ].map(i => ({value: i, label: i}))}
      },
      level: {
        type: String, label: 'Level Pemahaman',
        autoform: {type: 'select', options: x => [
          'Beginner', 'Intermediate', 'Advanced', 'Expert'
        ].map(i => ({value: i, label: i}))}
      }
    },
    layout: {top: [['topic', 'language', 'level']]},
    submit: {value: 'Buatkan'},
    action: doc => [
      Object.assign(state, {isLoading: true}),
      (new state.aiModule.GoogleGenerativeAI(randomGemini()))
      .getGenerativeModel({model: 'gemini-1.5-flash'})
      .generateContent(`
        Please create a deeply nested object in JSON format
        that best represents the knowledge about ${doc.topic}
        at the ${doc.level} level in ${doc.language} language.
        Please provide only the JSON with no entailing details.
      `)
      .then(result => [
        delete state.isLoading,
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
    ]
  }))
]