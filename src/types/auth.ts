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

export type AuthOptionsType = {
  providers: any[];
  callbacks: {
    jwt: (params: { token: any; user?: any }) => any;
    session: (params: { session: any; token: any }) => any;
  };
};

