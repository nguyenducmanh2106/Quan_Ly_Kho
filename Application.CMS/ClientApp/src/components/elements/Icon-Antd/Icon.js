import React, { useState, useEffect } from 'react';
import * as AntdIcons from '@ant-design/icons';
const MyIcon = (props) => {
    var type = props.type;
    const AntdIcon = AntdIcons[type] ?? AntdIcons["BarChartOutlined"] // not AntdIcons[iconDetails.render] as @Cea mention;
    return <AntdIcon />
}
export default MyIcon;