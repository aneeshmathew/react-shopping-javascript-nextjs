import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const DEMO_USERS = [
  { id: "1", name: "Demo User", email: "demo@example.com", password: "password123" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "password123" },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
