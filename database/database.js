import sqlite from 'sqlite3';
import { open } from 'sqlite';

async function init() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite.Database,
    });

    await db.migrate({ migrationsPath: './migrations' });
    return db;
}

const dbConnect = init();

export async function listMessages() {
    const db = await dbConnect;
    return db.all('SELECT * FROM Messages ORDER BY time DESC LIMIT 10');
}

export async function findMessage(id) {
    const db = await dbConnect
    return db.all('SELECT * FROM Messages WHERE id =?', id)
}