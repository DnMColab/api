export interface AccountDTO {
  id: string;

  email: string;
  password?: string;

  username: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface AccountCreateDTO {
  email: string;
  password: string;

  username: string;
}

export interface AccountUpdateDTO {
  username?: string;
}

export interface AccountDeleteDTO {
  id: string;
}
