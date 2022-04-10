import React from 'react';
import {Button, IconButton} from "@mui/material";
import {getGlobalState, useGlobalState} from "./state";
import {Link, Route, Routes} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Products} from "./products/Products";
import {AddProduct} from "./products/AddProduct";
import {EditProduct} from "./products/EditProduct";
import {DeleteProduct} from "./products/DeleteProduct";

export const Navbar = () => {

    const [page] = useGlobalState('page')

    return (
        <div className={"container"}>
            <div className={"actions"}>
                {
                    getGlobalState('page') === 'Home' ?
                        <Link to={"/"}>
                            <IconButton className={"home"}>
                                <HomeIcon color={"primary"}/>
                            </IconButton>
                        </Link> :
                        <Link to={"/"}>
                            <IconButton className={"home"}>
                                <ArrowBackIcon color={"primary"}/>
                            </IconButton>
                        </Link>
                }
                <div/>
                {
                    page === 'Home' ?
                        <Link to={"add"}>
                            <Button>Add new product</Button>
                        </Link> : null
                }
            </div>
            <Routes>
                <Route path={"/"} element={<Products/>}/>
                <Route path={"/add"} element={<AddProduct />}/>
                <Route path={"/edit"} element={<EditProduct />}/>
                <Route path={"/delete"} element={<DeleteProduct />}/>
            </Routes>
        </div>
    )
}
