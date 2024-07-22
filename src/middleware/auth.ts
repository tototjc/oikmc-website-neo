import { defineMiddleware } from 'astro:middleware'
import { getSession } from 'auth-astro/server'

export default defineMiddleware(async (context, next) => {
  const session = await getSession(context.request)
  if (!session || session.error === 'RefreshAccessTokenError') {
    const path = context.url.pathname
    if (path.startsWith('/user')) {
      return Response.redirect(new URL('/login', context.url))
    }
    if (path.startsWith('/api/internal')) {
      return new Response('Unauthorized', { status: 401 })
    }
  }
  context.locals.session = session
  return next()
})
