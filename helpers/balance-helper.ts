import { IBusinessState, IRichBusinessState, IUser } from '@/store/types';
import Decimal from 'decimal.js';

export const getTotalSpending = (currentUser: IUser) => {
  const apartmentsCost = new Decimal(
    currentUser?.spending?.apartments?.length ? currentUser?.spending?.apartments : 0,
  );
  const foodCost = new Decimal(
    currentUser?.spending?.food?.length ? currentUser?.spending?.food : 0,
  );
  const educationCost = new Decimal(
    currentUser?.spending?.education?.length ? currentUser?.spending?.education : 0,
  );
  const clothesCost = new Decimal(
    currentUser?.spending?.clothes?.length ? currentUser?.spending?.clothes : 0,
  );
  const internetCost = new Decimal(
    currentUser?.spending?.internet?.length ? currentUser?.spending?.internet : 0,
  );
  const travelCost = new Decimal(
    currentUser?.spending?.travel?.length ? currentUser?.spending?.travel : 0,
  );
  const childCost = new Decimal(
    currentUser?.spending?.child?.cost?.length ? currentUser?.spending?.child?.cost : 0,
  ).mul(
    new Decimal(
      currentUser?.spending?.child?.count?.length ? currentUser?.spending?.child?.count : 0,
    ),
  );
  const creditApartmentsCost = new Decimal(
    currentUser?.spending?.creditApartments?.month?.length
      ? currentUser?.spending?.creditApartments?.month
      : 0,
  );
  const creditCarCost = new Decimal(
    currentUser?.spending?.creditCar?.month?.length ? currentUser?.spending?.creditCar?.month : 0,
  );
  const caringGrandfatherCost = new Decimal(
    currentUser?.spending?.caringGrandfather?.length ? currentUser?.spending?.caringGrandfather : 0,
  );
  const caringGrandmotherCost = new Decimal(
    currentUser?.spending?.caringGrandmother?.length ? currentUser?.spending?.caringGrandmother : 0,
  );
  const totalMinus = Decimal.sum(
    apartmentsCost,
    foodCost,
    educationCost,
    clothesCost,
    internetCost,
    travelCost,
    childCost,
    creditApartmentsCost,
    creditCarCost,
    caringGrandfatherCost,
    caringGrandmotherCost,
  );

  return totalMinus.toString();
};

export const getTotalSalary = (
  currentUser: IUser,
  poorCircle: {
    smallBusiness: Record<string, { list: IBusinessState[] }>;
    bigBusiness: Record<string, { list: IBusinessState[] }>;
  },
  richCircle: {
    business: Record<string, { list: IRichBusinessState[] }>;
  },
) => {
  const salaryCost = new Decimal(
    currentUser?.salary?.salary?.length ? currentUser?.salary?.salary : 0,
  );
  const passiveBusinessSalaryCost = new Decimal(
    currentUser?.salary?.passiveBusinessSalary?.length
      ? currentUser?.salary?.passiveBusinessSalary
      : 0,
  );
  const passiveImmovableSalaryCost = new Decimal(
    currentUser?.salary?.passiveImmovableSalary?.length
      ? currentUser?.salary?.passiveImmovableSalary
      : 0,
  );
  const totalSalary = Decimal.sum(
    salaryCost,
    passiveBusinessSalaryCost,
    passiveImmovableSalaryCost,
  );
  const smallBusinessList = poorCircle.smallBusiness[currentUser.id]?.list;
  const smallBusinessCost = smallBusinessList?.length
    ? Decimal.sum(...smallBusinessList.map((item) => new Decimal(item.income)))
    : new Decimal(0);
  const bigBusinessList = poorCircle.bigBusiness[currentUser.id]?.list;
  const bigBusinessCost = bigBusinessList?.length
    ? Decimal.sum(...bigBusinessList.map((item) => new Decimal(item.income)))
    : new Decimal(0);
  const businessList = richCircle.business[currentUser.id]?.list;
  const businessCost = businessList?.length
    ? Decimal.sum(...businessList.map((item) => new Decimal(item.income)))
    : new Decimal(0);
  return Decimal.sum(totalSalary, smallBusinessCost, bigBusinessCost, businessCost).toString();
};
