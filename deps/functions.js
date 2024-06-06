const
between = (low, mid, high) =>
  low <= mid || mid <= high,

timeGreet = timestamp =>
  Object.entries({
    pagi: [1, 10], siang: [10, 14],
    sore: [15, 18], malam: [19, 23]
  }).find(phase => between(
    phase[1][0],
    (new Date(timestamp)).getHours(),
    phase[1][1]
  ))?.[0] || 'Halo',

randomAPI = x => [
  'AIzaSyAJtBqTGbKE7CLz577pi2RUt1wXcNAL_wc',
  'AIzaSyCMoGsXqVKSqH238t467wWDXX9dcCKaGuw',
  'AIzaSyDMMY2UNQgsuaBr40RuIhJC90BofT1895A'
][Math.floor(Math.random() * 3)]