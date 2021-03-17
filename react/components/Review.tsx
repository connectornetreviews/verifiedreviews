import React, {FunctionComponent} from "react";
import {ReviewProps} from "../typings/global";
import styles from "../styles.css";
import StarsContainer from "./StarsContainer";
import HelpfulBlock from "./Helpful";
import ModerationContainerBlock from "./ModerationContainer";
import nrDateFormat from "../utils/DateConverter"
import MediaContainer from "./MediaContainer";
import {FormattedMessage} from "react-intl";


const Review: FunctionComponent<ReviewProps> = ({...reviewsProps}) => {
    const mediaArray = reviewsProps.medias ? JSON.parse(decodeURIComponent(atob(reviewsProps.medias))) : null;

    return (
        <div className={`${styles.netreviews_review}`}>

            <div className={`${styles.netreviews_stars_rate}`}>
                <StarsContainer rating={reviewsProps.rate}/>
                <div className={`${styles.netreviews_rate}`}>{reviewsProps.rate}/5</div>
            </div>
            <div className={`${styles.customer_review}`}>{reviewsProps.review}</div>

            {reviewsProps.medias ? <MediaContainer medias={mediaArray}/> : ''}

            <div className={`${styles.netreviews_customer_name}`}>{reviewsProps.firstname} {reviewsProps.lastname}.
                <span><FormattedMessage
                    id="store/netreviews.published.on"/>{nrDateFormat(reviewsProps.publish_date.substr(0, 10))}</span>
                <span><FormattedMessage
                    id="store/netreviews.following"/>{nrDateFormat(reviewsProps.order_date.substr(0, 10))}</span>
            </div>

            {reviewsProps.moderation ?
                <ModerationContainerBlock moderation={reviewsProps.moderation}
                                          commentUsername={reviewsProps.firstname + ' ' + reviewsProps.lastname}/> : ''}

            {/*<HelpfulBlock count_helpful_no={reviewsProps.count_helpful_no}*/}
            {/*              count_helpful_yes={reviewsProps.count_helpful_yes}*/}
            {/*              id={reviewsProps.id_product}*/}
            {/*              reviews_id={reviewsProps.review_id}*/}
            {/*              sign={reviewsProps.sign_helpful}*/}
            {/*/>*/}
        </div>
    )
}

export default Review;
