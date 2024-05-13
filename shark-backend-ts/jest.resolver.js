module.exports = (path, options) => {
  const log = path.indexOf('src') !== -1

  // log && console.log(options.paths)

  const result = options.defaultResolver(path, {
    ...options,
    paths: [
      ...options.paths,
      './src'
    ],
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: pkg => {
      // console.log(pkg);

      return {
        ...pkg,
        // Alter the value of `main` before resolving the package
        main: pkg.module || pkg.main,
      };
    },
  });

  return result
};
