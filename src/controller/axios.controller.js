import axios from "axios";

const instance = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "44377298-c504e436869e1ece22be17c09",
  },
});

export default class AxiosController {
  static async getImg(query) {
    try {
      const response = await instance.get("", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}
