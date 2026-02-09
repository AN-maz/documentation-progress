import {
  getJSON,
  buildURL,
  getJsonWithTimeout,
  getJsonWithRetry,
} from "./client";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export function searchMeals(query) {
  const url = buildURL(`${BASE_URL}/search.php`, { s: query });
  return getJSON(url);
}

export function getMealById(id){
    const url = buildURL(`${BASE_URL}/lookup.php`, {i:id});
    return getJSON(url);
}

export function testTimeOutConnection(){
    return getJsonWithTimeout("https://httbin.org/delay/5", {timeoutMs:2000});
}

export function testRetryConnection(){
    return getJsonWithRetry("https://situs-ngawur-123.com", {retries:2});
}