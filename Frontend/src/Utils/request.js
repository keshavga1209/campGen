export const BASE_URL = 'https://api.lregi.jp'

export async function request(method, endpoint, data = undefined, omitToken = false, ContentType = 'application/json'){
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': ContentType,
      },
      body: JSON.stringify(data)
    }
    // console.log('options: ', options);

    if (!omitToken) options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    const result = await window.fetch(
      `${BASE_URL}${endpoint}`,
      options
    );

    if (result.status >= 200 && result.status < 400) {
      try{
        return [null, await result.json()]
      }catch(err){
        try{
          return [null, await result.text()]
        }catch(err){
          return [null, null]
        }
      }
    } else {
      if (result.status === 401) return ['unauthorized', null]
      else return [await result.text(), null]
    }
  } catch(err) {
    console.log(err,err.message)
    return ['network_error', null]
  }
}
