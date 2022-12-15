import { CommonApi } from "./axiosClient";

const api = CommonApi.api;

const profilepath = "/auth/profile";



function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function sleep() {
    await timeout(500);
    return true;
  }

export const loadApi ={
    loadProfile: async function(){
        await sleep(5000);
        const result = await api.get(profilepath);
        return result.data;
    },
    loadUsers: async function(){
      await sleep(5000);
      const result = await api.get('/users');
      return result.data
    }
}