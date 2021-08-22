import getApiUrl from './getApiUrl';

const fetchAPI = async ({ url, method, body = {} }) => {
  const apiURL = getApiUrl();
  let response = {};
  if (method === 'get') {
    response = await fetch(`${apiURL}${url}`);
  } else if (method === 'post') {
    response = await fetch(`${apiURL}${url}`, {
      method: 'POST',
      body: JSON.stringify({ ...body }),
      headers: {
        'Content-Type': 'application/json',
        code: 'password',
      },
    }).catch((err) => {
      console.log('Could not fetch from the API. Error:', err);
    });
    console.log('Response:', response);
  }
  const data = await response.json().catch((err) => {
    console.log('Could not convert to JSON.\nError:', err);
  });
  return data;
};
export default fetchAPI;
