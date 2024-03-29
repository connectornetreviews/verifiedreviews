import React, {FunctionComponent} from "react";
import styles from "../styles.css";
import {FormattedMessage, defineMessages, useIntl} from "react-intl";
import nrDateFormat from "../utils/DateConverter"
import {defineMessage} from "@formatjs/intl";

interface Moderation {
    commentDate: string
    commentOrigin: number
    comment: string
    commentUsername: string
    isVisible: boolean
}

const ModerationBlock: FunctionComponent<Moderation> = ({
                                                            commentDate,
                                                            commentOrigin,
                                                            comment,
                                                            commentUsername,
                                                            isVisible
                                                        }) => {
    function getOrigin(param: number) {
        const messageOriginModerator = defineMessages({
            1: {
                id: 'store/netreviews.moderator',
            }
        });
        let moderationOrigin;

        if (param == 1) {
            return (
                <div>
                    <FormattedMessage id={messageOriginModerator[1].id} />
                </div>
            )
        } else if (param == 2) {
            moderationOrigin = location.hostname;
        } else if (param == 3) {
            moderationOrigin = commentUsername;
        }
        return moderationOrigin;
    }

    return (
        <div style={isVisible ? {opacity: 1, maxHeight: '300px'} : {opacity: 0, maxHeight: 0}}
             className={`${styles.netreviews_discussion}`}>
            <div className={`${styles.netreviews_website_answer}`}>
                <span className={`${styles.netreviews_answer_title}`}>
                    <FormattedMessage id="store/netreviews.moderation.answer-from"/>
                    <span> {getOrigin(commentOrigin)} </span>
                    <FormattedMessage id="store/netreviews.moderation.on"/>
                    &nbsp;
                    {nrDateFormat(commentDate.substr(0, 10))}
                </span>
                <span className={`${styles.netreviews_answer}`}>{comment}</span>
            </div>
        </div>
    )
}

export default ModerationBlock
