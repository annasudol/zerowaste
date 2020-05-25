import * as React from "react";

import { Button } from '../UElements';
// import './ImageUpload.css';

interface ImageUploadProps {
    onInput?(id: string, pickedFile: string, fileIsValid: boolean): VoidFunction
    id?: string
}
export const ImageUpload: React.FunctionComponent<ImageUploadProps> = ({ onInput, id }): React.ReactElement => {
    const [file, setFile] = React.useState();
    const [previewUrl, setPreviewUrl] = React.useState();
    const [isValid, setIsValid] = React.useState(false);

    const filePickerRef: any = React.useRef();

    React.useEffect(() => {
        if (file) {
            return;
        }
        const fileReader: any = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        // onInput(id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                id={id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className="image-upload center">
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p>Error with uploading image</p>}
        </div>
    );
};