export const executeFnOrNot = (target: any, ...args: any[]) => {
  if (typeof target === 'function') {
    return target(...args)
  }
  return target
}
