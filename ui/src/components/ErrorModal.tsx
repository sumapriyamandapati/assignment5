import {useGlobalState} from "../state";
import {Alert, Snackbar} from "@mui/material";
import { Error } from '../state';
import React from "react";

export const ErrorModal = () => {

    const [errors] = useGlobalState('errors')

    function handleClose(error: Error) {
        error.visited = true
    }

    return (
        <>
            {
                errors.map(error => (
                    <Snackbar open={!error.visited} autoHideDuration={6000}>
                        <Alert onClose={() => handleClose(error)} severity="error" sx={{ width: '100%' }}>
                            {error.errorDescription}
                        </Alert>
                    </Snackbar>
                ))
            }
        </>
    )

}
