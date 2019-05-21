// this is just a fake user client, in reality it'd probably be using
// window.fetch to actually interact with the user.

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

async function updateUser(user, updates) {
  await sleep(500) // simulate a real-world wait period
  if (`${updates.tagline} ${updates.bio}`.includes('fail')) {
    return Promise.reject({message: 'Something went wrong'})
  }
  return {...user, ...updates}
}

export {updateUser}
