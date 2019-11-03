const postsEndpoint = `https://jsonplaceholder.typicode.com/posts`

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getPosts = async filter => {
  const response = await fetch(postsEndpoint + `?${filter}`);
  const myJson = await response.json();
  return myJson;
}

//Mock delayed API response;
export const getFilters = async filter => {
  await sleep(3000);
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
