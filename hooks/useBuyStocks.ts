import { IUserFormInput } from '@/hooks/form/user-info.hook';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';

export const useBuyStocks = () => {
  const resolver: Resolver<IUserFormInput> = async (values) => {
    const errors: FieldErrors<IUserFormInput> = {};

    const set = (path: keyof FieldErrors<IUserFormInput> | string, message: string) => {
      const [root, ...nested] = path.split('.');
      let ref: any = errors;

      for (const key of [root, ...nested.slice(0, -1)]) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }

      ref[nested.at(-1) ?? root] = {
        message,
        type: 'manual',
      };
    };

    const require = (path: string, value: any) => {
      if (!value || value.trim?.() === '') {
        set(path, 'This field is required');
      }
    };

    const requireInt = (path: string, value: string) => {
      if (!value || value.trim() === '') {
        set(path, 'This field is required');
      } else if (!/^\d+$/.test(value)) {
        set(path, 'Only whole numbers are allowed');
      }
    };

    require('name', values.name);
    require('profession', values.profession);
    requireInt('dream.price', values.dream.price);
    require('dream.name', values.dream.name);
    requireInt('salary.salary', values.salary.salary);
    requireInt('startingCapital', values.startingCapital);

    requireInt('spending.apartments', values.spending.apartments);
    requireInt('spending.food', values.spending.food);
    requireInt('spending.education', values.spending.education);
    requireInt('spending.clothes', values.spending.clothes);
    requireInt('spending.internet', values.spending.internet);
    requireInt('spending.travel', values.spending.travel);
    requireInt('spending.child', values.spending.child);

    if (values.spending.creditApartments.full) {
      requireInt('spending.creditApartments.full', values.spending.creditApartments.full);
    }

    if (values.spending.creditApartments.month) {
      requireInt('spending.creditApartments.month', values.spending.creditApartments.month);
    }

    if (values.spending.creditCar.full) {
      requireInt('spending.creditCar.full', values.spending.creditCar.full);
    }

    if (values.spending.creditCar.month) {
      requireInt('spending.creditCar.month', values.spending.creditCar.month);
    }

    if (values.salary.passiveBusinessSalary) {
      requireInt('salary.passiveBusinessSalary', values.salary.passiveBusinessSalary);
    }

    if (values.salary.passiveImmovableSalary) {
      requireInt('salary.passiveImmovableSalary', values.salary.passiveImmovableSalary);
    }

    return {
      errors,
      values,
    };
  };

  return useForm<IUserFormInput>({ resolver });
};
