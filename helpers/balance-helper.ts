import { IUser } from '@/store/types';
import Decimal from 'decimal.js';

export const getTotalSpending = (user: IUser) => {
  const spending = user.spending;

  const childrenCount = new Decimal(spending.child.count.length ? spending.child.count : '0');

  const childrenCost = new Decimal(spending.child.cost).times(childrenCount);

  const grandfatherCare = new Decimal(
    spending.caringGrandfather?.length ? spending.caringGrandfather : '0',
  );
  const grandmotherCare = new Decimal(
    spending.caringGrandmother?.length ? spending.caringGrandmother : '0',
  );

  const total = new Decimal(spending.apartments)
    .plus(spending.food?.length ? spending.food : 0)
    .plus(spending.education?.length ? spending.education : 0)
    .plus(spending.clothes?.length ? spending.clothes : 0)
    .plus(spending.internet?.length ? spending.internet : 0)
    .plus(spending.travel?.length ? spending.travel : 0)
    .plus(childrenCost ?? 0)
    .plus(spending.creditApartments.month?.length ? spending.creditApartments.month : 0)
    .plus(spending.creditCar.month?.length ? spending.creditCar.month : 0)
    .plus(grandfatherCare)
    .plus(grandmotherCare);

  return total.toString();
};
