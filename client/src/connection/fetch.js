export default (url) => {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, options).then(response => {
    if (response.ok) {
      return response;
    }
    return Promise.reject(Error('error'))
  }).catch(error => {
    return Promise.reject(Error(error.message))
  })
}
