import * as cookies from 'cookies-next';

export const getCookieByName = (name: string) => {
  const cookieValue = cookies.getCookie(name);
  return cookieValue;
};

export const deleteCookieByName = (name: string) => {
  const cookieValue = cookies.deleteCookie(name);
  return cookieValue;
};

export const getAllCookies = () => {
  const allCookies = cookies.getCookies();
  return allCookies;
};

export const isCookieExists = (name: string) => {
  return cookies.hasCookie(name);
};

export const setCookies = (
  name: string,
  value: string,
  expires?: Date,
  path: string = '/'
) => {
  const expiresDateTime = new Date();
  expiresDateTime.setDate(expiresDateTime.getDate() + 1);
  cookies.setCookie(name, value, { expires: expires ?? expiresDateTime, path });
};

export default cookies;
