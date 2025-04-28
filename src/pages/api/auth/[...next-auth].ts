import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _req) {
        // You can replace this with your real database/user check
        if (credentials?.email === 'test@example.com' && credentials?.password === 'password123') {
          return { id: '1', name: 'Test User', email: 'test@example.com' }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login', // Error page redirection
  },
  secret: process.env.NEXTAUTH_SECRET, // Needed for production
})

export { handler as GET, handler as POST }