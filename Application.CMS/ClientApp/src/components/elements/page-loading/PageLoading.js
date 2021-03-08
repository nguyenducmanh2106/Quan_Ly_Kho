import React from 'react';
import classes from './PageLoading.module.scss';
//<span>L</span>
//            <span>o</span>
//            <span>a</span>
//            <span>d</span>
//            <span>i</span>
//            <span>n</span>
//            <span>g</span>
//            <span>.</span>
//            <span>.</span>
//            <span>.</span>
const PageLoading = () => {
    return (
        <div className={classes.loading}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="78px" height="78px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx={50} cy={50} fill="none" stroke="#292664" strokeWidth={7} r={28} strokeDasharray="131.94689145077132 45.982297150257104">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.641025641025641s" values="0 50 50;360 50 50" keyTimes="0;1" />
                </circle>
            </svg>
        </div>
    );
};

export default PageLoading;
