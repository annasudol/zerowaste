import { Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { FC, ReactElement } from 'react';
const formRef = React.createRef<FormInstance>();

interface ListInputProps {
    placeholder?: string
    setDetailedIngredients(value: string[]): void
    form(detailedIngredients: string[]): void
    detailedIngredients: string[]
}

export const ListInput: FC<ListInputProps> = ({ setDetailedIngredients, detailedIngredients, form }): ReactElement => {
    const [input, setInput] = React.useState<string>('')

    const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    };

    const handleIngredientsChange = () => {
        setDetailedIngredients([...detailedIngredients, input]);
        formRef.current?.resetFields();
        setInput('');
    };

    React.useEffect(() => {
        form(detailedIngredients)
    }, [detailedIngredients, form])

    return (
        <>
            <Input onChange={handleIngredientChange} value={input} />
            <Button type='dashed' onClick={handleIngredientsChange} disabled={input.length < 4}>Add Ingredient</Button>
        </>
    );
}
