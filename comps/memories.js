const sum = arr => arr.reduce((a, b) => a + b)

comps.memories = x => [
  m('h3', 'Memori Percakapan AI'),
  m(autoTable({
    id: 'catatan',
    heads: {
      mulai: 'Mulai',
      terbaru: 'Terbaru',
      tentang: 'Judul',
      trade: 'Interaksi',
      words: 'Panjang',
      aksi: 'Aksi'
    },
    search: true,
    onclick: console.log,
    rows: Object.entries(
      JSON.parse(localStorage.memories || '[]')
    ).map(([id, content]) => ({
      data: {...content, id},
      row: {
        mulai: new Date(
          content.threads[0].requestTime
        ).toLocaleDateString('en-gb'),
        terbaru: new Date(withAs(
          _.last(content.threads),
          last => ors([last.responseTime, last.requestTime])
        )).toLocaleDateString('en-gb'),
        tentang: content.title,
        trade: content.threads.length + ' kali',
        words: sum(content.threads.map(
          thread => thread.message.split(' ').length
        )) + ' kata',
        aksi: m('.buttons', [
          m('.button.is-small.is-rounded.is-info', {
            onclick: x => [
              localStorage.setItem(
                'threads',
                JSON.stringify(content.threads)
              ),
              localStorage.setItem(
                'currentThreads',
                JSON.stringify({...content, id})
              ),
              Object.assign(mgState, {
                comp: comps.aichat
              }),
              m.redraw()
            ]
          }, 'Lanjut'),
          m('.button.is-small.is-rounded.is-danger', {
            onclick: x => confirm('Yakin hapus percakapan ini?') && (
              withAs(JSON.parse(localStorage.memories), mems => [
                delete mems[id],
                localStorage.setItem(
                  'memories', JSON.stringify(mems)
                ),
                m.redraw()
              ])
            )
          }, 'Hapus')
        ])
      }
    }))
  }))
]