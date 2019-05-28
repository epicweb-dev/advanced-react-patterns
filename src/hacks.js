import 'stop-runaway-react-effects/hijack'

// hack fetch
const originalFetch = window.fetch

const sleep = (t = Math.random() * 200 + 300) =>
  new Promise(resolve => setTimeout(resolve, t))

const fakeResponses = [
  {
    test: (endpoint, config) =>
      endpoint.includes('/user/') && config.method === 'PUT',
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
