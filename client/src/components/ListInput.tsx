import { Form, Input, Button, Select, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { AutoComplete, List } from "../components"
import * as React from "react";

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const formRef = React.createRef<FormInstance>();


const validateMessages = {
    required: '${label} is required!',
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

// tslint:disable-next-line: no-empty-interface
interface ListInputProps {
    placeholder?: string
    setDetailedIngredients(value: string[]): void
    form(detailedIngredients: string[]): void
    detailedIngredients: string[] | []
}
export const ListInput: React.FunctionComponent<ListInputProps> = ({ setDetailedIngredients, detailedIngredients, form }): any => {
    const [input, setInput] = React.useState<string>("")

    // const onFinish = values => {
    //     console.log(input);
    // };




    const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        setInput(event.target.value)

    };

    const handleIngredientsChange = () => {
        setDetailedIngredients([...detailedIngredients, input]);
        formRef.current?.resetFields();
        // detailedIngredients(detailedIngredients)
        setInput("");
    };

    React.useEffect(() => {
        form(detailedIngredients)
    }, [detailedIngredients])

    return (
        <>
            <Input onChange={handleIngredientChange} value={input} />
            <Button type="dashed" onClick={handleIngredientsChange} disabled={input.length < 4}>Add Ingredient</Button>
        </>


    );
}
// deleteItem={(text: string): any => deleteDetailedIngredients(text)}