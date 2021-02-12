import React, { Fragment } from 'react';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import TodoItem from './TodoItem';

export default function TodoList({ todos = []}) {
    return (
        <Fragment>
            <EuiFlexGroup alignItems="center">
                {
                    todos.map((item, index) => <TodoItem key={index} item={item} />)
                }
            </EuiFlexGroup>
        </Fragment>

    )
}