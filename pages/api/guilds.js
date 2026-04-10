import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  const guilds = await response.json();
  const adminGuilds = guilds.filter(guild => (guild.permissions & 0x8) === 0x8);
  res.status(200).json(adminGuilds);
}
