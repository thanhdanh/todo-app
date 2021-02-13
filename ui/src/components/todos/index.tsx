import { EuiHeader, EuiHeaderLink, EuiHeaderLinks, EuiHeaderLogo, EuiHeaderSectionItem, EuiSpacer } from '@elastic/eui';
import React, { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchListTodos } from '../../requests';
import { setTodos } from "../../redux/actions";

import TodoAddForm from './TodoAddForm';
import TodoList from './Todos';

function Todos({ setTodos }: PropsFromRedux) {
    const fetchTodos = async () => {
        try {
            const list = await fetchListTodos();
            setTodos(list)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const handleAfterCreated = () => {
        fetchTodos();
    }

    const handleAfterUpdated = () => {
        fetchTodos();
    }

    return (
        <Fragment>
            <EuiHeader>
                <EuiHeaderSectionItem border="right">
                    <EuiHeaderLogo>Todo's | All Todo's</EuiHeaderLogo>
                </EuiHeaderSectionItem>
                <EuiHeaderSectionItem>
                    <EuiHeaderLinks aria-label="App navigation links example">
                        <EuiHeaderLink isActive>All</EuiHeaderLink>
                        <EuiHeaderLink iconType='clock'>Due Todo's</EuiHeaderLink>
                        <EuiHeaderLink iconType='checkInCircleFilled'>Done</EuiHeaderLink>
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

const connector = connect(null, { setTodos })
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Todos);