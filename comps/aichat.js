import('https://esm.run/@google/generative-ai').then
(module => Object.assign(state, {aiModule: module}))

const
randomId = x => Math.random().toString(36).slice(2),
askGemini = (history, message, cb) =>
  (new state.aiModule.GoogleGenerativeAI(randomGemini()))
  .getGenerativeModel({model: 'gemini-1.5-flash'})
  .startChat({
    generateConfig: {maxOutputTokens: 100},
    history: history.map(thread => ({
      parts: [{text: thread.message}],
      role: thread.role
    }))
  }).sendMessage(message)
  .then(result => cb(result.response.text()))

comps.aichat = x => m('.container', [
  m('h3', 'Mari berbincang'),

  // Threads of interactions
  JSON.parse(localStorage.threads || '[]')
  .map(thread => m(
    `article.message.is-${({
      user: 'primary', model: 'info'
    })[thread.role]}`,
    m('.message-body', m(
      'p.has-text-left',
      m.trust(markdown.toHTML(thread.message))
    ))
  )),

  // Prompt Input
  state.aiModule && m(autoForm({
    id: 'aichat',
    schema: {message: {
      type: String, label: 'Pertanyaan', optional: true,
      autoform: {type: 'textarea', loading: state.isLoading},
    }},
    action: doc => withAs({
      key: localStorage.geminiKey,
      threads: JSON.parse(localStorage.threads || '[]'),
      query: {...doc, role: 'user', requestTime: +(new Date())}
    }, ({threads, query, key}) => [
      Object.assign(state, {isLoading: true}),
      localStorage.setItem('threads', JSON.stringify([
        ...threads, query
      ])),
      askGemini(threads, query.message, answer => [
        delete state.isLoading,
        localStorage.setItem(
          'threads', JSON.stringify([
            ...JSON.parse(localStorage.threads || '[]'),
            {
              message: answer, role: 'model',
              responseTiem: +(new Date())
            }
          ])
        ),
        m.redraw()
      ])
    ]),
    submit: {value: 'Kirim'},
    buttons: [
      {label: 'Reset', opt: {
        class: 'is-warning',
        onclick: e => confirm('Yakin kosongkan percakapan?')
        && [
          e.preventDefault(),
          localStorage.removeItem('threads'),
          m.redraw(), scroll(0, 0)
        ]
      }},
      localStorage.threads && {label: 'Simpan', opt: {
        class: 'is-success',
        onclick: e => [
          e.preventDefault(),
          withAs(ors([
            JSON.parse(localStorage.currentThreads || '[]')?.title,
            prompt('Apa judul pembicaraan ini?'),
          ]),
          judul => [
            localStorage.setItem(
              'memories', JSON.stringify(Object.assign(
                JSON.parse(localStorage.memories || '{}'),
                {[ors([
                  state.currentThreads?.id, randomId()])
                ]: {title: judul, threads: ors([
                  state.currentThreads?.threads,
                  JSON.parse(localStorage.threads || '[]')
                ])}}
              ))
            ),
            Object.assign(mgState, {comp: comps.memories}),
            m.redraw()
          ])
        ]
      }}
    ]
  }))
])