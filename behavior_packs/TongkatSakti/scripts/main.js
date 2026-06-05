import { world, system } from '@minecraft/server';
import { UIHandler } from './modules/ui.js';
import { DuplicateFeature } from './modules/duplicate.js';
import { AutoSpawnManager } from './modules/autoSpawn.js';

function initializeTongkatSakti() {
  try {
    world.sendMessage('§a[Tongkat Sakti] Initializing...');
    AutoSpawnManager.initialize();
    DuplicateFeature.initialize();
    UIHandler.initialize();
    world.sendMessage('§a[Tongkat Sakti] ✓ Loaded!');
  } catch (e) {
    world.sendMessage(`§c[Tongkat Sakti] ✗ Error: ${e.message}`);
  }
}

world.afterEvents.playerInteractWithItem.subscribe(event => {
  try {
    const player = event.player;
    const item = event.itemStack;
    if (item?.typeId === 'tongkat:sakti') {
      UIHandler.showMainMenu(player);
    }
  } catch (e) {
    console.error(`[Tongkat Sakti] Error: ${e.message}`);
  }
});

world.afterEvents.playerSpawn.subscribe(event => {
  try {
    const player = event.player;
    system.runTimeout(() => {
      AutoSpawnManager.giveStaffOnSpawn(player);
    }, 5);
  } catch (e) {
    console.error(`[Tongkat Sakti] Error: ${e.message}`);
  }
});

initializeTongkatSakti();