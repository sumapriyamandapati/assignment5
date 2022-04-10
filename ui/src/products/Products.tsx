import React, {useEffect} from "react";
import './Products.scss'
import {gql, useQuery} from "@apollo/client";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Product, useGlobalState} from "../state";
import {useNavigate} from "react-router-dom";

const GET_ALL_PRODUCTS = gql(`
    query Query {
      getAllProducts {
        id
        Category
        Name
        Price
        Image
      }
    }
`)

export const Products = () => {

    const navigate = useNavigate()
    const [, setIsLoading] = useGlobalState('isLoading')
    const [products, addProducts] = useGlobalState('products')
    const [,setProductInstance] = useGlobalState('productInstance')
    const [, setPage] = useGlobalState('page')
    const { loading, data, refetch } = useQuery(GET_ALL_PRODUCTS);

    useEffect(() => {
        setPage("Home")
    }, [])

    useEffect(() => {
        refetch().then(() => {
            refetch().then(r => addProducts(r.data.getAllProducts))
        })
    }, [])

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    useEffect(() => {
        if (data) {
            addProducts(data.getAllProducts)
        }
    }, [])

    function handleClick(location: string, product: Product) {
        setProductInstance({
            id: product.id,
            Name: product.Name,
            Category: product.Category,
            Price: product.Price,
            Image: product.Image
        })
        navigate(location)
    }

    return (
        <div className={"products"}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map((product: Product, index: number) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{product.Name}</TableCell>
                                    <TableCell>{product.Price}</TableCell>
                                    <TableCell>{product.Category}</TableCell>
                                    <TableCell>
                                        <img alt={product.Name} src={product.Image} width={100} height={100}/>
                                    </TableCell>
                                    <TableCell>
                                        <div className={"action-buttons"}>
                                            <IconButton color={"primary"} onClick={() => handleClick("edit", product)} >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color={"error"} onClick={() => handleClick("delete", product)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow/>
                </TableFooter>
            </Table>
        </div>
    )

}
