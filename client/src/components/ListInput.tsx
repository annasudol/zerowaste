import { Form, Input, Button, Select, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { AutoComplete, List } from '../components'
import * as React from 'react';

const formRef = React.createRef<FormInstance>();


// tslint:disable-next-line: no-empty-interface
interface ListInputProps {
    placeholder?: string
    setDetailedIngredients(value: string[]): void
    form(detailedIngredients: string[]): void
    detailedIngredients: string[] | []
}
export const ListInput: React.FC<ListInputProps> = ({ setDetailedIngredients, detailedIngredients, form }): any => {
    const [input, setInput] = React.useState<string>('')

    const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setInput(event.target.value)

    };

    const handleIngredientsChange = () => {
        setDetailedIngredients([...detailedIngredients, input]);
        formRef.current?.resetFields();
        setInput('');
    };

    React.useEffect(() => {
        form(detailedIngredients)
    }, [detailedIngredients])

    return (
        <>
            <Input onChange={handleIngredientChange} value={input} />
            <Button type='dashed' onClick={handleIngredientsChange} disabled={input.length < 4}>Add Ingredient</Button>
        </>


    );
}
