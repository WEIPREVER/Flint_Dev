import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const Input = ({
                              name,
                              ...otherProps
                          }) => {
    const [field, meta] = useField(name);

    const configInput = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (meta && meta.touched && meta.error) {
        configInput.error = true;
        configInput.helperText = meta.error;
    }

    return (
        <TextField {...configInput} />
    );
};

export default Input;