const validate = (name, data) => {
  const value=data;
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

  switch (name) {
    case 'email': {
      if (!value) {
        return 'Please input your email';
      }
      if (!EMAIL_REGEXP.test(value)) {
        return 'Please input a valid email';
      }
      return  '';
    }

    case 'password': {
      if (!value) {
        return 'Please enter your password';
      }
      return '';
    }
    default:
      return '';
  }
};

export default validate;
