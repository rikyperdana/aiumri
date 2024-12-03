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
  ))?.[0] || 'Halo'