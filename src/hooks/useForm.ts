import { useEffect, useMemo, useState } from 'react';

export type FormValidationRules<T extends object> = {
  [key in keyof T]: [(value: unknown) => boolean, string];
};

type FormValidations<T extends object> = {
  [key in keyof T as `${string & key}Valid`]: string | null;
};

export const useForm = <T extends object>(
  initialForm: T,
  formValidationRules?: FormValidationRules<T>
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<FormValidations<T>>(
    {} as FormValidations<T>
  );

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof FormValidations<T>] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: never) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    if (!formValidationRules) return;
    const formCheckValues = {} as FormValidations<T>;

    for (const formField of Object.keys(formValidationRules) as (keyof T)[]) {
      const [fn, errorMessage] = formValidationRules[formField];

      formCheckValues[`${String(formField)}Valid` as keyof FormValidations<T>] = (
        fn(formState[formField]) ? null : errorMessage
      ) as FormValidations<T>[keyof FormValidations<T>];
    }

    setFormValidation(formCheckValues as FormValidations<T>);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
    ...formValidation,
  };
};
