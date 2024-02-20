import { AccountDTO } from 'src/DTO/account.dto';

export class AccountModel {
  public readonly id: string;
  private _password: string;

  public email: string;
  public username: string;

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    email,
    password,
    username,
    createdAt,
    updatedAt,
  }: AccountDTO) {
    this.id = id;
    this.email = email;
    this._password = password;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }
}
