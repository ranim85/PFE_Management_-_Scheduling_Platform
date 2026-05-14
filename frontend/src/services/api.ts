import axios from "axios";

async function Post(url: string, data: object) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (e: any) {
    return {
      status: e.response?.status || 500,
      ok: 0,
      message: "Network error: " + (e.message || "Unknown error"),
    };
  }
}

async function Get(url: string, data?: object) {
  try {
    const res = await axios.get(url, { params: data });
    return res;
  } catch (e) {
    return [];
  }
}

async function Delete(url: string, data?: object) {
  try {
    const res = await axios.delete(url, { data });
    return res.data;
  } catch (e: any) {
    return {
      status: e.response?.status || 500,
      ok: 0,
      message: "Network error: " + (e.message || "Unknown error"),
    };
  }
}

async function Patch(url: string, data: object) {
  try {
    const res = await axios.patch(url, data);
    return res.data;
  } catch (e: any) {
    return {
      status: e.response?.status || 500,
      ok: 0,
      message: "Network error: " + (e.message || "Unknown error"),
    };
  }
}

export { Get, Post, Patch, Delete };
