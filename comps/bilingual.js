comps.bilingual = x => [
  m('p', 'Sedang dalam pengembangan...'),
  m('h3', 'Percakapan Dua Bahasa'),
  m(autoForm({
    id: 'bilingual',
    schema: {
      target: {
        type: String, label: 'Bahasa tujuan',
        autoform: {type: 'select', options: x => [
          'English', 'Japan', 'Chinese', 'Arabic'
        ].map(lang => ({value: lang, label: lang}))}
      },
      message: {
        type: String, label: 'Pesan',
        autoform: {type: 'textarea', placeholder: 'Pesan'}
      }
    },
    submit: {value: 'Translate'}
  }))
]