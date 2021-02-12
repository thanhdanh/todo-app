import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow } from '@elastic/eui';
import React, { useState } from 'react';
import { addNewTodo } from '../../requests';

export default function TodoAddForm() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            title: { value: string };
        };

        setLoading(true)
        await addNewTodo({ title: target.title.value })
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
                            placeholder="Quick add new Todo..."
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