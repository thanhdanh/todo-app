import React, { useState } from 'react';
import moment from 'moment';
import { EuiCheckbox, htmlIdGenerator, EuiTitle, EuiListGroupItem, EuiBadge, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { ITodo, TodoPriority } from '../../types';
import { updateTodo, deleteTodo } from '../../requests';

export default function TodoItem({ item, onUpdated, onSelect }: { item: ITodo, onUpdated: Function, onSelect: Function }) {
    const [checked, setCheck] = useState(item.completed);
    const isOverdue = !!item.dueDate && moment().isAfter(item.dueDate, 'day');

    const handleToogleTodo = async () => {
        const value = !checked;
        setCheck(value);
        await updateTodo(item._id, { completed: value });
        onUpdated()
    }

    const handleDeleteTodo = async () => {
        await deleteTodo(item._id);
        onUpdated()
    }

    const getPriorityBadge = (item: ITodo) => {
        if (isOverdue) return <EuiBadge color="warning">{item.priority}</EuiBadge>
        switch (item.priority) {
            case TodoPriority.High:
                return <EuiBadge color="accent">{item.priority}</EuiBadge>
            case TodoPriority.Low:
                return <EuiBadge color="default">{item.priority}</EuiBadge>
            case TodoPriority.Normal:
            default:
                return <EuiBadge color="primary">{item.priority}</EuiBadge>
        }
    }

    return (
        <EuiListGroupItem
            icon={
                <EuiCheckbox
                    id={htmlIdGenerator()()}
                    checked={checked}
                    onChange={handleToogleTodo}
                />
            }
            label={
                <div>
                    <EuiTitle size="xxs"><h4>{item.title}</h4></EuiTitle>
                    <EuiFlexGroup justifyContent="spaceBetween">
                        <EuiFlexItem grow={false}>{getPriorityBadge(item)}</EuiFlexItem>
                        <EuiFlexItem grow={false}>
                        {isOverdue ? <small>Overdue {moment(item.dueDate).format("ll")} </small> : item.dueDate ? <small>Due on {moment(item.dueDate).format("ll")}</small> : null}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </div>
            }
            onClick={() => onSelect()}
            extraAction={{
                color: 'danger',
                onClick: handleDeleteTodo,
                iconType: 'minusInCircle',
                iconSize: 's',
                'aria-label': 'Delete todo',
            }}
            style={{ borderBottom: '1px solid #e1e1e1', width: '100%' }}
        />

    )
}