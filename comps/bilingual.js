comps.bilingual = x => [
  m('h3', 'Percakapan Multi Bahasa'),

  // Threads of interactions
  JSON.parse(localStorage.conversation || '[]')
  .map(thread => m(
    'article.message',
    {class: [
      localStorage.fontSize,
      thread.role === 'user' && 'is-primary'
    ].join(' ')},
    m('.message-body', m('p', m.trust(marked.parse([
      thread.message, thread.translated
    ].join('\n\n')))))
  )),

  // Prompt Form
  m(autoForm({
    id: 'bilingual',
    schema: {
      target: {
        type: String, label: 'Bahasa tujuan / Target Language',
        autoform: {type: 'select', options: x => [
          'Indonesia',
          'English', 'Japanese', 'Chinese', 'Arabic',
          'Korean', 'Thailand', 'Malay', 'Vietnamese'
        ].map(lang => ({value: lang, label: lang}))}
      },
      message: {
        type: String, label: 'Pesan',
        autoform: {
          type: 'textarea', placeholder: 'Pesan',
          loading: state.isLoading
        }
      }
    },
    submit: {value: 'Translate'},
    action: doc => [
      Object.assign(state, {isLoading: true}),
      (new state.aiModule.GoogleGenerativeAI(randomGemini()))
      .getGenerativeModel({model: 'gemini-1.5-flash'})
      .generateContent(`
        Please translate the following text to ${doc.target}
        with no entailing details. "${doc.message}"
        Please provide the Latin spelling if the result is
        in non-Latin
      `)
      .then(result => [
        localStorage.setItem(
          'conversation',
          JSON.stringify([
            ...JSON.parse(localStorage.conversation || '[]'),
            {...doc, translated: result.response.text()}
          ])
        ),
        delete state.isLoading,
        m.redraw()
      ])
    ],
    buttons: localStorage.conversation && [
      {label: 'Reset', opt: {
        class: 'is-warning',
        onclick: e => confirm('Yakin kosongkan percakapan?')
        && [
          e.preventDefault(),
          localStorage.removeItem('conversation'),
          m.redraw(), scroll(0, 0)
        ]
      }},
      {label: 'Simpan', opt: {
        class: 'is-success',
        onclick: e => alert('Coming soon...')
      }}
    ]
  }))
]