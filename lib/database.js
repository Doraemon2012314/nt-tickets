import admin from "firebase-admin";

export class Database {
  constructor() {
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(
            JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
          ),
        });
      } catch (error) {
        console.error("Firebase admin initialization error", error);
      }
    }
    this.db = admin.firestore();
  }

  async getGuildConfig(guildId) {
    const doc = await this.db.collection("guilds").doc(String(guildId)).get();
    return doc.exists ? doc.data() : {};
  }

  async saveGuildConfig(guildId, config) {
    await this.db.collection("guilds").doc(String(guildId)).set(config, { merge: true });
  }
}
