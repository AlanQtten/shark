import type { Entity2ServiceMap } from 'types/service';

type e2sGenerator = () => Entity2ServiceMap

export default function defineE2SMap(e2sg: e2sGenerator) {
  return e2sg();
}
