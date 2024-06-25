const sum = arr => arr.reduce((a, b) => a + b)

comps.memories = x => [
  m('h3', 'Memori Percakapan AI'),
  m(autoTable({
    id: 'catatan',
    heads: {
      lanjut: 'Lanjut',
      tentang: 'Judul',
      trade: 'Chat',
      words: 'Kata',
      mulai: 'Mulai',
      terbaru: 'Terbaru',
      hapus: 'Hapus'
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
        trade: content.threads.length,
        words: sum(content.threads.map(
          thread => thread.message.split(' ').length
        )),
        lanjut: m('.button.is-small.is-rounded.is-primary', {
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
        }, m('span.icon', m('i.fas.fa-arrow-right'))),
        hapus: m('.button.is-small.is-rounded.is-danger', {
          onclick: x => confirm('Yakin hapus percakapan ini?') && (
            withAs(JSON.parse(localStorage.memories), mems => [
              delete mems[id],
              localStorage.setItem(
                'memories', JSON.stringify(mems)
              ),
              m.redraw()
            ])
          )
        }, m('span.icon', m('i.fas.fa-times')))
      }
    }))
  }))
]