import axios from "axios";

function createService() {
  const server = "https://fakestoreapi.com";
  const host = server.endsWith("/") ? server : `${server}/`;

  return axios.create({
    baseURL: host,
  });
}

/**
 *
 * @param {string} endpoint Request endpoint
 */
export function getMethod(endpoint: string): Promise<any> {
  endpoint = checkEndpoint(endpoint)
  const service = createService();
  return new Promise((res, rej) => {
    service
      .get(endpoint)
      .then((response) => res(response.data))
      .catch((error) => rej(error.response.data));
  });
}

export function postMethod(endpoint: string, body: Object) {
  endpoint = checkEndpoint(endpoint)
  const service = createService();
  return new Promise((res, rej) => {

    service
      .post(endpoint, body)
      .then((response) => res(response.data))
      .catch((error) => rej(error.response.data));
  });
}


function checkEndpoint(endpoint: string) {
  return endpoint.startsWith("/") ? endpoint.substring(0) : endpoint;
}
