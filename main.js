m.mount(document.body, mitGen({
  brand: {name: 'home', full: 'AI UMRI'},
  start: {
    aichat: {full: 'AI Chat', icon: 'comments', comp: comps.aichat},
    memories: {full: 'Memori', icon: 'brain', comp: comps.memories},
    guide: {full: 'Panduan', icon: 'chalkboard-teacher', comp: comps.guide}
  }
}))