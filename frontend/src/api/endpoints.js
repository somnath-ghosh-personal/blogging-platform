const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
  },
  POSTS: {
    FETCH_ALL: '/posts',
    FETCH_BY_ID: (id) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id) => `/posts/${id}`,
    DELETE: (id) => `/posts/${id}`,
  },
  COMMENTS: {
    FETCH_BY_POST_ID: (postId) => `/posts/${postId}/comments`,
    ADD: (postId) => `/posts/${postId}/comments`,
  },
};

export default ENDPOINTS;
