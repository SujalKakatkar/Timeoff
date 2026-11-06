import type { User } from "./auth";


export interface Employee extends User{
    active:boolean,
    manager:string,
}