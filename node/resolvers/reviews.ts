export const queries = {
    rating: async (_: any, args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        const {product} = args;
        try {
            const data = await netreviews.getRating(ctx, product);
            return data[Object.keys(data)[0]];
        } catch (error) {
            throw new TypeError(error);
        }
    },
    reviews: async (_: any, args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        const {product, offset, limit, filter, order} = args;

        try {
            return await netreviews.getReviews(ctx, {product, offset, limit, filter, order});
        } catch (error) {
            throw new TypeError(error);
        }
    }
}
