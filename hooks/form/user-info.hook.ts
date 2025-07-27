import { useForm, useWatch } from 'react-hook-form';

export interface IFormInput {
  code: string;
}

export const useFormUserInfo = (initialName?: string) => {
  const initialState: IFormInput = {
    code: initialName ?? '',
  };

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<IFormInput>({
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  const { code } = useWatch({ control });

  return {
    control,
    errors,
    getValues,
    handleSubmit,
    isDirty,
    isValid,
    reset,
    setValue,
    trigger,
    value: { code },
  };
};
