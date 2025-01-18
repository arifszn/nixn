import { LoggedInUser } from "./loggedInUser.interface";

export interface User extends LoggedInUser {
  age: number;
  gender: string;
  phone: string;
  image: string;
}