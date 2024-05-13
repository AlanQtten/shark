import defineEntity from '@/entity/defineEntity';
import user from '@/entity/user/user';

export default function defineEntityGroup({ app }) {
  defineEntity({
    entity: user,
    app,
  });
}
