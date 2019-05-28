// hack fetch
const originalFetch = window.fetch

const sleep = (t = Math.random() * 200 + 300) =>
  new Promise(resolve => setTimeout(resolve, t))

const fakeResponses = [
  {
    test: (endpoint, config) =>
      endpoint.startsWith('/user/') && config.method === 'PUT',
    async handler(url, config) {
      await sleep(1000)
      const newUser = JSON.parse(config.body)

      if (`${newUser.tagline} ${newUser.bio}`.includes('fail')) {
        return {
          ok: false,
          status: 500,
          json: async () => ({message: 'Something went wrong'}),
        }
      }

      return {
        ok: true,
        status: 200,
        json: async () => ({user: newUser}),
      }
    },
  },
  // fallback to originalFetch
  {
    test: () => true,
    handler: (...args) => originalFetch(...args),
  },
]

const colors = {
  ok: '#0f9d58',
  error: '#ef5350',
}

if (navigator.userAgent.includes('jsdom')) {
  window.fetch = async (...args) => {
    const {handler} = fakeResponses.find(({test}) => {
      try {
        return test(...args)
      } catch (error) {
        // ignore the error and hope everything's ok...
        return false
      }
    })
    const groupTitle = `%c ${args[1].method} -> ${args[0]}`
    try {
      const response = await handler(...args)
      if (response.ok) {
      }
      console.groupCollapsed(
        groupTitle,
        `color: ${response.ok ? colors.ok : colors.error}`,
      )
      console.info('REQUEST:', {url: args[0], ...args[1]})
      console.info('RESPONSE:', {
        ...response,
        ...(response.json ? {json: await response.json()} : {}),
      })
      console.groupEnd()
      return response
    } catch (error) {
      let rejection = error
      if (error instanceof Error) {
        rejection = {
          status: 500,
          message: error.message,
        }
      }
      console.groupCollapsed(groupTitle, `color: ${colors.error}`)
      console.info('REQUEST:', {url: args[0], ...args[1]})
      console.info('REJECTION:', rejection)
      console.groupEnd()
      return Promise.reject(rejection)
    }
  }
}
