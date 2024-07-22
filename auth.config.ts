import { defineConfig } from 'auth-astro'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

import BlessingSkin from '@/lib/auth/blessing-skin.provider'

const prisma = new PrismaClient()

const BlessingSkinHost = 'https://skin.mualliance.ltd'

export default defineConfig({
  debug: true,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    BlessingSkin({
      host: BlessingSkinHost,
      scope: ['User.Read', 'Player.Read'],
      clientId: process.env.AUTH_BLESSING_SKIN_ID,
      clientSecret: process.env.AUTH_BLESSING_SKIN_SECRET,
      style: {
        logo: 'https://www.mualliance.cn/wp-content/uploads/2023/01/cropped-mualogo_512_tm-192x192.png',
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const [blessingSkinAccount] = await prisma.account.findMany({
        where: {
          userId: user.id,
          provider: 'blessing-skin',
        },
      })
      if (blessingSkinAccount.expires_at! * 1000 < Date.now()) {
        try {
          const response = await fetch(`${BlessingSkinHost}/oauth/authorize`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              client_id: process.env.AUTH_BLESSING_SKIN_ID!,
              client_secret: process.env.AUTH_BLESSING_SKIN_SECRET!,
              refresh_token: blessingSkinAccount.refresh_token!,
            }),
          })
          const responseData = await response.json()
          if (!response.ok) throw responseData

          await prisma.account.update({
            data: {
              access_token: responseData.access_token,
              expires_at: Math.floor(Date.now() / 1000 + responseData.expires_in),
              refresh_token: responseData.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'blessing-skin',
                providerAccountId: blessingSkinAccount.providerAccountId,
              },
            },
          })
        } catch (error) {
          console.error('Error refreshing access token', error)
          // The error property can be used client-side to handle the refresh token error
          session.error = 'RefreshAccessTokenError'
        }
      }
      return session
    },
  },
})

declare module '@auth/core/types' {
  interface Session {
    error?: 'RefreshAccessTokenError'
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token: string
    error?: 'RefreshAccessTokenError'
  }
}
