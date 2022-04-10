import React, {useEffect} from "react"
import "./Products.scss"
import {gql, useMutation} from "@apollo/client";
import {Product, useGlobalState} from "../state";
import {Form, Formik} from "formik";
import {Categories, productSchema} from "./product";
import {Button} from "@mui/material";
import {TextInput} from "../components/TextInput";
import {SelectInput} from "../components/SelectInput";
import {NumInput} from "../components/NumInput";
import {useNavigate} from "react-router-dom";
import {UploadInput} from "../components/UploadInput";

// Define mutation
const DELETE_PRODUCT = gql(`
    # Delete product
    mutation Mutation($deleteProduct: ProductUpdate) {
      deleteProduct(deleteProduct: $deleteProduct) {
        id
        Category
        Name
        Price
        Image
      }
    }
`);

export const DeleteProduct = () => {

    const navigate = useNavigate()
    const [page, setPage] = useGlobalState('page');
    const [selectedProduct] = useGlobalState('productInstance');
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    useEffect(() => {
        setPage('Remove Products')
    }, [page])

    function handleSubmit(values: Product) {
        deleteProduct({
            variables: {
                "deleteProduct": { ...values }
            }
        }).then(() => {
            navigate("/")
        })
    }

    return (
        <Formik
            initialValues={selectedProduct}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={productSchema}
            validateOnChange={true}
        >
            {
                ( formik ) => (
                    <>
                        <Form>
                            <TextInput fieldName={"Name"} formikProps={formik}/>
                            <SelectInput fieldName={"Category"} formikProps={formik} options={Categories}/>
                            <NumInput fieldName={"Price"} formikProps={formik}/>
                            <UploadInput fieldName={"Image"} formikProps={formik} />
                            <div className={"action-button"}>
                                <Button type={"submit"}>Remove</Button>
                            </div>
                        </Form>
                    </>
                )
            }
        </Formik>
    )
}
