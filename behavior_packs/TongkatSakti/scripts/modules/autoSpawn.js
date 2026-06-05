import { ItemStack } from '@minecraft/server';

export class AutoSpawnManager {
  static initialize() {}

  static giveStaffOnSpawn(player) {
    try {
      const container = player.getComponent('minecraft:inventory').container;
      let has_tongkat = false;
      for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if (item?.typeId === 'tongkat:sakti') {
          has_tongkat = true;
          break;
        }
      }
      if (!has_tongkat) {
        const tongkat = new ItemStack('tongkat:sakti', 1);
        try {
          container.addItem(tongkat);
        } catch (e) {
          for (let i = 0; i < container.size; i++) {
            if (!container.getItem(i)) {
              container.setItem(i, tongkat);
              break;
            }
          }
        }
      }
    } catch (e) {}
  }
}