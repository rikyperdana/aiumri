const sum = arr => arr.reduce((a, b) => a + b)

comps.memories = x => m('.container', [
  m('h3', 'Memori Percakapan AI'),
  m(autoTable({
    id: 'catatan',
    heads: {
      tanggal: 'Mulai',
      tentang: 'Judul',
      trade: 'Interaksi',
      words: 'Panjang',
      aksi: 'Aksi'
    },
    rows: Object.entries(
      JSON.parse(localStorage.memories || '[]')
    ).map(([id, content]) => ({
      data: {...content, id},
      row: {
        tanggal: new Date(
          content.threads[0].requestTime
        ).toLocaleDateString('en-gb'),
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
              Object.assign(mgState, {
                comp: comps.aichat
              }),
              m.redraw()
            ]
          }, 'Lanjut'),
          m('.button.is-small.is-rounded.is-danger', {
            onclick: x => confirm('Yakin hapus percakapan ini?') &&
              withAs(JSON.parse(localStorage.memories), mems => [
                delete mems[id],
                localStorage.setItem(
                  'memories', JSON.stringify(mems)
                ),
                m.redraw()
              ])
          }, 'Hapus')
        ])
      }
    })),
    onclick: console.log
  }))
])