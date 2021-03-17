import React, {FunctionComponent} from "react";
import styles from "../styles.css";
import {FormattedMessage} from "react-intl";
// import {helpfulMethods} from 'netreviews.helpfulvote';


interface HelpfulProps {
    count_helpful_no: number
    count_helpful_yes: number
    reviews_id: string | number
    sign: string
    id: string | number
}

const HelpfulBlock: FunctionComponent<HelpfulProps> = ({
                                                           count_helpful_yes,
                                                           count_helpful_no,
                                                           reviews_id,
                                                           sign,
                                                           id
                                                       }) => {
    return (
        <div className={`${styles.helpful_block}`}>
            <span><FormattedMessage id="store/netreviews.was-helpful"/></span>
            <a className={`${styles.button_helpful}`}
               data-review-id={reviews_id + '_1'}
               data-vote={count_helpful_yes}
               data-sign={sign}
               data-id={id}
            >

                <FormattedMessage id="store/netreviews.yes"/>
                <span>{count_helpful_yes}</span>
            </a>
            <a className={`${styles.button_helpful}`}
               data-review-id={reviews_id}
               data-vote={count_helpful_no + '_0'}
               data-sign={sign}
               data-id={id}
            >
                <FormattedMessage id="store/netreviews.no"/>
                <span>{count_helpful_no}</span>
            </a>
        </div>
    )
}

export default HelpfulBlock
