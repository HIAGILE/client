export type ILoginForm = {
  email: string;
  password: string;
};

export type ICreateAccountForm = {
  email: string;
  password: string;
  passwordAgain: string;
  name: string;
  role: string;
  agreeCheckbox: string;
  file: FileList;
};
