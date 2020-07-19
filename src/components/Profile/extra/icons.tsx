import React from 'react';
import {
    Icon,
    IconElement,
    useTheme
} from '@ui-kitten/components'

export const PinIcon = (): IconElement => {
    const theme = useTheme();
    return (
      <Icon
        width={16}
        height={16}
        fill={theme["text-control-color"]}
        name="pin"
      />
    );
};

export const SettingsIcon = (): IconElement => {
    return (
      <Icon
        width={16}
        height={16}
        fill="white"
        name='settings-2'/>
    )
}

export const PersonIcon = (): IconElement => {
    return (
        <Icon
            width={18}
            height={18}
            fill='black'
            name='person-outline'/>
    )
}

export const PeopleIcon = (): IconElement => {
    return (
        <Icon
            width={18}
            height={18}
            fill='black'
            name='people-outline'/>
    )
}

export const InterestsIcon = (): IconElement => {
    return (
        <Icon
            width={18}
            height={18}
            fill='black'
            name='color-palette-outline'/>
    )
}

export const LockIcon = (): IconElement => {
    return (
        <Icon
            width={18}
            height={18}
            fill='black'
            name='lock-outline'/>
    )
}

export const ForwardIcon = (): IconElement => {
    return (
        <Icon
            width={24}
            height={24}
            fill="grey"
            name='arrow-ios-forward-outline'/>
    )
}

export const CameraIcon = (): IconElement => {
    return <Icon style={{
        "height": 20,
        "marginHorizontal": 10,
        "tintColor": "#222B45",
        "width": 20
    }} name='camera'/>
};