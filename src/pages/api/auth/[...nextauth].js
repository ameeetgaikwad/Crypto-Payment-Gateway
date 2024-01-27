import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_ID,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
