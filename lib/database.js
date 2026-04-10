import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}
const db = admin.firestore();

export class Database {
  async getGuildConfig(guildId) {
    const doc = await db.collection("guilds").doc(String(guildId)).get();
    return doc.exists ? doc.data() : {};
  }

  async saveGuildConfig(guildId, config) {
    await db.collection("guilds").doc(String(guildId)).set(config, { merge: true });
  }
}
