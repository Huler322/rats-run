import { getRandomBytes } from 'expo-random';

export const generateNonce = (length = 16) => {
  const bytes = getRandomBytes(length);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};
