import {FormikProps} from "formik";
import {TextField} from "@mui/material";
import React from "react";
import './component.scss';

export const NumInput = (props: { fieldName: string, formikProps: FormikProps<any> }) => {
    return (
        <div className={"field-wrapper"}>
            <TextField
                fullWidth
                id={props.fieldName.toLocaleLowerCase()}
                name={props.fieldName}
                label={props.fieldName}
                type={"number"}
                value={props.formikProps.values[props.fieldName]}
                onChange={props.formikProps.handleChange}
                error={props.formikProps.touched[props.fieldName] && Boolean(props.formikProps.errors[props.fieldName])}
                helperText={props.formikProps.touched[props.fieldName] && props.formikProps.errors[props.fieldName]}
            />
        </div>
    )
}
