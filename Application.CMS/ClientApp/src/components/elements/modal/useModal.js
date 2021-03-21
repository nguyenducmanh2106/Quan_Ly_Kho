import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [isShowingUpdate, setIsShowingUpdate] = useState(false);
    const [isOpenPermission, setOpenPermission] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }
    function toggleUpdate() {
        setIsShowingUpdate(!isShowingUpdate);
    }
    function toggleFormPermission() {
        setOpenPermission(!isOpenPermission)
    }
    return {
        isShowing,
        toggle,
        isShowingUpdate,
        toggleUpdate,
        isOpenPermission,
        toggleFormPermission
    }
};

export default useModal;