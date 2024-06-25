comps.knowledge = x => [
  m('p', 'Sedang dalam pengembangan...'),
  m('h3', 'Pohon Ilmu'),
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
    action: doc => [
      (new state.aiModule.GoogleGenerativeAI(randomGemini()))
      .getGenerativeModel({model: 'gemini-1.5-flash'})
      .generateContent(`
        Please create a deeply nested object in JSON format
        that best represents the knowledge about ${doc.topic}
        at the ${doc.level} level in ${doc.language} language.
        Please provide only the JSON with no entailing details.
      `)
      .then(result => [
        localStorage.setItem(
          'currentTree',
          JSON.parse(
            result.response.text()
            .replaceAll('\n', '')
            .replaceAll('  ', '')
            .split('```')[1]
            .substr(4)
          )
        )
      ])
    ]
  }))
]