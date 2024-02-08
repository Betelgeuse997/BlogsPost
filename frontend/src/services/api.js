import axios from "axios";
import { BACK_SERVER_URL } from '../../config.js';

export const createUser = async (userData) => {
    try {
      const res = await axios.post(
        `${BACK_SERVER_URL}/user/signUp`,
        userData
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  
  export const getUser = async (userData) => {
    try {
      const res = await axios.post(
        `${BACK_SERVER_URL}/user/signIn`,
        userData
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  
  export const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        `${BACK_SERVER_URL}/user/forgotPassword`,
        { email }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };
  
  export const resetPassword = async (password, token) => {
    try {
      const res = await axios.put(`${BACK_SERVER_URL}/user/resetPassword`, {
        password,
        token,
      });
      return res;
    } catch (error) {
      return error;
    }
  };  

export const createBlogs = async (data, token) => {
    try {
        const headers = {
        Authorization: `Bearer ${token}`,
        };
        const res = await axios.post(
            `${BACK_SERVER_URL}/blogs/`,
            data,
            { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const deleteBlog = async (id, token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.delete(
            `${BACK_SERVER_URL}/blogs/${id}`, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const editBlog = async (id, data, token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.put(
            `${BACK_SERVER_URL}/blogs/${id}`,
            data, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const fetchBlog = async (id, token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
            `${BACK_SERVER_URL}/blogs/${id}`, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getBlogs = async (token) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
            `${BACK_SERVER_URL}/blogs`, { headers }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getUserBlogs = async (data, token) => {
  try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
          `${BACK_SERVER_URL}/userblogs/${data}`, { headers }
      );
      return res;
  } catch (error) {
      return error;
  }
};

export const searchUsers = async (data,token) => {
  try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        `${BACK_SERVER_URL}/users/search/${data}`, { headers }
      );
      return res;
  } catch (error) {
    return error;
  }
}

export const followUser = async (data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${BACK_SERVER_URL}/follow/${data}`, {}, { headers }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export const unFollowUser = async (data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${BACK_SERVER_URL}/unfollow/${data}`, {}, { headers }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export const fetchUserDetails = async (data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(
      `${BACK_SERVER_URL}/user/fetch/${data}`, { headers }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export const likeBlog = async (id, token) => {
  try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.put(
          `${BACK_SERVER_URL}/likeblog/${id}`, {},
           { headers }
      );
      return res;
  } catch (error) {
      return error;
  }
};

export const unlikeBlog = async (id, token) => {
  try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.put(
          `${BACK_SERVER_URL}/unlikeblog/${id}`, {},
           { headers }
      );
      return res;
  } catch (error) {
      return error;
  }
};