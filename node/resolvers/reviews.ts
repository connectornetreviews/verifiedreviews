export const queries = {
  rating: async (_: any, args: any, ctx: Context, _infos: any) => {
    const {
      clients: { netreviews }
    } = ctx;

    const { product } = args;

    try {
      const data = await netreviews.getRating(ctx, product);
      const [firstDataKey] = Object.keys(data);

      return data[firstDataKey];
    } catch (error) {
      throw new TypeError(error);
    }
  },
  reviews: async (_: any, args: any, ctx: Context, _infos: any) => {
    const {
      clients: { netreviews }
    } = ctx;

    const { product, offset, limit, filter, order } = args;

    try {
      return await netreviews.getReviews(ctx, {
        product,
        offset,
        limit,
        filter,
        order
      });
    } catch (error) {
      throw new TypeError(error);
    }
  },
  config: async (_: any, _args: any, ctx: Context, _infos: any) => {
    const {
      clients: { netreviews }
    } = ctx;
    try {
      return await netreviews.getAccountInfo(ctx);
    } catch (error) {
      throw new TypeError(error);
    }
  }
};
