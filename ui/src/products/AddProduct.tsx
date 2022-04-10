import React, {useEffect} from "react"
import "./Products.scss"
import {gql, useMutation} from "@apollo/client";
import {useGlobalState} from "../state";
import {Form, Formik} from "formik";
import {Categories, initialValues, productSchema} from "./product";
import {Button} from "@mui/material";
import {TextInput} from "../components/TextInput";
import {SelectInput} from "../components/SelectInput";
import {NumInput} from "../components/NumInput";
import {useNavigate} from "react-router-dom";
import {UploadInput} from "../components/UploadInput";

// Define mutation
const ADD_PRODUCT = gql(`
    # Add new product
    mutation Mutation($product: ProductInput) {
      addNewProduct(product: $product) {
        id
        Category
        Name
        Price
        Image
      }
    }
`);

export const AddProduct = () => {

    const navigate = useNavigate();
    const [page, setPage] = useGlobalState('page');
    const [addProduct] = useMutation(ADD_PRODUCT);

    useEffect(() => {
        setPage('Add Products')
    }, [page])

    function handleSubmit(values: any) {
        addProduct({
            variables: {
                "product": { ...values }
            }
        }).then(() => {
            navigate("/")
        })
    }

    return (
        <Formik
            initialValues={initialValues}
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
                            <UploadInput fieldName={"Image"} formikProps={formik}/>
                            <div className={"action-button"}>
                                <Button type={"submit"}>Submit</Button>
                            </div>
                        </Form>
                    </>
                )
            }
        </Formik>
    )
}
