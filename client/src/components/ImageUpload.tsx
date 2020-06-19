import * as React from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export interface FileType {
    lastModified: number
    name: string
    size: number
    type: "image/jpeg"
    uid: string
}
interface ImageUploadProps {
    imageUrl: string | undefined
    form?(file: FileType): void
}

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
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

export const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, form }): React.ReactElement => {
    const [img, setImg] = React.useState<string | undefined>()
    const [file, setFile] = React.useState<any>()


    const handleChange = (info) => {
        if (info.file.originFileObj) {
            // tslint:disable-next-line: no-shadowed-variable
            getBase64(info.file.originFileObj, (imageUrl: string) => {
                setImg(imageUrl);
                if (form) {
                    setFile(info.file.originFileObj);
                    form(info.file.originFileObj);
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
                onChange={handleChange}

            >
                {img || imageUrl ? <img src={img || imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

        </>
    )
};