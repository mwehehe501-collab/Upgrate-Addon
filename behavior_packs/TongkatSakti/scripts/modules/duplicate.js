import { ItemStack } from '@minecraft/server';
import { RaycastDetector } from './raycast.js';
import { InventoryManager } from './inventory.js';

export class DuplicateFeature {
  static MAX_DISTANCE = 10;
  static initialize() {}

  static duplicateItem(player, item) {
    try {
      const new_item = item.clone();
      const result = InventoryManager.addItemToInventory(player, new_item, 1);
      if (result.dropped.length > 0) {
        const drop_pos = player.location;
        result.dropped.forEach(drop_item => {
          player.dimension.spawnItem(drop_item, drop_pos);
        });
        return { success: true, dropped: true, amount: result.dropped[0]?.amount || 0, message: `§a✓ Duplikat berhasil!` };
      }
      return { success: true, dropped: false, message: `§a✓ Duplikat berhasil!` };
    } catch (e) {
      return { success: false, error: e.message, message: `§c✗ Gagal: ${e.message}` };
    }
  }

  static duplicateBlock(player, block) {
    try {
      const block_item = new ItemStack(block.typeId, 1);
      const result = InventoryManager.addItemToInventory(player, block_item);
      if (result.dropped.length > 0) {
        const drop_pos = player.location;
        result.dropped.forEach(drop_item => {
          player.dimension.spawnItem(drop_item, drop_pos);
        });
        return { success: true, dropped: true, amount: result.dropped[0]?.amount || 0, message: `§a✓ Blok duplikat!` };
      }
      return { success: true, dropped: false, message: `§a✓ Blok duplikat!` };
    } catch (e) {
      return { success: false, error: e.message, message: `§c✗ Gagal: ${e.message}` };
    }
  }

  static duplicateEntity(player, entity) {
    try {
      if (entity.typeId === 'minecraft:item') {
        const item_component = entity.getComponent('minecraft:item');
        if (item_component) return this.duplicateItem(player, item_component.itemStack);
      }
      const entity_name = entity.typeId.split(':')[1];
      const spawn_egg = new ItemStack(`minecraft:${entity_name}_spawn_egg`, 1);
      const result = InventoryManager.addItemToInventory(player, spawn_egg);
      if (result.dropped.length > 0) {
        const drop_pos = player.location;
        result.dropped.forEach(drop_item => {
          player.dimension.spawnItem(drop_item, drop_pos);
        });
        return { success: true, dropped: true, amount: result.dropped[0]?.amount || 0, message: `§a✓ Spawn egg duplikat!` };
      }
      return { success: true, dropped: false, message: `§a✓ Spawn egg duplikat!` };
    } catch (e) {
      return { success: false, error: e.message, message: `§c✗ Gagal: ${e.message}` };
    }
  }

  static duplicateLiquid(player, block) {
    try {
      let bucket_item = null;
      if (block.typeId === 'minecraft:flowing_water' || block.typeId === 'minecraft:water') {
        bucket_item = new ItemStack('minecraft:water_bucket', 1);
      } else if (block.typeId === 'minecraft:flowing_lava' || block.typeId === 'minecraft:lava') {
        bucket_item = new ItemStack('minecraft:lava_bucket', 1);
      }
      if (!bucket_item) return { success: false, error: 'Unknown', message: `§c✗ Cairan tidak dikenal` };
      const result = InventoryManager.addItemToInventory(player, bucket_item);
      if (result.dropped.length > 0) {
        const drop_pos = player.location;
        result.dropped.forEach(drop_item => {
          player.dimension.spawnItem(drop_item, drop_pos);
        });
        return { success: true, dropped: true, amount: result.dropped[0]?.amount || 0, message: `§a✓ Cairan duplikat!` };
      }
      return { success: true, dropped: false, message: `§a✓ Cairan duplikat!` };
    } catch (e) {
      return { success: false, error: e.message, message: `§c✗ Gagal: ${e.message}` };
    }
  }

  static duplicateFromWorld(player) {
    const objects = RaycastDetector.getObjectsInFront(player, this.MAX_DISTANCE);
    const options = [];
    objects.blocks.forEach((b) => {
      const is_liquid = b.block.typeId.includes('water') || b.block.typeId.includes('lava');
      options.push({ type: 'block', block: b.block, distance: b.distance, label: `${is_liquid ? '💧' : '🧱'} ${b.block.typeId} (${b.distance}m)` });
    });
    objects.entities.forEach((e) => {
      const is_item = e.entity.typeId === 'minecraft:item';
      options.push({ type: 'entity', entity: e.entity, distance: e.distance, label: `${is_item ? '📦' : '🦾'} ${e.entity.typeId}` });
    });
    return options;
  }

  static executeDuplicate(player, selectedObject) {
    if (selectedObject.type === 'block') {
      const is_liquid = selectedObject.block.typeId.includes('water') || selectedObject.block.typeId.includes('lava');
      return is_liquid ? this.duplicateLiquid(player, selectedObject.block) : this.duplicateBlock(player, selectedObject.block);
    } else if (selectedObject.type === 'entity') {
      return this.duplicateEntity(player, selectedObject.entity);
    }
    return { success: false, error: 'Unknown', message: `§c✗ Tipe tidak dikenal` };
  }
}