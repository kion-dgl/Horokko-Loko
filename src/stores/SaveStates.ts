import { type MapStore, map } from 'nanostores';
import localForage from 'localforage';

// Define the structure for individual save state entries
export interface SaveStateEntry {
    systemMemory: ArrayBuffer;
    frameBuffer: ArrayBuffer;
}

// Define the structure for the save state map, which uses an id as a key
export type SaveStateMap = MapStore<{ [id: string]: SaveStateEntry }>;

// Create a nanostore map for save states
export const saveStates: SaveStateMap = map({});

// Function to add a save state, with proper typing
export async function addSaveState({ id, systemMemory, frameBuffer }: SaveStateEntry & { id: string }): Promise<void> {
    // Directly set or update the key-value pair
    const newEntry: SaveStateEntry = { systemMemory, frameBuffer };
    saveStates.setKey(id, newEntry);
    await localForage.setItem(id, newEntry);
}

// Function to restore state from localForage on page load
export async function restoreSaveStates(): Promise<void> {
    const keys = await localForage.keys();
    for (const key of keys) {
        const saveStateEntry = await localForage.getItem<SaveStateEntry>(key);
        if (saveStateEntry) {
            saveStates.setKey(key, saveStateEntry);
        }
    }
}

// Call restoreSaveStates when the app or page initializes
restoreSaveStates();