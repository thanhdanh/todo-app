import { EuiButtonGroup, EuiButtonIcon, EuiCheckbox, EuiDatePicker, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiTextArea, htmlIdGenerator } from '@elastic/eui';
import React, { useState } from 'react';
import { ITodo, TodoPriority } from '../../types';
import moment from 'moment';
import PropTypes from 'prop-types';


const ExampleCustomInput = ({ onClick }: { onClick: any }) => {
    return (
        <EuiButtonIcon
            aria-label="Choose due date"
            iconType="calendar"
            // aria-pressed={toggle3On}
            color={'primary'}
            onClick={onClick}
        />
    );
};

ExampleCustomInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
};


export default function TodoEditForm({ item }: { item: ITodo }) {
    const [checked, setChecked] = useState(item.completed);
    const [dueDate, setDueDate] = useState(item.dueDate ? moment(item.dueDate) : moment());

    const priorityToggleButtons = [
        {
            id: TodoPriority.Low,
            label: TodoPriority.Low,
        },
        {
            id: TodoPriority.Normal,
            label: TodoPriority.Normal
        },
        {
            id: TodoPriority.High,
            label: TodoPriority.High
        },
    ];

    const [
        priotiryToggleButtonsIdSelected,
        setPritorityToggleButtonsIdSelected,
    ] = useState(item.priority);

    const onPriorityChange: any = (optionId: TodoPriority) => {
        setPritorityToggleButtonsIdSelected(optionId);
    };

    const onDueDateChange: any = (data: moment.Moment) => {
        setDueDate(data);
    };

    return (
        <EuiForm component="form">
            <EuiFormRow label="Title">
                <EuiFieldText name="title" value={item.title} />
            </EuiFormRow>

            <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                    <EuiDatePicker
                        selected={dueDate}
                        onChange={onDueDateChange}
                        customInput={<ExampleCustomInput />}
                    />
                    {item.dueDate && <span>Due on {moment(item.dueDate, 'L')}</span>}
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiFormRow label="Complete todo">
                        <EuiCheckbox
                            id={htmlIdGenerator()()}
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                    </EuiFormRow>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiFormRow label="Priority">
                <EuiButtonGroup
                    legend="Granulariy of zoom levels"
                    options={priorityToggleButtons}
                    idSelected={priotiryToggleButtonsIdSelected}
                    onChange={onPriorityChange}
                    buttonSize="compressed"
                    isFullWidth
                />
            </EuiFormRow>
            <EuiFormRow label="Description">
                <EuiTextArea
                    placeholder="Descibe more about your todo"
                    aria-label="Use aria labels when no actual label is in use"
                    value={item.description}
                    onChange={(e) => { }}
                />
            </EuiFormRow>
        </EuiForm>
    )
}