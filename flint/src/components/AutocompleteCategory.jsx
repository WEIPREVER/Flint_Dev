import React, {useEffect, useState} from 'react';
import {Stack, Autocomplete, TextField, createFilterOptions, Alert} from "@mui/material";
import AuthenticationService from "../services/AuthenticationService";
import ExpenseDataService from "../api/ExpenseDataService";


const AutocompleteCategory = () => {

    const [values, setValues] = useState([])
    const [category, setNewCategory] = useState()
    let user = AuthenticationService.getUser();

    console.log({values})

    useEffect(() => {
        ExpenseDataService.retrieveCategoriesByUser(user)
            .then((response) => setValues(response.data.map(item => item.name)))
    }, [] )


    console.log(category)

    return (
        <div className={"container"}>

        <Stack spacings={2} width='300px'>
            <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="category-dropdown"
                options={values}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label=" "/>}
                category={category}
                onChange={(event: any, newInput: string | null ) => setNewCategory(newInput)}
            />

        </Stack>
        </div>

    )
}
export default AutocompleteCategory;