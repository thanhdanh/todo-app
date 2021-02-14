import React, { Fragment, useState } from 'react';
import { EuiFlyout, EuiFlyoutBody, EuiListGroup } from '@elastic/eui';
import TodoItem from './TodoItem';
import { RootState } from '../../redux/reducers';
import { getTodosByVisibilityFilter } from '../../redux/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { ITodo } from '../../types';
import TodoEditForm from './TodoEditForm';

type Props = PropsFromRedux & {
    onUpdated: Function
}

function TodoList({ todos, onUpdated }: Props) {
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const [itemSelecting, setItemSelecting] = useState<ITodo | undefined>(undefined);

    let TodoSeclecting;

    const handleSelectItem = (item: ITodo) => {
        setItemSelecting(item);
        setIsFlyoutVisible(true);
    }

    const handleCloseShowItem = () => {
        setIsFlyoutVisible(false);
        setItemSelecting(undefined);
        onUpdated();
    }


    if (isFlyoutVisible && itemSelecting) {
        TodoSeclecting = (
            <EuiFlyout
                ownFocus
                size="s"
                onClose={handleCloseShowItem}
            >
               
                <EuiFlyoutBody>
                    <TodoEditForm item={itemSelecting} />
                </EuiFlyoutBody>
            </EuiFlyout>
        )
    }

    return (
        <Fragment>
            <EuiListGroup gutterSize="s">
                {
                    todos.map((item) => (
                        <Fragment key={item._id}>
                            <TodoItem item={item} onUpdated={onUpdated} onSelect={() => handleSelectItem(item)} />
                        </Fragment>
                    ))
                }
            </EuiListGroup>
            {TodoSeclecting}
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