import { decode } from 'js-base64';

const decodeJwt = (token) => {
  const parts = token.split('.');
  if (parts.length != 3) {
    throw new Error('Invalid token format');
  }
  const header = JSON.parse(decode(parts[0]));
  const payload = JSON.parse(decode(parts[1]));
  return { header, payload };
};

export default decodeJwt;
