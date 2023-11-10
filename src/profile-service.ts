import httpInstance from "./apiutils/http-client"

export const getAllProducts = async () => {
    return await httpInstance.get("http://127.0.0.1:8083/api/product")
}

export const addProduct = async (values: any) => {
    return await httpInstance.post("/api/product", values)
}