import { CommonApi } from "./axiosClient";

const api = CommonApi.api;

const adminpath = "/users";


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function sleep() {
    await timeout(500);
    return true;
  }

export const loadProfileApi ={
    loadProfile: async function(){
        await sleep(5000);
        const result = await api.get(adminpath);
        return result.data;
    }
}