interface Array<T> {
  asyncReduce: (
    asyncCallback: (preResult: T, item: T, index: number) => Promise<T>,
    initValue?: T
  ) => Promise<T>
}
