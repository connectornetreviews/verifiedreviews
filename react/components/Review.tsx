import type {FunctionComponent} from "react";
import React from "react";
import {FormattedMessage} from "react-intl";

import type {ReviewProps} from "../typings/global";
import styles from "../styles.css";
import StarsContainer from "./StarsContainer";
import ModerationContainerBlock from "./ModerationContainer";
import nrDateFormat from "../utils/DateConverter"
import MediaContainer from "./MediaContainer";

const Review: FunctionComponent<ReviewProps> = ({ ...reviewsProps }) => {
  const mediaArray = reviewsProps.medias
    ? JSON.parse(decodeURIComponent(atob(reviewsProps.medias)))
    : null;

  return (
    <div className={`${styles.netreviews_review}`}>
      <div className={`${styles.netreviews_stars_rate}`}>
        <StarsContainer rating={reviewsProps.rate} />
        <div className={`${styles.netreviews_rate}`}>{reviewsProps.rate}/5</div>
      </div>
      <div className={`${styles.customer_review}`}>{reviewsProps.review}</div>

      {reviewsProps.medias ? <MediaContainer medias={mediaArray} /> : ""}

      <div className={`${styles.netreviews_customer_name}`}>
        {reviewsProps.firstname} {reviewsProps.lastname}.
        <span>
            <span> <FormattedMessage id="store/netreviews.published.on" /></span>
            <span> {nrDateFormat(reviewsProps.publish_date.substr(0, 10))} </span>
        </span>
        <span>
          <FormattedMessage id="store/netreviews.following" />
            <span> {nrDateFormat(reviewsProps.order_date.substr(0, 10))}</span>
        </span>
      </div>

      {reviewsProps.moderation ? (
        <ModerationContainerBlock
          moderation={reviewsProps.moderation}
          commentUsername={`${reviewsProps.firstname  } ${  reviewsProps.lastname}`}
        />
      ) : (
        ""
      )}

    </div>
  );
};

export default Review;
