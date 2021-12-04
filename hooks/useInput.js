import { useState, useCallback } from 'react';

const useInput = ({ init }) => {
  const [value, setValue] = useState(init || '');

  const onChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [value]
  );
  return { value, onChange, setValue };
};

export default useInput;
