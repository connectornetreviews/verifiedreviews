import React, {FunctionComponent} from "react";
import styles from '../styles.css';
import {RatingProps} from '../typings/global';
import {FormattedMessage} from "react-intl";

const RatingInfo: FunctionComponent<RatingProps> = ({count}) => {
    return (
        <div className={`${styles.inline_rating}`}>
            {count} {count > 1 ? <FormattedMessage id="store/netreviews.reviews"/> :
            <FormattedMessage id="store/netreviews.review"/>}
        </div>
    )
}

export default RatingInfo;
