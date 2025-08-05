import { UserStatus } from '@/types';

export interface IStore {
  game: IGameState;
}

export interface IGameState {
  user: {
    list: IUser[] | [];
    total: number;
  };
  stock: Record<string, { list: IStockState[] }>;
  currentUser: IUser | null;
  poorCircle: {
    smallBusiness: Record<string, { list: IBusinessState[] }>;
    bigBusiness: Record<string, { list: IBusinessState[] }>;
  };
  richCircle: {
    business: Record<string, { list: IRichBusinessState[] }>;
  };
}

export interface IBusinessState {
  id: string;
  price: string;
  income: string;
}

export interface IRichBusinessState {
  id: string;
  name: string;
  price: string;
  income: string;
}

export interface IStockState {
  id: string;
  name: string;
  count: string;
  price: string;
}

export interface IUser {
  id: string;
  name: string;
  status: UserStatus;
  profession: string;
  salary: ISalary;
  dream: IDream;
  spending: ISpending;
  currentCapital: string;
  isDivorced: boolean;
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
  child: IChild;
  creditApartments: ICredit;
  creditCar: ICredit;
  caringGrandfather?: string;
  caringGrandmother?: string;
}

export interface IChild {
  count: string;
  cost: string;
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
