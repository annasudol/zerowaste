import { Form, Input, Button, InputNumber } from 'antd';
const { TextArea } = Input;
import { FormInstance } from 'antd/lib/form';
import { AutoComplete, List, ListInput, ImageUpload, FileType } from '../components'
import * as React from 'react';
import { RecipeStateProps } from '../utils/types';
import { Store } from 'antd/lib/form/interface';
import { sampleRecipe } from '../assets/data/sampleRecipe'
const tailLayout = { wrapperCol: { offset: 10, span: 12 } };
const formRef = React.createRef<FormInstance>();

import * as request from 'superagent';
import { handlePhotoDelete } from "../utils/handlePhotoDelete";

const cloudName = "drgb4slzt";
const uploadPreset = "iiiutyfi";

const validateMessages = {
    required: '${label} is required!',
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


interface RecipeFormProps {
    handleSubmit(inputValues: Store, imageUrl: string): void
    fillForm?: boolean
    defaultValues?: RecipeStateProps
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ handleSubmit, fillForm = false, defaultValues }): React.ReactElement => {
    const [ingredients, setIngredients] = React.useState<string[] | []>([])
    const [detailedIngredients, setDetailedIngredients] = React.useState<string[] | []>([])
    const [imageUrl, setImageUrl] = React.useState<string | undefined>(defaultValues?.image);
    const [error, setError] = React.useState<boolean>(false)
    React.useEffect(() => {
        if (defaultValues && formRef.current) {
            formRef.current.setFieldsValue({ ...defaultValues });
            setIngredients(defaultValues.ingredients)
            setDetailedIngredients(defaultValues.detailedIngredients)
        }
    }, [defaultValues, formRef.current]);




    const onFinish = async (values: Store) => {
        const url = `https://api.cloudinary.com/v1_1/drgb4slzt/upload`;
        await request.post(url)
            .field('upload_preset', uploadPreset)
            .field('file', values.image)
            .field('multiple', false)
            .end((error, response) => {
                if (response.ok) {
                    if (imageUrl && response.body.url !== imageUrl) {
                        handlePhotoDelete(imageUrl)
                    }
                    handleSubmit(values, response.body.url)
                }
            });

    };

    const onReset = () => {
        setDetailedIngredients([]);
        setIngredients([]);

        setError(false);
        formRef.current?.resetFields();
    };

    const onFill = () => {
        formRef.current?.setFieldsValue({ ...sampleRecipe });
        setError(false);
        setIngredients(sampleRecipe.ingredients)
        setDetailedIngredients(sampleRecipe.detailedIngredients)
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
            layout='horizontal' ref={formRef} name='control-ref' onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
            <Form.Item name='title' label='Title' rules={[{ required: true, min: 3 }]}>
                <Input />
            </Form.Item>
            <Form.Item name='servings' label='Servings' rules={[{ required: true, type: 'number', min: 1, max: 10 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name='readyInMinutes' label='Ready in Min.' rules={[{ required: true, type: 'number', min: 5, max: 400 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label='Ingredients' name='ingredients' rules={[{ required: true, type: 'array', min: 1, max: 20 }]}>
                <AutoComplete error={error} list={ingredients} saveList={(value: string[]): void => setIngredients(value)} form={(value: string[]): void => formRef.current?.setFieldsValue({ ingredients: value })} />
            </Form.Item>
            <Form.Item label='Detailed Ingredients' name='detailedIngredients' rules={[{ required: true, type: 'array', min: 1, max: 10 }]}>
                <ListInput detailedIngredients={detailedIngredients} setDetailedIngredients={(value: string[]): void => setDetailedIngredients(value)} form={(value: string[]): void => formRef.current?.setFieldsValue({ detailedIngredients: value })} />
                <List list={detailedIngredients} deleteItem={(text: string): any => deleteDetailedIngredients(text)} />
            </Form.Item>
            <Form.Item name='instructions' label='Instructions' rules={[{ required: true, min: 10 }]}>
                <TextArea />
            </Form.Item>
            <Form.Item name='image' label='Image' rules={[{ required: false }]}>
                <ImageUpload imageUrl={imageUrl} form={(value: FileType): void => formRef.current?.setFieldsValue({ image: value })} />
            </Form.Item>
            <Form.Item name='sourceUrl' label='Source Url' rules={[{ required: true }]}>
                <Input addonBefore='http://' defaultValue='myblog' />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' className='mr-2'>
                    Submit
                </Button>
                <Button htmlType='button' onClick={onReset} className='mr-2'>
                    Reset
                </Button>
                {fillForm && (<Button type='dashed' htmlType='button' onClick={onFill}>
                    Fill form
                </Button>)}
            </Form.Item>
        </Form>
    );
}
