import React, { FC, ReactElement } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";


interface ImageUploadProps {
    imageUrl?: string
    form?(file: Blob): void
}

function getBase64(img: Blob, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: { type: string; size: number; }) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export const ImageUpload: FC<ImageUploadProps> = ({ imageUrl, form }): ReactElement => {
    const [img, setImg] = React.useState<string | undefined>()
    const [file, setFile] = React.useState<any>()

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const file =info?.file?.originFileObj

         if (file) {
            getBase64(file, (imageUrl: string) => {
                setImg(imageUrl);
                if (form) {
                    setFile(file);
                    form(file);
                }
            })
        }
    }




    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className='ant-upload-text'>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={file}
                beforeUpload={beforeUpload}
                onChange={(info)=> handleChange(info)}

            >
                {img || imageUrl ? <img src={img || imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

        </>
    )
};