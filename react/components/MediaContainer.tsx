import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "../styles.css";
import Carousel from "./Carousel";

export interface MediaContainer {
    medias: Media[]
}

export interface Media {
    large: string
    medium: string
    small: string,
    type: string
}

const MediaContainer: FunctionComponent<MediaContainer> = ({medias}) => {
    const [{display, elemUrl}, setState] = useState({display: false, elemUrl: ''});

    const toggleState = (elemUrl: string) => {
        setState({display: !display, elemUrl: elemUrl})
    }

    const backgroundImage = (url: string): any => {
        return {
            backgroundImage: "url(" + url + ")"
        };
    };

    const mediaList = medias.map((element, i: number) => {
            return (
                <li key={i}><a
                    onClick={() => {
                        toggleState(element.large)
                    }}
                    datatype='image' className={`${styles.netreviews_image_thumb}`}
                    data-src={element.small} style={backgroundImage(element.small)}
                /></li>
            )
        }
    )

    return (
        <div>
            <ul className={`${styles.netreviews_media_part}`}>
                {mediaList}
            </ul>
            {display ? <div><Carousel onClick={[toggleState, elemUrl]}/></div> : ''}
        </div>
    );
}

export default MediaContainer
