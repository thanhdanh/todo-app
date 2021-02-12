import React, { useState } from 'react';
import { EuiCheckableCard, EuiFlexItem, htmlIdGenerator } from '@elastic/eui';
import { ITodo } from '../../interfaces/todo.interface';

export default function TodoItem({ item, key }: { item: ITodo, key: number }) {
    const [checked, setCheck] = useState(item.completed);

    const handleToogleCompleteOfTodo = () => {

    }

    return (
        <EuiFlexItem key={key}>
            <EuiCheckableCard
                id={htmlIdGenerator()()}
                label={item.title}
                checkableType="checkbox"
                value="checkbox1"
                onChange={handleToogleCompleteOfTodo}
            />
        </EuiFlexItem>
    )
}