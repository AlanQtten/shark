export default function transformEntityToJson(results) {
  if (!results || !results.length) {
    return [];
  }

  const keyMap = Object.keys(results[0]).reduce((km, key) => {
    const transferKey = key.split('_').map((letter, i) => (i === 0
      ? letter
      : `${letter[0].toUpperCase()}${letter.slice(1)}`)).join('');

    km.set(key, transferKey);

    return km;
  }, new Map());

  return results.map((row) => Object.keys(row).reduce((p, k) => {
    p[keyMap.get(k)] = row[k];

    return p;
  }, {}));
}
