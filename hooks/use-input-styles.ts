import { useEffect, useState } from 'react';

import { FieldError } from 'react-hook-form';

export const useInputStyles = (error?: FieldError) => {
  const [focusStyle, setFocusStyle] = useState('border-gray-300 text-gray-900');

  useEffect(() => {
    if (!!error) {
      setFocusStyle('border-red-600 text-gray-900');
      return;
    }
    setFocusStyle('border-gray-300 text-gray-900');
  }, [error]);

  const onFocus = () => {
    if (!!error) {
      setFocusStyle('border-red-600 text-gray-900');
      return;
    }
    setFocusStyle('border-gray-900 text-gray-900');
  };

  const onBlur = () => {
    if (!!error) {
      setFocusStyle('border-red-600 text-gray-900');
      return;
    }
    setFocusStyle('border-gray-300 text-gray-900');
  };

  return { focusStyle, onBlur, onFocus };
};
