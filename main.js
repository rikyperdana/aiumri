m.mount(document.body, mitGen({
  theme: localStorage.appTheme || 'default',
  brand: {name: 'home', full: 'AI UMRI'},
  start: {
    aichat: {full: 'Tanya AI', icon: 'comments', comp: comps.aichat},
    memories: {full: 'Memori', icon: 'brain', comp: comps.memories},
    bilingual: {full: 'Bilingual', icon: 'user-friends', comp: comps.bilingual},
    knowledge: {full: 'Pohon Ilmu', icon: 'tree', comp: comps.knowledge},
    // research: {full: 'Teman Riset', icon: 'book-reader', comp: comps.research},
    guide: {full: 'Panduan', icon: 'chalkboard-teacher', comp: comps.guide},
    settings: {full: 'Pengaturan', icon: 'gear', comp: comps.settings},
  }
}))