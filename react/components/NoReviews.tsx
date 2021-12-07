import React, {FunctionComponent} from "react";
import {FormattedMessage} from "react-intl";
import styles from "../styles.css";

const NoReview: FunctionComponent = () => {

    return (
        <div className={`${styles.no_review}`}>
            <FormattedMessage id="store/netreviews.noreviews"/>
        </div>
    )
}

export default NoReview;
