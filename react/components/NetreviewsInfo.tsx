import type {FunctionComponent, MouseEventHandler} from "react";
import React from "react";
import {CgCloseO} from "react-icons/all";
import {FormattedMessage} from "react-intl";

import styles from "../styles.css";

interface TState {
  onClick: MouseEventHandler;
}

const NetreviewsInfo: FunctionComponent<TState> = ({ onClick }) => {
  return (
    <div id={`${styles.netreviews_informations}`}>
      <span className={`${styles.close_info}`} onClick={onClick}>
        <CgCloseO />
      </span>
      <ul>
        <li>
          <FormattedMessage id="store/netreviews.info.one" />
          <span> </span>
          <a
            href="https://www.avis-verifies.com/index.php?page=mod_conditions_utilisation"
            target="_blank" rel="noreferrer"
          >CGU</a>
          .
        </li>
        <li>
          <FormattedMessage id="store/netreviews.info.two" />
        </li>
        <li>
          <FormattedMessage id="store/netreviews.info.three" />
        </li>
        <li>
          <FormattedMessage id="store/netreviews.info.four" />
        </li>
        <li>
          <FormattedMessage id="store/netreviews.info.five" />
          <span> </span>
          <a
            href="https://www.avis-verifies.com/index.php?page=mod_conditions_utilisation#Rejet_de_lavis_de_consommateur"
            target="_blank" rel="noreferrer"
          >
            <FormattedMessage id="store/netreviews.info.here" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NetreviewsInfo;
