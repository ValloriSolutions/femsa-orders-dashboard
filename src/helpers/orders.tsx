import React from 'react';
import { OrderStatus, Badge } from '@vallorisolutions/foa-design-system';

export const OrderStatusBadges = (status: OrderStatus): Record<string, React.ReactNode> | undefined => {
    return [
        {
            label: OrderStatus.DRAFT,
            badge: <Badge label={OrderStatus.DRAFT} variant="gray" bordered />,
        },
        {
            label: OrderStatus.ORDER_CANCELED,
            badge: <Badge label={OrderStatus.ORDER_CANCELED} variant="red" bordered />,
        },
        {
            label: OrderStatus.ORDER_CLOSED,
            badge: <Badge label={OrderStatus.ORDER_CLOSED} variant="red" bordered />,
        },
        {
            label: OrderStatus.ORDER_CREATED,
            badge: <Badge label={OrderStatus.ORDER_CREATED} variant="green" bordered />,
        },
        {
            label: OrderStatus.ORDER_RECEIVED,
            badge: <Badge label={OrderStatus.ORDER_RECEIVED} variant="blue" bordered />,
        },
        {
            label: OrderStatus.ORDER_SENT,
            badge: <Badge label={OrderStatus.ORDER_SENT} variant="light_blue" bordered />,
        },
        {
            label: OrderStatus.ORDER_SOLVED,
            badge: <Badge label={OrderStatus.ORDER_SOLVED} variant="gray" bordered />,
        },
        {
            label: OrderStatus.PAUSED,
            badge: <Badge label={OrderStatus.PAUSED} variant="yellow" bordered />,
        },
        {
            label: OrderStatus.PENDING_APPROVAL,
            badge: <Badge label={OrderStatus.PENDING_APPROVAL} variant="yellow" bordered />,
        },
        {
            label: OrderStatus.REQUISITION_CREATED,
            badge: <Badge label={OrderStatus.REQUISITION_CREATED} variant="blue" bordered />,
        },
        {
            label: OrderStatus.REQUISITION_SENT,
            badge: <Badge label={OrderStatus.REQUISITION_SENT} variant="green" bordered />,
        },
        {
            label: OrderStatus.SENIOR_APPROVED,
            badge: <Badge label={OrderStatus.SENIOR_APPROVED} variant="green" bordered />,
        },
        {
            label: OrderStatus.SENIOR_REPROVED,
            badge: <Badge label={OrderStatus.SENIOR_REPROVED} variant="red" bordered />,
        },
        {
            label: OrderStatus.WAITING_CONTRACT,
            badge: <Badge label={OrderStatus.WAITING_CONTRACT} variant="blue" bordered />,
        },
        {
            label: OrderStatus.WAITING_PAYMENT,
            badge: <Badge label={OrderStatus.WAITING_PAYMENT} variant="blue" bordered />,
        },
    ].find(({ label }) => label === status);
};
