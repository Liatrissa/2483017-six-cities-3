import { Token } from '../services/token';

export type UserData = {
  id: number;
  email: string;
  token: Token;
};
