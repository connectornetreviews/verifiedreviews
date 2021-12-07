import type {FunctionComponent} from "react";
import React from "react";

import Star from "./StarTpl";
import styles from "../styles.css";
import type { StarsProps } from "../typings/global";

const StarsStatsContainer: FunctionComponent<StarsProps> = ({ rating }) => {
  function decrease(arg: number) {
    const data = [];

    for (let i = 0; i <= arg; i++) {
      data.push(
        <div className={`${styles.active_stars}`} key={i}>
          <Star fill="#F49630" width={14} height={14} />
        </div>
      );
    }

    return data;
  }

  return (
    <div className={`${styles.inline_stars}`}>
      <div className={`${styles.active_container}`}>{decrease(rating)}</div>
    </div>
  );
};

export default StarsStatsContainer;
