import { useAuthStore } from '@/stores';

export const getToken = () => {
  const { token } = useAuthStore();
  return token;
};

export const getLoginUrl = () => {
  return 'http://login.test.com';
};

export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};
