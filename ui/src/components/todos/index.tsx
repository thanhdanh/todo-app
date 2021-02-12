import { EuiHeader, EuiHeaderLink, EuiHeaderLinks, EuiHeaderLogo, EuiHeaderSectionItem, EuiSpacer } from '@elastic/eui';
import React, { Fragment } from 'react';
import TodoAddForm from './TodoAddForm';
import TodoList from './Todos';

export default function Todos() {
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
            <TodoAddForm />
            <EuiSpacer size="s" />
            <TodoList />
        </Fragment>
    )
}