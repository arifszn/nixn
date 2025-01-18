import { LoggedInUser } from "./logged-in-user.interface";

export interface User extends LoggedInUser {
  age: number;
  gender: string;
  phone: string;
  image: string;
}