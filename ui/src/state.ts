import {createGlobalState} from "react-hooks-global-state";

export interface Product {
    id?: string
    Category?: string
    Name?: string
    Price?: number
    Image?: string
}

export interface Error {
    errorTitle: string,
    errorDescription: string,
    visited: boolean
}

export interface StateType {
    page: Page
    isLoading: boolean
    products: Product[]
    productInstance: Product
    errors: Error[]
}

export type Page = 'Home' | 'Add Products' | 'Edit Products' | 'Remove Products';

export const initialState: StateType = {
    page: "Home",
    isLoading: true,
    products: [],
    productInstance: {},
    errors: []
}

export const { useGlobalState, getGlobalState } = createGlobalState(initialState);
