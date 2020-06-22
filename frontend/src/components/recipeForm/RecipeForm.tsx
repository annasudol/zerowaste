import React, { useState, ReactElement, FC } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { AutoComplete, List, ListInput, ImageUpload, FileType } from '..'
import { RecipeStateProps } from '../../utils/types';
import { Store } from 'antd/lib/form/interface';
import { sampleRecipe } from '../../assets/data/sampleRecipe'

import * as request from 'superagent';
import { handlePhotoDelete } from "../../utils/handlePhotoDelete";
const { TextArea } = Input;
const tailLayout = { wrapperCol: { offset: 10, span: 12 } };
const formRef = React.createRef<FormInstance>();


const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    number: {
        // eslint-disable-next-line no-template-curly-in-string
        range: '${label} must be between ${min} and ${max}',
    },
};


interface RecipeFormProps {
    handleSubmit(inputValues: Store, imageUrl: string): void
    fillForm?: boolean
    initialValues?: RecipeStateProps
}

export const RecipeForm: FC<RecipeFormProps> = ({ handleSubmit, fillForm = false, initialValues }): ReactElement => {
    const [ingredients, setIngredients] = React.useState<string[] | []>([])
    const [detailedIngredients, setDetailedIngredients] = React.useState<string[] | []>([])
    const [imageUrl, setImageUrl] = useState<string | undefined>(initialValues?.image);
    const [error, setError] = React.useState<boolean>(false)
    React.useEffect(() => {
        if (initialValues && formRef.current) {
            formRef.current.setFieldsValue({ ...initialValues });
            setIngredients(initialValues.ingredients)
            setDetailedIngredients(initialValues.detailedIngredients)
        }
    }, [initialValues]);




    const onFinish = async (values: Store) => {
        const uploadPreset = process.env.REACT_APP_CLOUD_PRESET;
        const cloudName= process.env.REACT_APP_CLOUD_NAME;
        const url = await `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        uploadPreset && await request.post(url)
            .field('upload_preset', uploadPreset)
            .field('file', values.image)
            .field('multiple', false)
            .end((_error: any, response: any) => {
                if (response.ok) {
                    if (imageUrl && response.body.url !== imageUrl) {
                        handlePhotoDelete(imageUrl)
                    }
                    return handleSubmit(values, response.body.url)
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
    const onFinishFailed = (errorInfo: { errorFields: { errors: unknown; }[]; }) => {
        if (errorInfo?.errorFields[3]?.errors) {
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
                <List list={detailedIngredients} deleteItem={(text: string): void => deleteDetailedIngredients(text)} />
            </Form.Item>
            <Form.Item name='instructions' label='Instructions' rules={[{ required: true, min: 10 }]}>
                <TextArea />
            </Form.Item>
            <Form.Item name='image' label='Image' rules={[{ required: true }]}>
                <ImageUpload imageUrl={imageUrl} form={(value: FileType | Blob): void => formRef.current?.setFieldsValue({ image: value })} />
            </Form.Item>
            <Form.Item name='sourceUrl' label='Source Url' rules={[{ required: false }]}>
                <Input addonBefore='http://' />
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
