import { FlexBox, Typography, Avatar } from '@vallorisolutions/foa-design-system';
import React from 'react';

interface UserHeaderProps {
    name: string;
    avatar: string;
    date: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, avatar, date }) => {
    return (
        <FlexBox direction="row" customStyles={{ padding: 0 }}>
            <Avatar alt={name} imageUrl={avatar} size="sm" />

            <FlexBox verticalAlign="flex-start" horizontalAlign="center" customStyles={{ padding: '0 0 0 12px' }}>
                <Typography as="h6">{name}</Typography>
                <Typography as="small">{date}</Typography>
            </FlexBox>
        </FlexBox>
    );
};

export default UserHeader;
