export interface Rating {
    [productId: string]: {
        count: number,
        rate: number
    };
}
