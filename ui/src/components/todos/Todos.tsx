import React, { Fragment } from 'react';
import { EuiListGroup } from '@elastic/eui';
import TodoItem from './TodoItem';
import { RootState } from '../../redux/reducers';
import { getTodosByVisibilityFilter } from '../../redux/selectors';
import { connect, ConnectedProps } from 'react-redux';

type Props = PropsFromRedux & {
    onUpdated: Function
}

function TodoList({ todos, onUpdated }: Props) {
    return (
        <Fragment>
            <EuiListGroup gutterSize="s">
                {
                    todos.map((item) => (
                        <Fragment key={item._id}>
                            <TodoItem item={item} onUpdated={onUpdated} />
                        </Fragment>
                    ))
                }
            </EuiListGroup>

        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => {
    const todos = getTodosByVisibilityFilter(state);
    return { todos };
};

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TodoList)