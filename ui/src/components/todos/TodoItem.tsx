import React, { useState } from 'react';
import moment from 'moment';
import { EuiCheckbox, htmlIdGenerator, EuiTitle, EuiListGroupItem } from '@elastic/eui';
import { ITodo, TodoPriority } from '../../types';
import { updateTodo } from '../../requests';

export default function TodoItem({ item, onUpdated }: { item: ITodo, onUpdated: Function }) {
    const [checked, setCheck] = useState(item.completed);
    console.log(item.title, item.completed, checked)
    const isOverdue = !!item.dueDate && moment().isAfter(item.dueDate, 'day');

    const handleToogleTodo = async () => {
        const value = !checked;
        setCheck(value);
        await updateTodo(item._id, { completed: value });
        onUpdated()
    }

    const handleDeleteTodo = () => {

    }

    const colorOfTodo = (item: ITodo): "inherit" | "ghost" | "primary" | "subdued" | "text" | undefined => {
        if (isOverdue) return 'text';
        switch (item.priority) {
            case TodoPriority.High:
                return "ghost";
            case TodoPriority.Low:
                return 'inherit';
            case TodoPriority.Normal:
            default:
                return 'subdued'
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
                    <EuiTitle size="xxs"><h5>{item.title}</h5></EuiTitle>
                    {isOverdue ? <span>Overdue {moment(item.dueDate).format("MMM Do YY")} </span> : item.dueDate? <span>Due on {moment(item.dueDate).format("MMM Do YY")}</span> : null}
                </div>
            }
            onClick={() => {}}
            color={colorOfTodo(item)}
            extraAction={{
                color: 'subdued',
                onClick: handleDeleteTodo,
                iconType: 'minusInCircle',
                iconSize: 's',
                'aria-label': 'Delete todo',
            }}
            style={{ borderBottom: '1px solid #e1e1e1' }}
        />

    )
}