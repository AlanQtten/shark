export default function executeFunctionOrNot(target: any | (() => any)) {
  if (typeof target === 'function') {
    return target();
  }
  return target;
}
