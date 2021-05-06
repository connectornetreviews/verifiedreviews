import React, {CSSProperties, FunctionComponent, useEffect, useState} from "react";

import {useQuery} from "react-apollo";
import GetReviews from "./graphql/getReviews.gql";
import "@fontsource/nunito";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import styles from "./styles.css";
import ReviewsContainer from "./components/ReviewsContainer";
import ReviewsSideInfo from "./components/ReviewsSideInfo";
import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const [filter, setFilter] = useState([]);
    const [selectedOrder, setOrder] = useState('date_desc');
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState([]);
    const initialLimit = 5;
    const [limit, setLimit] = useState(initialLimit);
    const [filterClicked, setFilterClicked] = useState(!!filter.length);

    const {product} = useProduct() ?? {};
    const {productId} = product ?? {};

    if (!productId) {
        return null;
    }

    let variables = {
        product: productId,
        offset: 0,
        limit: limit,
        filter: filter,
        order: selectedOrder
    }

    const {data, loading, error} = useQuery(GetReviews, {
        ssr: false,
        variables: variables
    });

    useEffect(() => {
        if (!loading && !error && data.reviews !== null) {
            if (data.reviews.length) {
                setReviews(data.reviews[0].reviews);
                setStats(data.reviews[0].stats)
            }
        }
    }, [data]);

    function moreReviews(increment: number) {
        setLimit((limit) => {
            return limit + increment
        });
    }

    function filterByRating(rating: [number] | any) {
        setLimit(initialLimit);
        setFilter(rating);
    }

    function filterByOrder(event: React.ChangeEvent<HTMLInputElement>) {
        setFilterClicked(!filterClicked)
        setLimit(initialLimit);
        setFilter([]);
        setOrder(event.target.value);
    }

    const style: CSSProperties = {
        position: 'absolute',
        top: '-100px',
        left: 0
    }

    return data ? (
        <div className={`${styles.netreviews_review_rate_and_stars}`}>
            <div id="netreviews_block" style={style}/>
            <ReviewsSideInfo stats={stats} filterByRating={filterByRating} filter={filter}
                             setFilterClicked={setFilterClicked}/>
            <ReviewsContainer reviews={reviews}
                              limit={{limit, initialLimit}}
                              filter={filter}
                              filterByOrder={filterByOrder}
                              order={selectedOrder}
                              getMoreReviews={moreReviews}
                              stats={stats}
                              loading={loading}
            />
        </div>
    ) : <div/>;
};
export default Reviews;
