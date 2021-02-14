import { EuiHeader, EuiHeaderLink, EuiHeaderLinks, EuiHeaderLogo, EuiHeaderSectionItem, EuiSpacer } from '@elastic/eui';
import React, { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchListTodos } from '../../requests';
import { setTodos, setVisibleFilter } from "../../redux/actions";

import TodoAddForm from './TodoAddForm';
import TodoList from './Todos';
import { RootState } from '../../redux/reducers';
import { FilterStatusTodo } from '../../types';

function Todos({ setTodos, activeFilter, setVisibleFilter }: PropsFromRedux) {
    const fetchTodos = async () => {
        try {
            const list = await fetchListTodos();
            setTodos(list)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchTodos();
    })

    const handleAfterCreated = () => {
        fetchTodos();
    }

    const handleAfterUpdated = () => {
        fetchTodos();
    }

    const getPropsOfFilterLink = (type: FilterStatusTodo) => {
        return {
            isActive: activeFilter === type,
            onClick: () => setVisibleFilter(type)
        }
    }

    return (
        <Fragment>
            <EuiHeader>
                <EuiHeaderSectionItem border="right">
                    <EuiHeaderLogo>Todo's | All Todo's</EuiHeaderLogo>
                </EuiHeaderSectionItem>
                <EuiHeaderSectionItem>
                    <EuiHeaderLinks>
                        <EuiHeaderLink {...getPropsOfFilterLink(FilterStatusTodo.ALL)}>All</EuiHeaderLink>
                        <EuiHeaderLink {...getPropsOfFilterLink(FilterStatusTodo.OVERDUE)} iconType='clock'>Due Todo's</EuiHeaderLink>
                        <EuiHeaderLink {...getPropsOfFilterLink(FilterStatusTodo.COMPLETED)}  iconType='checkInCircleFilled'>Done</EuiHeaderLink>
                    </EuiHeaderLinks>
                </EuiHeaderSectionItem>
            </EuiHeader>
            <EuiSpacer size="s" />
            <TodoAddForm onCreated={handleAfterCreated} />
            <EuiSpacer size="s" />
            <TodoList onUpdated={handleAfterUpdated} />
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => {
    return { activeFilter: state.todos.visibilityFilter };
};
const connector = connect(mapStateToProps, { setTodos, setVisibleFilter })
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Todos);