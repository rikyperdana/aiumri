comps.settings = x => m('.container', [
  m('h3', 'Pengaturan'),
  m(autoForm({
    id: 'themeSelection',
    schema: {theme: {
      type: String, label: 'Pilihan Tema',
      autoform: {type: 'select', options: x => [
        'default', 'cerulean', 'cosmo', 'cyborg', 'darkly',
        'flatly', 'journal', 'litera', 'lumen', 'lux',
        'materia', 'minty', 'nuclear', 'pulse', 'sandstone',
        'simplex', 'slate', 'solar', 'spacelab', 'superhero',
        'united', 'yeti'
      ].map(theme => ({
        value: theme,
        label: _.startCase(theme)
      }))}
    }},
    submit: {value: 'Pilih'},
    action: doc => [
      localStorage.setItem('appTheme', doc.theme),
      window.location.reload()
    ],
    buttons: [{label: 'Galeri', opt: {
      class: 'is-success', onclick: e => [
        e.preventDefault(), window.open(
          'https://github.com/rikyperdana/simrs/wiki/Theme-Gallery',
          '_blank'
        )
      ]
    }}]
  }))
])