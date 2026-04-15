export type signUpFormDataType = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export type formDataType = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export type AuthorizeType = {
  id: string;
  name: string;
  email: string;
  tokenCredentials: string;
  role: string;
};
