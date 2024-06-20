import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const instance = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: process.env.KEY_API,
  },
});

export default class AxiosController {
  static async getImg(query) {
    try {
      const response = await instance.get("", {
        params: { q: query },
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
}
