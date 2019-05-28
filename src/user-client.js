async function updateUser(user, updates) {
  const response = await window.fetch(`/user/${user.username}`, {
    method: 'PUT',
    body: JSON.stringify({...user, ...updates}),
  })
  const json = await response.json()
  return response.ok ? json.user : Promise.reject(json)
}

export {updateUser}
