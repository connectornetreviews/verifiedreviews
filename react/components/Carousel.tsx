import type {FunctionComponent} from "react";
import React, { MouseEventHandler, useEffect} from "react";
import {IoClose} from "react-icons/all";

import styles from "../styles.css";

interface Carousel {
  onClick: any;
}

const Carousel: FunctionComponent<Carousel> = ({ onClick }) => {
  return (
    <div id={`${styles.netreviews_media_modal}`}>
      <span className={`${styles.close_carousel}`} onClick={onClick[0]}>
        <IoClose />
      </span>

      <div className={`${styles.netreviews_media_content}`}>
        <img
          id={`${styles.netreviews_media_image}`}
          src={onClick[1]}
          alt="product image"
        />
      </div>
    </div>
  );
};

export default Carousel;
