import React, { useState, useEffect } from 'react';
import * as AntdIcons from '@ant-design/icons';
const MyIcon = (props) => {
    var type = props.type;
    if (AntdIcons[type]) {
        const AntdIcon = AntdIcons[type] // not AntdIcons[iconDetails.render] as @Cea mention;
        return <AntdIcon />
    }
    else {
        return ""
    }


}
export default MyIcon;