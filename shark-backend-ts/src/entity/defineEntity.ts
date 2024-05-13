export default function defineEntity({ entity: Entity, app }) {
  const entity = new Entity();

  Object.keys(entity).forEach((key) => {
    console.log(typeof entity[key]);
  });
  // const conditions =
}
