import { useState, useCallback } from 'react';

const useModal = (initialValue = false) => {
    const [isShowing, setValue] = useState(initialValue);
    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);
    return [isShowing, toggle];
};

export default useModal;