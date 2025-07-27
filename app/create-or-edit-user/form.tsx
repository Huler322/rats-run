import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { generateNonce } from '@/helpers';
import { useFormUserInfo } from '@/hooks/form/user-info.hook';
import tw from '@/lib/tailwind';
import { setUserInList } from '@/slices/game.slice';
import { useAppDispatch } from '@/store';
import { IUser } from '@/store/types';
import { TypeNavigation, UserStatus } from '@/types';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';

const Form = () => {
  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useFormUserInfo();

  const onSave = () => {
    const values = getValues();
    const id = generateNonce();
    const createdUser: IUser = {
      ...values,
      id,
      spending: {
        ...values.spending,
        child: {
          cost: values.spending.child.cost,
          count: '0',
        },
      },
      status: UserStatus.created,
    };
    dispatch(setUserInList(createdUser));
    navigation.push(`/${TypeNavigation.TABS}`);
  };

  return (
    <>
      <ContainerScrollComponent styles={'pb-15'}>
        <View style={tw`mb-5`}>
          <Text style={tw`mb-4 text-center text-xl text-gray-900 font-semibold`}>Main Info</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your name'}
                error={errors.name}
                label={'Name'}
              />
            )}
            name="name"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your profession'}
                error={errors.profession}
                label={'Profession'}
              />
            )}
            name="profession"
            rules={{ required: 'This field is required' }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your name of dream'}
                error={errors?.dream?.name}
                label={'Name of Dream'}
              />
            )}
            name="dream.name"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your price of dream'}
                error={errors?.dream?.price}
                label={'Price of Dream'}
              />
            )}
            name="dream.price"
            defaultValue=""
          />
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`mb-4 text-center text-xl text-gray-900 font-semibold`}>
            Income Finance
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your salary'}
                error={errors?.salary?.salary}
                label={'Salary'}
              />
            )}
            name="salary.salary"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value ?? ''}
                onChange={onChange}
                placeholder={'Enter your passive Business Salary'}
                error={errors?.salary?.passiveBusinessSalary}
                label={'Business Salary'}
              />
            )}
            name="salary.passiveBusinessSalary"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value ?? ''}
                onChange={onChange}
                placeholder={'Enter your passive Immovable Salary'}
                error={errors?.salary?.passiveImmovableSalary}
                label={'Immovable Salary'}
              />
            )}
            name="salary.passiveImmovableSalary"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your start capital'}
                error={errors.currentCapital}
                label={'Starting Capital'}
              />
            )}
            name="currentCapital"
            defaultValue=""
          />
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`mb-4 text-center text-xl text-gray-900 font-semibold`}>
            Outcome Finance
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your apartment costs'}
                error={errors?.spending?.apartments}
                label={'Apartment costs'}
              />
            )}
            name="spending.apartments"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your Food costs'}
                error={errors?.spending?.food}
                label={'Food costs'}
              />
            )}
            name="spending.food"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your Education costs'}
                error={errors?.spending?.education}
                label={'Education costs'}
              />
            )}
            name="spending.education"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your Clothes costs'}
                error={errors?.spending?.clothes}
                label={'Clothes costs'}
              />
            )}
            name="spending.clothes"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your Internet costs'}
                error={errors?.spending?.internet}
                label={'Internet costs'}
              />
            )}
            name="spending.internet"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your Travel costs'}
                error={errors?.spending?.travel}
                label={'Travel costs'}
              />
            )}
            name="spending.travel"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your child costs'}
                error={errors?.spending?.child?.cost}
                label={'Child costs'}
              />
            )}
            name="spending.child.cost"
            defaultValue=""
          />
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`mb-4 text-center text-xl text-gray-900 font-semibold`}>Credits</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your full price for apartment credit'}
                error={errors?.spending?.creditApartments?.full}
                label={'Full Apartment Credit Price'}
              />
            )}
            name="spending.creditApartments.full"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your month price for apartment credit'}
                error={errors?.spending?.creditApartments?.month}
                label={'Month Apartment Credit Price'}
              />
            )}
            name="spending.creditApartments.month"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your full price for car credit'}
                error={errors?.spending?.creditCar?.full}
                label={'Full Car Credit Price'}
              />
            )}
            name="spending.creditCar.full"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Enter your month price for car credit'}
                error={errors?.spending?.creditCar?.month}
                label={'Month Car Credit Price'}
              />
            )}
            name="spending.creditCar.month"
            defaultValue=""
          />
        </View>
        <ButtonComponent onPress={handleSubmit(onSave)} title={'Save & start a new game'} />
      </ContainerScrollComponent>
    </>
  );
};

export default Form;
