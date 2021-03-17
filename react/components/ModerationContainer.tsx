import React, {FunctionComponent, Fragment, useState} from "react";
import styles from "../styles.css";
import ModerationBlock from "./Moderation";
import {FormattedMessage} from "react-intl";
import {FaComments} from "react-icons/all";

export interface ModerationContainer {
    moderation: Moderation[]
    commentUsername: any
}

interface Moderation {
    comment_date: string
    comment_origin: number
    comment: string
    username: string
}


const ModerationContainerBlock: FunctionComponent<ModerationContainer> = ({moderation, commentUsername}) => {
    const chat = moderation.slice().reverse();
    const [isVisible, setVisibility] = useState(false);

    function toggleChat() {
        setVisibility(!isVisible)
    }

    return (
        <Fragment>
            {chat.map((element, i) => {
                return (
                    <ModerationBlock commentDate={element.comment_date}
                                     comment={element.comment}
                                     commentOrigin={element.comment_origin}
                                     commentUsername={commentUsername}
                                     isVisible={i > 0 ? isVisible : true}
                                     key={i}
                    />)
            })}
            <button className={`${styles.show_chat}`} onClick={toggleChat}><FaComments
                className={`${styles.chat_icon}`}/>
                {isVisible ? <FormattedMessage id="store/netreviews.moderation.hide-chat"/> :
                    <FormattedMessage id="store/netreviews.moderation.show-chat"/>}</button>
        </Fragment>
    )
}

export default ModerationContainerBlock
