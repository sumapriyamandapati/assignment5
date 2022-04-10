import {Button} from "@mui/material";
import React, {createRef, useEffect, useState} from "react";
import './component.scss';
import {FormikProps} from "formik";

export const UploadInput = (props: { fieldName: string, formikProps: FormikProps<any> }) => {

    const inputRef = createRef<HTMLInputElement>();
    const imgRef = createRef<HTMLImageElement>();
    const [file, setFile] = useState<string>()

    useEffect(() => {
        if (props.formikProps.values[props.fieldName]) {
            setFile(props.formikProps.values[props.fieldName])
        }
    }, [])

    function getBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result)
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function upload() {
        inputRef.current?.click()
    }

    async function handleChange(e: any) {
        if (imgRef && imgRef.current) {
            imgRef.current.src = URL.createObjectURL(e.target.files[0])
            const string = await getBase64(e.target.files[0] as File)
            setFile(string as string)
            props.formikProps.setFieldValue(props.fieldName, string)
        }
    }

    return (
      <div className={"file-upload-wrapper"}>
          <div className={"image"}>
              <input id={props.fieldName}
                     name={props.fieldName}
                     className={"file-upload"}
                     type={"file"}
                     ref={inputRef}
                     onChange={handleChange}/>
              <img ref={imgRef}
                   className={ file ? 'show-image' : 'dont-show-image' }
                   alt={"upload image"}
                   src={props.formikProps.values[props.fieldName]}
                   width={400}
                   height={400}/>
          </div>
          <Button className={"upload-button"}
                  variant={"outlined"}
                  onClick={upload}>
              {file ? 'Update Image' : 'Upload Image'}
          </Button>
      </div>
  );
}
