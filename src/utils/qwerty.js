export const qwertyToKeyMap = {
  z: 'C',
  s: 'C#',
  x: 'D',
  d: 'D#',
  c: 'E',
  v: 'F',
  g: 'F#',
  b: 'G',
  h: 'G#',
  n: 'A',
  j: 'A#',
  m: 'B',
}

export const characterToNoteNameMap = Object.keys(qwertyToKeyMap).reduce((acc, key) => {
  acc[qwertyToKeyMap[key]] = key;
  return acc;
}, {});