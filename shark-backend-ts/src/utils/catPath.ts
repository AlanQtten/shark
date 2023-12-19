export default function catPath(path) {
  return path.startsWith('/') ? path : `/${path}`;
}
