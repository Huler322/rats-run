import { IUser } from '@/store/types';
import Decimal from 'decimal.js';

export const getTotalBalance = (balance: number) => {};

export const getTotalSpending = (user: IUser) => {
  const s = user.spending;
  let total = new Decimal(s.apartments)
    .plus(s.food)
    .plus(s.education)
    .plus(s.clothes)
    .plus(s.internet)
    .plus(s.travel)
    .plus(s.creditApartments.month)
    .plus(s.creditCar.month);

  return total.toString();
};
