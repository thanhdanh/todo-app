import {
    EuiBadge,
    EuiButton,
    EuiButtonGroup,
    EuiCheckbox,
    EuiDatePicker,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiForm,
    EuiFormRow,
    EuiTextArea,
    htmlIdGenerator
} from '@elastic/eui';
import React, { useCallback, useState } from 'react';
import { ITodo, TodoPriority } from '../../types';
import moment from 'moment';
import PropTypes from 'prop-types';
import { updateTodo } from '../../requests';
import { debounce } from "lodash";


const ExampleCustomInput = ({ onClick, value }: { onClick: any, value: any }) => {
    return (
        <EuiButton
            aria-label="Choose due date"
            iconType="calendar"
            iconSide="left"
            title="Set due date"
            onClick={onClick}
        >
            {moment(value).calendar(null, {
                 sameDay: '[Today]',
                 nextDay: '[Tomorrow]',
                 nextWeek: 'dddd',
                 lastDay: '[Yesterday]',
                 lastWeek: '[Last] dddd',
                 sameElse: 'DD/MM/YYYY'
            })}
        </EuiButton>
    );
};

ExampleCustomInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
};


export default function TodoEditForm({ item }: { item: ITodo }) {
    const [title, setTitle] = useState(item.title);
    const [checked, setChecked] = useState(item.completed);
    const [dueDate, setDueDate] = useState(item.dueDate ? moment(item.dueDate) : moment());

    const handlerFunctionWithDebounce = useCallback(debounce((data: Object) => updateTodo(item._id, data), 400), []);
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

    const onPriorityChange: any = async (optionId: TodoPriority) => {
        setPritorityToggleButtonsIdSelected(optionId);
        handlerFunctionWithDebounce({ priority: optionId })
    };

    const onDueDateChange: any = async (data: moment.Moment) => {
        setDueDate(data);
        handlerFunctionWithDebounce({ dueDate: data.toString() })
    };

    const onTitleChange = async (value: string) => {
        setTitle(value);
        handlerFunctionWithDebounce({ title: value })
    }

    const onDescriptionChange = async (value: string) => {
        handlerFunctionWithDebounce({ description: value })
    }

    const onCheckCompleteChange = async (value: boolean) => {
        setChecked(value)
        handlerFunctionWithDebounce({ completed: value })
    }


    return (
        <EuiForm component="form">
            <EuiFormRow label="Title">
                <EuiFieldText name="title" value={title} onChange={(e) => onTitleChange(e.target.value)} />
            </EuiFormRow>
            <EuiFormRow>
                <EuiCheckbox
                    id={htmlIdGenerator()()}
                    checked={checked}
                    label="Complete todo"
                    onChange={() => onCheckCompleteChange(!checked)}
                />
            </EuiFormRow>
            <EuiFormRow>
                <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                        <EuiDatePicker
                            selected={dueDate}
                            onChange={onDueDateChange}
                            customInput={<ExampleCustomInput />}
                        />
                        {
                            item.dueDate && 
                            <EuiBadge color={moment().isBefore(dueDate, 'day') ? "secondary" : "#FCF7BC"}>
                                Due on {dueDate.format('ll')}
                            </EuiBadge>
                        }

                    </EuiFlexItem>
                    
                </EuiFlexGroup>
            </EuiFormRow>

            <EuiFormRow>
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
                    placeholder="Describe more about your todo"
                    aria-label="Use aria labels when no actual label is in use"
                    value={item.description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
            </EuiFormRow>
        </EuiForm>
    )
}