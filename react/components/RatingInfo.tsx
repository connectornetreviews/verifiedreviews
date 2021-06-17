import type {FunctionComponent} from "react";
import React from "react";
import {FormattedMessage} from "react-intl";

import styles from '../styles.css';
import type {RatingProps} from '../typings/global';

const RatingInfo: FunctionComponent<RatingProps> = ({ count }) => {
  return (
    <div className={`${styles.inline_rating}`}>
      {count}{" "}
      {count > 1 ? (
        <FormattedMessage id="store/netreviews.reviews" />
      ) : (
        <FormattedMessage id="store/netreviews.review" />
      )}
    </div>
  );
};

export default RatingInfo;
