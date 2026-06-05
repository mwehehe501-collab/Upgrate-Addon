import { ActionFormData } from '@minecraft/server-ui';
import { DuplicateFeature } from './duplicate.js';
import { InventoryManager } from './inventory.js';

export class UIHandler {
  static initialize() {}

  static async showMainMenu(player) {
    const form = new ActionFormData();
    form.title('§6Tongkat Sakti - Menu');
    form.body('§7Pilih fitur:');
    form.button('§a📦 Duplikat\nInventory');
    form.button('§b🌍 Duplikat\nDunia');
    form.button('§e💡 Info');
    form.button('§c❌ Tutup');
    try {
      const response = await form.show(player);
      if (response.canceled) return;
      switch (response.selection) {
        case 0: await this.showInventoryDuplicate(player); break;
        case 1: await this.showWorldDuplicate(player); break;
        case 2: await this.showInfo(player); break;
      }
    } catch (e) {
      player.sendMessage(`§c[Error] ${e.message}`);
    }
  }

  static async showInventoryDuplicate(player) {
    const items = InventoryManager.getDuplicatableItems(player);
    if (items.length === 0) {
      player.sendMessage('§c✗ Inventory kosong!');
      return;
    }
    const form = new ActionFormData();
    form.title('§6Duplikat Inventory');
    form.body('§7Pilih item:');
    items.forEach(item => {
      form.button(`§a${item.typeId}\n§7x${item.amount}`);
    });
    form.button('§c↩ Kembali');
    try {
      const response = await form.show(player);
      if (response.canceled) return;
      if (response.selection === items.length) {
        await this.showMainMenu(player);
        return;
      }
      const result = DuplicateFeature.duplicateItem(player, items[response.selection].item);
      player.sendMessage(result.message);
    } catch (e) {
      player.sendMessage(`§c[Error] ${e.message}`);
    }
  }

  static async showWorldDuplicate(player) {
    const options = DuplicateFeature.duplicateFromWorld(player);
    if (options.length === 0) {
      player.sendMessage('§c✗ Tidak ada objek dalam 10 blok!');
      return;
    }
    const form = new ActionFormData();
    form.title('§6Duplikat Dunia');
    form.body('§7Pilih objek:');
    options.forEach(opt => {
      form.button(opt.label);
    });
    form.button('§c↩ Kembali');
    try {
      const response = await form.show(player);
      if (response.canceled) return;
      if (response.selection === options.length) {
        await this.showMainMenu(player);
        return;
      }
      const result = DuplicateFeature.executeDuplicate(player, options[response.selection]);
      player.sendMessage(result.message);
    } catch (e) {
      player.sendMessage(`§c[Error] ${e.message}`);
    }
  }

  static async showInfo(player) {
    const form = new ActionFormData();
    form.title('§6Info');
    form.body('§7Tongkat Sakti v1.0\n\n§a✓ Unlimited Duplicate\n§a✓ Inventory & World Mode\n§a✓ Smart Stacking');
    form.button('§c↩ Kembali');
    try {
      const response = await form.show(player);
      if (!response.canceled && response.selection === 0) {
        await this.showMainMenu(player);
      }
    } catch (e) {}
  }
}