import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [isShowingUpdate, setIsShowingUpdate] = useState(false);
    const [isOpenPermission, setOpenPermission] = useState(false);
    const [isOpenChangePass, setOpenChangePass] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }
    function toggleUpdate() {
        setIsShowingUpdate(!isShowingUpdate);
    }
    function toggleFormPermission() {
        setOpenPermission(!isOpenPermission)
    }
    function toggleFormChangePass() {
        setOpenChangePass(!isOpenChangePass)
    }
    return {
        isShowing,
        toggle,
        isShowingUpdate,
        toggleUpdate,
        isOpenPermission,
        toggleFormPermission,
        isOpenChangePass,
        toggleFormChangePass
    }
};

export default useModal;