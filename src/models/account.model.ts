import { AccountDTO } from 'src/DTO/account.dto';

export class AccountModel {
  public readonly id: string;

  public email: string;
  public username: string;

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({ id, email, username, createdAt, updatedAt }: AccountDTO) {
    this.id = id;
    this.email = email;

    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
