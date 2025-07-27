import { UserStatus } from '@/types';

export interface IStore {
  game: IGameState;
}

export interface IGameState {
  user: {
    list: IUser[] | [];
    total: number;
  };
}

export interface IUser {
  id: string;
  name: string;
  status: UserStatus;
  profession: string;
  salary: ISalary;
  dream: IDream;
  spending: ISpending;
  startingCapital: string;
}

export interface IDream {
  name: string;
  price: string;
}

export interface ISpending {
  apartments: string;
  food: string;
  education: string;
  clothes: string;
  internet: string;
  travel: string;
  child: string;
  creditApartments: ICredit;
  creditCar: ICredit;
}

export interface ICredit {
  full: string;
  month: string;
}

export interface ISalary {
  salary: string;
  passiveBusinessSalary?: string;
  passiveImmovableSalary?: string;
}
