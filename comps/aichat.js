import('https://esm.run/@google/generative-ai').then
(module => Object.assign(state, {aiModule: module}))

const
randomId = x => Math.random().toString(36).slice(2)

comps.aichat = x => [
  m('h3', 'Mari berbincang'),

  // Threads of interactions
  JSON.parse(localStorage.threads || '[]')
  .map(thread => m(
    'article.message',
    {class: [
      localStorage.fontSize,
      thread.role === 'user' && 'is-primary'
    ].join(' ')},
    m('.message-body', m('p', m.trust(
      marked.parse(thread.message)
    )))
  )),

  // Prompt Input
  state.aiModule && m(autoForm({
    id: 'aichat',
    schema: {message: {
      type: String, label: ' ',
      optional: true, autoform: {
        type: 'textarea', loading: state.isLoading,
        placeholder: 'Pertanyaan'
      },
    }},
    action: doc => doc.message && withAs({
      threads: JSON.parse(localStorage.threads || '[]'),
      query: {...doc, role: 'user', requestTime: +(new Date())}
    }, ({threads, query, key}) => [
      Object.assign(state, {isLoading: true}),
      localStorage.setItem('threads', JSON.stringify([
        ...threads, query, {message: '...berfikir', role: 'model'}
      ])),
      (new state.aiModule.GoogleGenerativeAI(randomGemini()))
      .getGenerativeModel({model: 'gemini-1.5-flash'})
      .startChat({
        generateConfig: {maxOutputTokens: 100},
        history: threads.map(thread => ({
          parts: [{text: thread.message}],
          role: thread.role
        }))
      })
      .sendMessageStream(query.message)
      .then(({stream}) => {
        let messagePool = ''
        const loopNext = setInterval(x => (
          stream.next().then(({done, value}) => [
            done ? [
              clearInterval(loopNext),
              delete state.isLoading
            ] : messagePool += value.text(),
            localStorage.setItem('threads', JSON.stringify([
              ..._.initial(JSON.parse(
                localStorage.threads || '[]'
              )),
              {
                message: messagePool, role: 'model',
                responseTime: +(new Date())
              }
            ])),
            m.redraw()
          ])
        ))
      })
    ]),
    submit: {value: 'Kirim'},
    buttons: localStorage.threads && [
      {label: 'Reset', opt: {
        class: 'is-warning',
        onclick: e => confirm('Yakin kosongkan percakapan?')
        && [
          e.preventDefault(),
          localStorage.removeItem('threads'),
          localStorage.removeItem('currentThreads'),
          m.redraw(), scroll(0, 0)
        ]
      }},
      {label: 'Simpan', opt: {
        class: 'is-success',
        onclick: e => [
          e.preventDefault(),
          localStorage.setItem(
            'memories', JSON.stringify(Object.assign(
              JSON.parse(localStorage.memories || '{}'),
              {[ors([
                JSON.parse(
                  localStorage.currentThreads || '{}'
                )?.id,
                randomId()
              ])]: {
                title: (
                  JSON.parse(
                    localStorage.currentThreads || '{}'
                  )?.title || prompt('Apa judul pembicaraan ini?')
                ),
                threads: ors([
                  state.currentThreads?.threads,
                  JSON.parse(localStorage.threads || '[]')
                ])
              }}
            ))
          ),
          Object.assign(mgState, {comp: comps.memories}),
          m.redraw()
        ]
      }}
    ]
  }))
]