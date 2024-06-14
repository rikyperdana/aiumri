m.mount(document.body, mitGen({
  theme: localStorage.appTheme || 'default',
  brand: {name: 'home', full: 'AI UMRI'},
  start: {
    aichat: {full: 'AI Chat', icon: 'comments', comp: comps.aichat},
    bilingual: {full: 'Dwibahasa', icon: 'user-friends', comp: comps.bilingual},
    memories: {full: 'Memori', icon: 'brain', comp: comps.memories},
    guide: {full: 'Panduan', icon: 'chalkboard-teacher', comp: comps.guide},
    settings: {full: 'Pengaturan', icon: 'gear', comp: comps.settings}
  }
}))