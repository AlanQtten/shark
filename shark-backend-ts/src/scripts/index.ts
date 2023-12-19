Array.prototype.asyncReduce = async function asyncReduce(cb, initValue) {
  const arr = this;
  const l = arr.length;

  const hasInit = initValue !== undefined;

  let preResult = hasInit ? initValue : this[0];

  for (
    let i = hasInit ? 0 : 1;
    i < l;
    i++
  ) {
    preResult = await cb(preResult, arr[i], i);
  }

  return preResult;
};
