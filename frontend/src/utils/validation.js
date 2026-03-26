export const validateForm = (data, type) => {
  const errors = {};

  if (type === 'signup') {
    if (!data.name || data.name.trim().length === 0) {
      errors.name = 'Full name is required';
    } else if (data.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }
  }

  if (type === 'signup' || type === 'login') {
    if (!data.email || data.email.trim().length === 0) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!data.password || data.password.length === 0) {
        errors.password = 'Password is required';
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }
  }

  if (type === 'post') {
      if (!data.title || data.title.trim().length === 0) {
          errors.title = 'Title is required';
      }
      if (!data.content || data.content.trim().length === 0) {
          errors.content = 'Post content cannot be empty';
      }
  }

  return errors;
};
