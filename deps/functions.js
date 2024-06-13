const
between = (low, mid, high) =>
  low <= mid && mid <= high,

timeGreet = timestamp =>
  Object.entries({
    pagi: [ 1, 10], siang: [10, 14],
    sore: [15, 17], malam: [18, 23]
  }).find(phase => between(
    phase[1][0],
    (new Date(timestamp)).getHours(),
    phase[1][1]
  ))?.[0] || 'Halo',

randomGemini = x => 'AIzaSy' + _.sample([
  'AJtBqTGbKE7CLz577pi2RUt1wXcNAL_wc',
  'CMoGsXqVKSqH238t467wWDXX9dcCKaGuw',
  'DMMY2UNQgsuaBr40RuIhJC90BofT1895A',
  'CIA-T4MXvjFTHHct8tr1WSAp_Nb67X7Ds',
  'DsfU8jR854LxOkNnvAYlmOGFC1BMaDxko',
  'CfRKZ52ECnoHwNuZWGoGXJBcOf3KCX9mg'
])
