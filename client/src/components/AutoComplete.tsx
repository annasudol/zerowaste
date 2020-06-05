import * as React from "react";
import { Select } from 'antd';
const { Option } = Select;

import { products } from "../assets/data/products";
import { ListType } from "../utils/types";


const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);

interface AutoCompleteProps {
    placeholder?: string
    saveList(value: string[]): void
    form?(ingredients: string[]): void
    list?: string[]
}

export const AutoComplete: React.FunctionComponent<AutoCompleteProps> = ({ placeholder, form, saveList, list }) => {
    const [defaultValues, setDefaultValues] = React.useState<string[] | []>([]);

    // React.useEffect(() => {
    if (list !== defaultValues && list) {
        setDefaultValues(list);
    }
    // }, [list, defaultValues]);

    const handleChange = (value: string[]) => {
        if (form) {
            form(value)
        }
        saveList(value);
    }


    return (
        React.useMemo(() => {
            return (
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={placeholder || "Select at least one product"}
                    onChange={handleChange}
                    optionLabelProp="label"
                    defaultValue={list}
                >
                    {productsTitles.map((title: string, index: number) => (
                        <Option key={index} value={title} label={title}>
                            {title}
                        </Option>
                    ))}
                </Select>
            )
        }, [list?.length])
    )

}