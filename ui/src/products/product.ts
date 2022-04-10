import * as yup from 'yup';
import {Product} from "../state";

export const initialValues: Product = {
    Name: "",
    Category: "",
    Image: "",
    Price: 0.00
}

export const productSchema = yup.object({
    Name: yup.string().required('Name is required'),
    Category: yup.string().required('Category is required'),
    Image: yup.string().notRequired(),
    Price: yup.number()
        .min(1, 'Price must be minimum $1.00')
        .required('Price is required'),
});

export const Categories = [
    "Shirts",
    "Jeans",
    "Jackets",
    "Sweaters",
    "Accessories"
]
