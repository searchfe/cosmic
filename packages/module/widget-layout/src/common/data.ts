import { ConstraintType } from '@cosmic/core/parts';
export const HorizontalStretchValue = [
    {
        label: '宽度固定',
        value: 0,
    },
    {
        label: '适应内容',
        value: 1,
    },
];



export const VerticalStretchValue = [
    {
        label: '高度固定',
        value: 0,
    },
    {
        label: '适应内容',
        value: 1,
    },
];


export const HorizontalConstraintOptions = [
    {
        label: '靠左固定',
        value: ConstraintType.MIN,
    },
    {
        label: '靠右固定',
        value: ConstraintType.MAX,
    },
    {
        label: '居中固定',
        value: ConstraintType.CENTER,
    },
    {
        label: '左右固定',
        value: ConstraintType.STRETCH,
    },
    {
        label: '水平等比',
        value: ConstraintType.SCALE,
    },
];

export const VerticalConstraintOptions = [
    {
        label: '靠上固定',
        value: ConstraintType.MIN,
    },
    {
        label: '靠下固定',
        value: ConstraintType.MAX,
    },
    {
        label: '居中固定',
        value: ConstraintType.CENTER,
    },
    {
        label: '上下固定',
        value: ConstraintType.STRETCH,
    },
    {
        label: '垂直等比',
        value: ConstraintType.SCALE,
    },
];
