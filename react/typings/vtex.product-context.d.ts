declare module 'vtex.product-context/useProduct' {
    interface ProductContext {
        product: any
    }

    export default function useProduct(): ProductContext
}
