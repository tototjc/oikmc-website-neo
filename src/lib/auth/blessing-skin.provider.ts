import type { OAuthConfig, OAuthUserConfig } from '@auth/core/providers'
import type { TokenSet } from '@auth/core/types'

export interface BlessingSkinProfile {
  uid: number
  email: string
  nickname: string
  avatar: number
  score: number
  permission: number
  last_sign_at: string
  register_at: string
  verified: boolean

  error: string
  error_description: string
  hint: string
  message: string
}

interface AdditionalConfig {
  host: string
  /**
   * Get more information about scopes from
   * [bs-community/rfcs](https://github.com/bs-community/rfcs/blob/master/rfcs/0003-scope.md)
   */
  scope?: string[]
}

export default function BlessingSkin<P extends BlessingSkinProfile>(
  options: OAuthUserConfig<P> & AdditionalConfig,
): OAuthConfig<P> {
  return {
    id: 'blessing-skin',
    name: 'Blessing Skin',
    type: 'oauth',
    checks: ['state'],
    authorization: {
      url: `${options.host}/oauth/authorize`,
      params: {
        response_type: 'code',
        client_id: options.clientId,
        scope: options.scope?.join(' '),
      },
    },
    token: {
      url: `${options.host}/oauth/token`,
      async request({ params, provider }) {
        const resp = await fetch(provider.token?.url as URL, {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: provider.clientId!,
            client_secret: provider.clientSecret!,
            redirect_uri: provider.callbackUrl!,
            code: params.code!,
          }),
        })
        const data = await resp.json()
        const tokens: TokenSet = {
          token_type: data.token_type,
          expires_at: data.expires_in,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        }
        return {
          tokens,
        }
      },
    },
    userinfo: {
      url: `${options.host}/api/user`,
      async request({ tokens, provider }) {
        const resp = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        const data = await resp.json()
        return data
      },
    },
    profile(profile) {
      return {
        id: profile.uid.toString(),
        email: profile.email,
        name: profile.nickname,
        image: `${options.host}/avatar/${profile.avatar}`,
      }
    },
    style: {
      brandColor: '#28a745',
    },
    options,
  }
}
