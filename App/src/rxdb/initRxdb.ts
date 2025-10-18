// RxDB initialization using Dexie (IndexedDB) storage

import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxJsonSchema } from 'rxdb';
import { validatePlugin } from 'rxdb/plugins/validate';
import { replicationPlugin } from 'rxdb/plugins/replication';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

// Add optional plugins
addRxPlugin(validatePlugin);
addRxPlugin(replicationPlugin);
addRxPlugin(RxDBUpdatePlugin);

// --------------------
// 1️⃣ Define the client schema
// --------------------
export const clientSchema: RxJsonSchema = {
    title: 'Client schema',
    version: 1,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string' },
        fullName: { type: 'string' },
        email: { type: ['string', 'null'] },
        phoneNumber: { type: ['string', 'null'] },
        address: { type: ['string', 'null'] },
        notes: { type: ['string', 'null'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: ['string', 'null'], format: 'date-time' },
        lastModified: { type: 'string', format: 'date-time' },
        revision: { type: 'integer' },
    },
    required: ['id', 'fullName', 'createdAt', 'updatedAt', 'lastModified', 'revision'],
    indexes: ['fullName', 'updatedAt'],
};

// --------------------
// 2️⃣ Initialize RxDB database
// --------------------
export async function initRxDB() {
    const db = await createRxDatabase({
        name: 'localdb',              // database name in browser IndexedDB
        storage: getRxStorageDexie(), // Dexie storage
        multiInstance: true,          // multi-tab support
        eventReduce: true,            // performance optimization
    });

    await db.addCollections({
        clients: { schema: clientSchema },
    });

    return db;
}
