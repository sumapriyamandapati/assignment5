import {TextField} from "@mui/material";
import React from "react";
import {FormikProps} from "formik";
import './component.scss';

export const TextInput = (props: { fieldName: string,  type?: string, formikProps: FormikProps<any> }) => {
    return (
        <div className={"field-wrapper"}>
            <TextField
                fullWidth
                id={props.fieldName.toLocaleLowerCase()}
                name={props.fieldName}
                label={props.fieldName}
                value={props.formikProps.values[props.fieldName]}
                onChange={props.formikProps.handleChange}
                error={props.formikProps.touched[props.fieldName] && Boolean(props.formikProps.errors[props.fieldName])}
                helperText={props.formikProps.touched[props.fieldName] && props.formikProps.errors[props.fieldName]}
            />
        </div>
    )
}
