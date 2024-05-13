import { dirname } from 'node:path';
import getFileNameInEs6Module from 'utils/getFileNameInEs6Module';

export default function getDirNameInEs6Module(url) {
  const __fileName = getFileNameInEs6Module(url);

  return dirname(__fileName);
}
