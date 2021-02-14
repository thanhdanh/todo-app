import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow } from '@elastic/eui';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CreateTodoDto } from '../../dto/create-todo.dto';
import { RootState } from '../../redux/reducers';
import { addNewTodo } from '../../requests';
import { FilterStatusTodo } from '../../types';

type Props = PropsFromRedux & { onCreated: Function }

function TodoAddForm({ onCreated, activeFilter }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            title: { value: string };
        };

        setLoading(true)
        
        const newTodoItemData: CreateTodoDto = { title: target.title.value };
        if (activeFilter === FilterStatusTodo.COMPLETED) {
            newTodoItemData.completed = true;
        }

        await addNewTodo(newTodoItemData).then(() => onCreated())
        setLoading(false)
        setTitle('')
    }

    const handleChangeInput = (event: React.ChangeEvent) => {
        const target = event.target as typeof event.target & {
            title: { value: string };
        };

        setTitle(target.title.value)
    }

    return (
        <EuiForm component="form" onSubmit={handleSubmit}>
            <EuiFlexGroup>
                <EuiFlexItem>
                    <EuiFormRow fullWidth>
                        <EuiFieldText
                            name="title"
                            icon="arrowRight"
                            placeholder={activeFilter === FilterStatusTodo.COMPLETED ? "Quick add new Done todo...": "Quick add new Todo..." }
                            fullWidth
                            isLoading={loading}
                            value={title}
                            onChange={handleChangeInput}
                        />
                    </EuiFormRow>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiForm>
    )
}

const mapStateToProps = (state: RootState) => {
    return { activeFilter: state.todos.visibilityFilter };
};

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(TodoAddForm);