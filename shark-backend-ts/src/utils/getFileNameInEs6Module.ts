import { fileURLToPath } from 'node:url';

export default function getFileNameInEs6Module(url) {
  return fileURLToPath(url || import.meta.url);
}
