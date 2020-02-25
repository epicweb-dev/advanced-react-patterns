// Please don't actually do this in a real app
// this is here to make it easy for us to simulate making HTTP calls in this
// little app that doesn't actually have any server element.
const originalFetch = window.fetch

// Allows us to restore the original fetch
originalFetch.restoreOriginalFetch = () => (window.fetch = originalFetch)
originalFetch.overrideFetch = () => (window.fetch = hackFetch)

async function hackFetch(...args) {
  const fakeResponses =
    hackFetch.fakeResponses || window.fetch.fakeResponses || []
  const fakeResponse = fakeResponses.find(({test}) => {
    try {
      return test(...args)
    } catch (error) {
      // ignore the error and hope everything's ok...
      return false
    }
  })
  if (!fakeResponse) {
    return originalFetch(...args)
  }
  const groupTitle = `%c ${args[1].method} -> ${args[0]}`
  try {
    const response = await fakeResponse.handler(...args)
    console.groupCollapsed(groupTitle, 'color: #0f9d58')
    let parsedBody
    try {
      parsedBody = JSON.parse(args[1].body)
    } catch (error) {
      // ignore
    }
    console.info('REQUEST:', {
      url: args[0],
      ...args[1],
      ...(parsedBody ? {parsedBody} : null),
    })
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
    console.groupCollapsed(groupTitle, 'color: #ef5350')
    console.info('REQUEST:', {url: args[0], ...args[1]})
    console.info('REJECTION:', rejection)
    console.groupEnd()
    return Promise.reject(rejection)
  }
}
hackFetch.isHacked = true
Object.assign(hackFetch, window.fetch)

// alright. Let's hack fetch!
window.fetch.overrideFetch()
