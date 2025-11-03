import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { generateNonce } from '@/helpers';
import { useFormUserInfo } from '@/hooks/form/user-info.hook';
import tw from '@/lib/tailwind';
import { setUserInList, updateUserInfo } from '@/slices/game.slice';
import { useAppDispatch, useAppSelector } from '@/store';
import { IUser } from '@/store/types';
import { TypeNavigation, UserStatus } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

const Form = () => {
  const { id } = useLocalSearchParams();

  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector(({ game }) => game);

  const foundCurrentUser = user?.list?.find((item) => item.id === id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useFormUserInfo();

  const onSetValue = () => {
    if (!foundCurrentUser) return;
    setValue('name', foundCurrentUser?.name ?? '');
    setValue('dream.price', foundCurrentUser?.dream?.price ?? '0');
    setValue('dream.name', foundCurrentUser?.dream?.name ?? '');
    setValue('currentCapital', foundCurrentUser?.currentCapital ?? '0');
    setValue(
      'spending.creditApartments.full',
      foundCurrentUser?.spending?.creditApartments?.full ?? '0',
    );
    setValue(
      'spending.creditApartments.month',
      foundCurrentUser?.spending?.creditApartments?.month ?? '0',
    );
    setValue('spending.creditCar.full', foundCurrentUser?.spending?.creditCar?.full ?? '0');
    setValue('spending.creditCar.month', foundCurrentUser?.spending?.creditCar?.month ?? '0');
  };

  useEffect(() => {
    if (!id) return;
    onSetValue();
  }, [id]);

  const onSave = () => {
    const values = getValues();
    if (id) {
      if (!foundCurrentUser) return;
      const updatedUser: IUser = {
        ...foundCurrentUser,
        id: id as string,
        profession: values.profession,
        salary: {
          salary: values.salary.salary,
        },
        spending: {
          ...foundCurrentUser.spending,
          apartments: values.spending.apartments,
          food: values.spending.food,
          education: values.spending.education,
          clothes: values.spending.clothes,
          internet: values.spending.internet,
          travel: values.spending.travel,
          child: {
            cost: values.spending.child.cost,
            count: foundCurrentUser.spending.child.count,
          },
          creditApartments: {
            full: values.spending.creditApartments.full,
            month: values.spending.creditApartments.month,
          },
          creditCar: {
            full: values.spending.creditCar.full,
            month: values.spending.creditCar.month,
          },
        },
      };
      dispatch(updateUserInfo(updatedUser));
      reset();
      navigation.push(`/${TypeNavigation.TABS}`);
      return;
    }
    const generationId = generateNonce();
    const createdUser: IUser = {
      ...values,
      id: generationId,
      spending: {
        ...values.spending,
        child: {
          cost: values.spending.child.cost,
          count: '0',
        },
      },
      status: UserStatus.created,
      isDivorced: false,
      assets: [],
    };
    dispatch(setUserInList(createdUser));
    reset();
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
          {!id ? (
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
          ) : null}
          {!id ? (
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder={'Enter your price of dream'}
                  error={errors?.dream?.price}
                  keyboardType={'number-pad'}
                  label={'Price of Dream'}
                />
              )}
              name="dream.price"
              defaultValue=""
            />
          ) : null}
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
                keyboardType={'number-pad'}
                label={'Salary'}
              />
            )}
            name="salary.salary"
            defaultValue=""
          />
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  render={({ field: { onChange, value } }) => (*/}
          {/*    <InputComponent*/}
          {/*      value={value ?? ''}*/}
          {/*      onChange={onChange}*/}
          {/*      placeholder={'Enter your passive Business Salary'}*/}
          {/*      error={errors?.salary?.passiveBusinessSalary}*/}
          {/*      label={'Business Salary'}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  name="salary.passiveBusinessSalary"*/}
          {/*  defaultValue=""*/}
          {/*/>*/}
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  render={({ field: { onChange, value } }) => (*/}
          {/*    <InputComponent*/}
          {/*      value={value ?? ''}*/}
          {/*      onChange={onChange}*/}
          {/*      placeholder={'Enter your passive Immovable Salary'}*/}
          {/*      error={errors?.salary?.passiveImmovableSalary}*/}
          {/*      label={'Immovable Salary'}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  name="salary.passiveImmovableSalary"*/}
          {/*  defaultValue=""*/}
          {/*/>*/}
          {!id ? (
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder={'Enter your start capital'}
                  error={errors.currentCapital}
                  label={'Starting Capital'}
                  keyboardType={'number-pad'}
                />
              )}
              name="currentCapital"
              defaultValue=""
            />
          ) : null}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
              />
            )}
            name="spending.creditCar.month"
            defaultValue=""
          />
        </View>
        <ButtonComponent
          onPress={handleSubmit(onSave)}
          title={id ? 'Save new profession' : 'Save & start a new game'}
        />
      </ContainerScrollComponent>
    </>
  );
};

export default Form;
