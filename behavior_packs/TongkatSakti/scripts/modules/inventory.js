export class InventoryManager {
  static getDuplicatableItems(player) {
    const items = [];
    try {
      const container = player.getComponent('minecraft:inventory').container;
      for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if (item) {
          items.push({ slot: i, typeId: item.typeId, amount: item.amount, nameTag: item.nameTag, item: item });
        }
      }
    } catch (e) {}
    return items;
  }

  static addItemToInventory(player, item, amount = 1) {
    const dropped = [];
    try {
      const container = player.getComponent('minecraft:inventory').container;
      for (let i = 0; i < container.size; i++) {
        const slot_item = container.getItem(i);
        if (!slot_item) {
          const new_item = item.clone();
          new_item.amount = amount;
          container.setItem(i, new_item);
          return { dropped: [] };
        } else if (slot_item.typeId === item.typeId && slot_item.canStackWith(item)) {
          const max_stack = item.getMaxAmount();
          const space = max_stack - slot_item.amount;
          if (space >= amount) {
            slot_item.amount += amount;
            return { dropped: [] };
          } else {
            slot_item.amount = max_stack;
            amount -= space;
          }
        }
      }
      if (amount > 0) {
        const drop_item = item.clone();
        drop_item.amount = amount;
        dropped.push(drop_item);
      }
    } catch (e) {}
    return { dropped };
  }
}