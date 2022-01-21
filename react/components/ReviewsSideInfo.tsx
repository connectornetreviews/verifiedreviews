import React, {FunctionComponent, useState} from "react";
import {SideInfoProps} from "../typings/global";
import styles from "../styles.css";
import {FaInfoCircle, FaUserAlt} from "react-icons/fa";
import StarsStatsContainer from "./StarsStatsContainer";
import NetreviewsInfo from "./NetreviewsInfo";
import {useQuery} from "react-apollo";
import GetAverage from "../graphql/getAverage.gql";
import getRecommandation from "../utils/RecommandationPercentage";
import {FormattedMessage} from "react-intl";
import {TiDelete} from "react-icons/all";
import useProduct from "vtex.product-context/useProduct";

const ReviewsSideInfo: FunctionComponent<SideInfoProps> = ({stats, filterByRating, filter, setFilterClicked, locale}) => {
    const [showInfo, setshowInfo] = useState(false);
    const toggleInfo = () => setshowInfo(!showInfo);
    const filterClicked = !!filter.length;
    const {product} = useProduct() ?? {};
    const {productId} = product ?? {};

    let rating: any;

    if (!productId) {
        return null;
    }

    const total = getRecommandation(stats).total;
    const recommandation = getRecommandation(stats).percentageRecommandation;

    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false,
        variables: {
            product: productId
        }
    });


    const background = (percentage: any): any => {
        return {
            background: 'linear-gradient(to right, rgb(173, 173, 173) ' + percentage + '%, rgb(216, 216, 216) ' + percentage + '%)'
        };
    };

    function compareIndex(index: number, selectedFilter: number[]) {
        return selectedFilter.length && index + 1 === selectedFilter[0] ? {opacity: 1} : {opacity: 0.3};
    }

    function setLocaleForLogoUrl(locale: string) {
        return "https://cl.avis-verifies.com/fr/widget4/tagjs/netreviews-logo-" + locale + ".png";
    }

    if (!loading && !error && data.rating !== null) {
        rating = data.rating.length ? data.rating[0] : null;
    }

    return (!loading && !error && data.rating !== null) ?
        (
            <div className={`${styles.left_block}`}>
                <div className={`${styles.netreviews_logo}`}>
                    <img src={setLocaleForLogoUrl(locale)}
                         alt="Logo Avis-Vérifies"/>
                </div>
                <div className={`${styles.stats_block}`}>
                    <div className={`${styles.sidegroup_1}`}>
                        <div className={`${styles.top_block}`}>
                            <div className={`${styles.sidegroup_2}`}>
                                <div className={`${styles.rating_block}`}>
                                    <div className={`${styles.rating}`}>{(rating.rate).toFixed(1)}</div>
                                    <div className={`${styles.separator}`}>|</div>
                                    <div>5</div>
                                </div>
                                <div className={`${styles.user_count}`}>{total}
                                    <span className={`${styles.extra_margin}`}>
                                        {total > 1 ? <FormattedMessage id="store/netreviews.reviews"/> :
                                            <FormattedMessage id="store/netreviews.review"/>}
                                    </span> <FaUserAlt/>
                                </div>
                            </div>
                            <div className={`${styles.bottom_margin}`}>
                                <span className={`${styles.bold}`}> {recommandation}% </span>
                                <FormattedMessage id="store/netreviews.recommendation" values={{recommandation}}/>
                            </div>
                        </div>

                        <div className={`${styles.stats}`}>
                            {stats.map((element, index, _array) => {
                                    const percent = Math.round(element / total * 100);

                                    return (
                                        <div style={filterClicked ? compareIndex(index, filter) : {opacity: 1}}
                                             className={`${styles.individual_stats_stars}`} key={index}
                                             onClick={() => {
                                                 setFilterClicked(true);
                                                 filterByRating([index + 1]);
                                             }}>

                                            <div className={`${styles.inline_percentage}`}>
                                                <StarsStatsContainer rating={index}/>
                                                {percent}%
                                            </div>
                                            <div style={background(percent)}
                                                 className={`${styles.netreviews_percentage_bar}`}/>
                                        </div>
                                    )
                                }
                            )}
                        </div>

                    </div>
                    {filter.length ?
                        <button className={`${styles.reset_filter}`}
                                onClick={() => {
                                    filterByRating([]);
                                    setFilterClicked(false);
                                }}>
                            <FormattedMessage id="store/netreviews.reset-filter"/><TiDelete
                            className={`${styles.custom_cross}`}/>
                        </button>
                        : ''}

                    <div className={`${styles.netreviews_afnor}`}>
                        <a className={`${styles.netreviews_certification}`} target="_blank" href="">
                            <FormattedMessage id="store/netreviews.certificate"/>
                        </a>

                        <div id={`${styles.netreviews_informations_label}`}>
                        <span className={`${styles.extra_margin}`}>
                            <FormattedMessage id="store/netreviews.control"/>
                        </span>
                            <FaInfoCircle style={{cursor: 'pointer'}} onClick={toggleInfo}/>
                            {showInfo ? <div><NetreviewsInfo onClick={toggleInfo}/></div> : null}
                        </div>
                    </div>
                </div>

                {loading ? <div className={`${styles.loader}`}/> : ''}
            </div>
        ) : <div/>
}

export default ReviewsSideInfo;
