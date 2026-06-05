export class RaycastDetector {
  static getBlocksInFront(player, distance = 10) {
    const eye = player.getHeadLocation();
    const direction = player.getViewDirection();
    const blocks = [];
    for (let i = 1; i <= distance; i++) {
      const pos = {
        x: Math.floor(eye.x + direction.x * i),
        y: Math.floor(eye.y + direction.y * i),
        z: Math.floor(eye.z + direction.z * i)
      };
      try {
        const block = player.dimension.getBlock(pos);
        if (block && block.typeId !== 'minecraft:air') {
          blocks.push({ pos, block, distance: i });
        }
      } catch (e) {}
    }
    return blocks;
  }

  static getEntitiesInFront(player, distance = 10) {
    const eye = player.getHeadLocation();
    const direction = player.getViewDirection();
    const entities = [];
    try {
      const entities_nearby = player.dimension.getEntities({
        location: eye,
        maxDistance: distance,
        excludeNames: [player.name]
      });
      entities_nearby.forEach(entity => {
        const entity_pos = entity.location;
        const to_entity = {
          x: entity_pos.x - eye.x,
          y: entity_pos.y - eye.y,
          z: entity_pos.z - eye.z
        };
        const distance_to = Math.sqrt(to_entity.x ** 2 + to_entity.y ** 2 + to_entity.z ** 2);
        if (distance_to <= distance) {
          entities.push({ entity, distance: distance_to });
        }
      });
    } catch (e) {}
    return entities.sort((a, b) => a.distance - b.distance);
  }

  static getObjectsInFront(player, distance = 10) {
    const blocks = this.getBlocksInFront(player, distance);
    const entities = this.getEntitiesInFront(player, distance);
    return { blocks, entities };
  }
}