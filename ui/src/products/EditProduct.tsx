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
const UPDATE_PRODUCT = gql(`
    # Edit product
    mutation Mutation($updateProduct: ProductUpdate) {
      updateProduct(updateProduct: $updateProduct) {
        id
        Category
        Name
        Price
        Image
      }
    }
`);

export const EditProduct = () => {

    const navigate = useNavigate()
    const [page, setPage] = useGlobalState('page');
    const [selectedProduct] = useGlobalState('productInstance');
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const values: Product = { Image: 'NA', Price: 0, Category: '', Name: '', id: '' };

    useEffect(() => {
        setPage('Edit Products')
    }, [page])

    function handleSubmit(values: any) {
        updateProduct({
            variables: {
                "updateProduct": values
            }
        }).then(() => {
            navigate("/")
        })
    }

    return (
        <Formik
            initialValues={{ ...values, ...selectedProduct}}
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
                                <Button type={"submit"}>Update</Button>
                            </div>
                        </Form>
                    </>
                )
            }


        </Formik>
    )
}
