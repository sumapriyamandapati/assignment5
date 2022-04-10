import {FormikProps} from "formik";
import {MenuItem, TextField} from "@mui/material";
import React from "react";
import './component.scss';

export const SelectInput = (props: { fieldName: string, formikProps: FormikProps<any>, options: string[] }) => {
    return (
        <div className={"field-wrapper"}>
            <TextField
                fullWidth
                select
                id={props.fieldName.toLocaleLowerCase()}
                name={props.fieldName}
                label={props.fieldName}
                value={props.formikProps.values[props.fieldName]}
                onChange={props.formikProps.handleChange}
                error={props.formikProps.touched[props.fieldName] && Boolean(props.formikProps.errors[props.fieldName])}
                helperText={props.formikProps.touched[props.fieldName] && props.formikProps.errors[props.fieldName]}
            >
                {props.options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}
