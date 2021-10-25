import React from 'react';
import { TicketStatus, Badge } from '@vallorisolutions/foa-design-system';

export const TicketStatusBadge = (status: TicketStatus): Record<string, React.ReactNode> | undefined => {
    return [
        {
            label: TicketStatus.OPEN,
            badge: <Badge label={TicketStatus.OPEN} variant="blue" secondary bordered />,
        },
        {
            label: TicketStatus.SOLVED,
            badge: <Badge label={TicketStatus.SOLVED} variant="green" secondary bordered />,
        },
        {
            label: TicketStatus.CANCELED,
            badge: <Badge label={TicketStatus.CANCELED} variant="gray" secondary bordered />,
        },
        {
            label: TicketStatus.WAITING_S,
            badge: <Badge label={TicketStatus.WAITING_S} variant="light_blue" secondary bordered />,
        },
        {
            label: TicketStatus.WAITING_O,
            badge: <Badge label={TicketStatus.WAITING_O} variant="yellow" secondary bordered />,
        },
    ].find(({ label }) => label === status);
};
