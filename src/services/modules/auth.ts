import http from '../http';
import { AUTH_API } from '@/config/env';
import { AUTH_KEYS } from '@/constants';

/**
 * @namespace 角色权限模块
 */

/**
 * 获取权限列表
 * @returns {Promise<any>}
 */
export const getAuthInfo: () => Promise<string[]> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Object.values(AUTH_KEYS);
      resolve(data);
    }, 1500);
  });
};

/**
 * 获取用户信息
 * @returns {Promise<any>}
 */
export const getUserInfo = () => http.get(`${AUTH_API}/userInfo`);
