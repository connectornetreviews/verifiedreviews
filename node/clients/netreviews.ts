import {ExternalClient, InstanceOptions, IOContext} from '@vtex/api';
import {Rating} from "../typings/rating";
import {Reviews} from "../typings/review";


interface reviewArgs {
    product: string,
    offset: number,
    limit: number,
    filter: [number],
    order: string
}

declare var process: {
    env: {
        VTEX_APP_ID: string
    }
}

class Netreviews extends ExternalClient {
    idWebsite: string = '';
    plateforme: string = '';

    constructor(context: IOContext, options?: InstanceOptions) {
        super('https://awsapis3.netreviews.eu', context, options);
    }

    public async getAccountInfo(ctx: Context) {
        const {clients} = ctx;
        const appId = process.env.VTEX_APP_ID;
        const settings = await clients.apps.getAppSettings(appId);
        const {idWebsite, locale} = settings;

        if (this.idWebsite === '') {
            this.idWebsite = idWebsite.trim();
            this.plateforme = locale.split('-')[1].toLowerCase();
        }
    }

    public async getRating(ctx: Context, product: string): Promise<Rating> {
        await this.getAccountInfo(ctx);

        return this.http.post('/product', {
                query: 'average',
                idWebsite: this.idWebsite,
                plateforme: this.plateforme,
                product: product,
            }
        )
    }

    public async getReviews(ctx: Context, {product, offset, limit, filter, order}: reviewArgs): Promise<Reviews> {
        await this.getAccountInfo(ctx);

        return this.http.post('/product', {
                query: 'reviews',
                idWebsite: this.idWebsite,
                plateforme: this.plateforme,
                product: product,
                offset: offset,
                limit: limit,
                filter: filter,
                order: order
            }
        )
    }
}

export default Netreviews;
