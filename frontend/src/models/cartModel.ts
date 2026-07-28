interface ProductsCart {
    productId: string,
    quantity: number
}

export interface CartModel {
    userId: string,
    products: ProductsCart[]

}