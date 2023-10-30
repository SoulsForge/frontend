import { useState, ChangeEvent } from 'react';

const useFormState = <T>(initialState: T) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value as T });
  };

  const handleChangeManually = (name, value) => {
    setFormState({ ...formState, [name]: value as T });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return {
    formState,
    handleChange,
    handleChangeManually,
    resetForm
  };
};

export default useFormState;
