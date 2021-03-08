import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [isShowingUpdate, setIsShowingUpdate] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }
    function toggleUpdate() {
        setIsShowingUpdate(!isShowingUpdate);
    }
    return {
        isShowing,
        toggle,
        isShowingUpdate,
        toggleUpdate
    }
};

export default useModal;