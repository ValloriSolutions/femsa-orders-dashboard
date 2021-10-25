import { FlexBox, Typography, Avatar, colors } from '@vallorisolutions/foa-design-system';
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
                <Typography as="h6" customStyles={{ color: colors.red }}>
                    {name}
                </Typography>
                <Typography as="small" customStyles={{ color: colors.colors.gray.light, marginTop: 5 }}>
                    {date}
                </Typography>
            </FlexBox>
        </FlexBox>
    );
};

export default UserHeader;
