import { IUser } from '@/store/types';
import Decimal from 'decimal.js';

export const getTotalBalance = (balance: number) => {};

export const getTotalSpending = (user: IUser) => {
  const s = user.spending;

  const childrenCount = new Decimal(user.countOfChildren ?? '0');

  const childrenCost = new Decimal(s.child).times(childrenCount);

  const grandfatherCare = new Decimal(s.caringGrandfather ?? '0');
  const grandmotherCare = new Decimal(s.caringGrandmother ?? '0');

  const total = new Decimal(s.apartments)
    .plus(s.food)
    .plus(s.education)
    .plus(s.clothes)
    .plus(s.internet)
    .plus(s.travel)
    .plus(childrenCost)
    .plus(s.creditApartments.month)
    .plus(s.creditCar.month)
    .plus(grandfatherCare)
    .plus(grandmotherCare);

  return total.toString();
};
