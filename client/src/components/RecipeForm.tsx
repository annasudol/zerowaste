import { Form, Input, Button, InputNumber } from 'antd';
const { TextArea } = Input;
import { FormInstance } from 'antd/lib/form';
import { AutoComplete, List, ListInput, ImageUpload } from "../components"
import * as React from "react";
import { RecipeStateProps } from "../utils/types";
import { useDispatch, } from 'react-redux';
import { actionFillInputs } from '../state/inputs/actions'

const tailLayout = { wrapperCol: { offset: 12, span: 12 } };
const formRef = React.createRef<FormInstance>();


const validateMessages = {
    required: '${label} is required!',
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};



interface RecipeFormProps {
    handleSubmit(inputValues: RecipeStateProps): void
    fillForm?: boolean
    defaultValues?: RecipeStateProps
}

export const RecipeForm: React.FunctionComponent<RecipeFormProps> = ({ handleSubmit, fillForm = false, defaultValues }): React.ReactElement => {
    const [ingredients, setIngredients] = React.useState<string[] | []>([])
    const [detailedIngredients, setDetailedIngredients] = React.useState<string[] | []>([])
    const [image, setImage] = React.useState<string | undefined>(undefined);
    const [error, setError] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (defaultValues) {
            formRef.current?.setFieldsValue({ ...defaultValues });
            setIngredients(defaultValues.ingredients)
            setDetailedIngredients(defaultValues.detailedIngredients)
        }
    }, [defaultValues]);

    const onFinish = values => {
        handleSubmit(values);
    };

    const onReset = () => {
        setDetailedIngredients([]);
        setIngredients([]);

        setError(false);
        formRef.current?.resetFields();
    };

    const onFill = () => {
        const sampleInputs = {
            title: "Apple Pie",
            servings: 8,
            readyInMinutes: 130,
            ingredients: ["sugar", "brown sugar", "flour", "cinnamon sugar", "ginger", "apple"],
            detailedIngredients: ["1/2 cup sugar", "1/2 cup packed brown sugar", "3 tablespoons all-purpose flour", "1 teaspoon ground cinnamon", "1/4 teaspoon ground ginger", "1/4 teaspoon ground nutmeg", "6 to 7 cups thinly sliced peeled tart apples", "1 tablespoon lemon juice", "Pastry for double-crust pie", "1 tablespoon butter"],
            instructions: "In a small bowl, combine the sugars, flour and spices; set aside. In a large bowl, toss apples with lemon juice. Add sugar mixture; toss to coat.\nPie plate with bottom crust; trim even with edge. Fill with apple mixture; dot with butter. Roll remaining crust to fit the top of pie; place overfilling. Trim, seal and flute edges. Cut slits in crust.\nBeat egg white until foamy; brush over crust. Sprinkle with sugar. Cover edges loosely with foil.\nBake at 375° for 25 minutes. Remove foil and bake until crust is golden brown and filling is bubbly, 20-25 minutes longer. Cool on a wire rack.", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABWCAYAAABVVmH3AAAMSGlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnltSSWiBCEgJvQkiSJcSQosgIFWwEZJAQokhIYjYlWUVXLuIgA1dFVF0dQVkrahrXQR7f1hQUdbFgg2VNymg637vve+d75t7/5w55z8lc++dAUCnhieV5qK6AORJCmTxESGsCalpLNIjgAMMaAEjYMTjy6XsuLhoAGXw/nd5ew0gyvtlFyXXP+f/q+gJhHI+AEgcxBkCOT8P4l8BwEv4UlkBAEQfqLeeXiBV4kkQG8hgghBLlThLjUuUOEONK1U2ifEciHcBQKbxeLIsALSboZ5VyM+CPNo3IHaTCMQSAHTIEAfyRTwBxJEQj8jLm6bE0A44ZHzDk/U3zowhTh4vawira1EJOVQsl+byZvyf7fjfkperGIxhBwdNJIuMV9YM+3YjZ1qUEtMg7pFkxMRCrA/xe7FAZQ8xShUpIpPU9qgpX86BPQNMiN0EvNAoiE0hDpfkxkRr9BmZ4nAuxHCFoEXiAm6ixneRUB6WoOGskU2Ljx3EmTIOW+PbwJOp4irtTypyktga/hsiIXeQ/02xKDFFnTNGLRQnx0CsDTFTnpMQpbbBbIpFnJhBG5kiXpm/DcR+QklEiJofm5IpC4/X2Mvy5IP1YotEYm6MBlcViBIjNTy7+DxV/kYQNwsl7KRBHqF8QvRgLQJhaJi6dqxdKEnS1It1SgtC4jW+r6S5cRp7nCrMjVDqrSA2lRcmaHzxwAK4INX8eIy0IC5RnSeekc0bG6fOBy8C0YADQgELKODIANNANhC39TT1wF/qmXDAAzKQBYTARaMZ9EhRzUjgNQEUgz8hEgL5kF+IalYICqH+85BWfXUBmarZQpVHDngMcR6IArnwt0LlJRmKlgweQY34H9H5MNdcOJRz/9SxoSZao1EM8rJ0Bi2JYcRQYi…",
            sourceUrl: "myblog.com"
        }
        formRef.current?.setFieldsValue({ ...sampleInputs });
        setError(false);
        setIngredients(sampleInputs.ingredients)
        setDetailedIngredients(sampleInputs.detailedIngredients)
    }


    const deleteDetailedIngredients = (text: string) => {
        const newList = detailedIngredients.filter(ingredient => ingredient !== text)
        setDetailedIngredients([...newList])
    };

    const onFinishFailed = errorInfo => {
        if (errorInfo.errorFields[3].errors) {
            return setError(true);
        }
    };

    return (
        <Form labelCol={{ span: 10 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            layout="horizontal" ref={formRef} name="control-ref" onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
            <Form.Item name="title" label="Title" rules={[{ required: true, min: 3 }]}>
                <Input />
            </Form.Item>
            <Form.Item name='servings' label="Servings" rules={[{ required: true, type: 'number', min: 1, max: 10 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name='readyInMinutes' label="Ready in Min." rules={[{ required: true, type: 'number', min: 5, max: 400 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Ingredients" name='ingredients' rules={[{ required: true, type: 'array', min: 1, max: 20 }]}>
                <AutoComplete error={error} list={ingredients} saveList={(value: string[]): void => setIngredients(value)} form={(value: string[]): void => formRef.current?.setFieldsValue({ ingredients: value })} />
            </Form.Item>
            <Form.Item label="Detailed Ingredients" name='detailedIngredients' rules={[{ required: true, type: 'array', min: 1, max: 10 }]}>
                <ListInput detailedIngredients={detailedIngredients} setDetailedIngredients={(value: string[]): void => setDetailedIngredients(value)} form={(value: string[]): void => formRef.current?.setFieldsValue({ detailedIngredients: value })} />
                <List list={detailedIngredients} deleteItem={(text: string): any => deleteDetailedIngredients(text)} />
            </Form.Item>
            <Form.Item name="instructions" label="Instructions" rules={[{ required: true, min: 10 }]}>
                <TextArea />
            </Form.Item>
            <Form.Item name="image" label="Image" rules={[{ required: true }]}>
                <ImageUpload image={image} setImage={(value: string): void => setImage(value)} form={(value: string): void => formRef.current?.setFieldsValue({ image: value })} />
            </Form.Item>
            <Form.Item name="sourceUrl" label="Source Url" rules={[{ required: false }]}>
                <Input addonBefore="http://" defaultValue="myblog" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                {fillForm && (<Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                </Button>)}
            </Form.Item>
        </Form>
    );
}
