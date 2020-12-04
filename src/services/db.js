import Dexie from 'dexie'
const DB_NAME = 'chat-app';

const db = new Dexie(DB_NAME);
db.version(1).stores({
  chats: '&id, *host, *date',
  profile: '++id, name',
  answers: '++id, answers'
});

export default db