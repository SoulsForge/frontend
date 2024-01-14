import { useState, ChangeEvent, FormEvent } from 'react';

interface FormHookProps<T> {
  onSubmit: () => Promise<void>;
  initialState: T;
}


const useFormState = <T>({ initialState, onSubmit }: FormHookProps<T>) => {
  const [formState, setFormState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value as T });
  };

  const handleChangeManually = (name: any, value: any) => {
    setFormState({ ...formState, [name]: value as T });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit();
    } catch (e) {
      console.error('Error sending form: ', e);
    }
    setIsLoading(false);
  };

  return {
    formState,
    handleChange,
    handleChangeManually,
    resetForm,
    submitForm,
    isLoading
  };
};

export default useFormState;
