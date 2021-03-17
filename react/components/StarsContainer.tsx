import React, {FunctionComponent} from "react";
import Star from "./StarTpl";
import styles from '../styles.css';
import {StarsProps} from '../typings/global';

const stars = [0, 1, 2, 3, 4];

const getPercentage = (rating: number, i: number) => {
    if (rating >= i + 1) {
        return '100%'
    }
    if (i < rating && rating < i + 1) {
        return `${(rating - i) * 100}%`
    }
    return '0%'
}

const StarsContainer: FunctionComponent<StarsProps> = ({rating}) => {
    return (
        <div className={`${styles.inline_stars}`}>
            <div className={`${styles.inactive_container}`}>
                {stars.map((j) => {
                    return (
                        <div key={j}>
                            <div>
                                <Star fill="#A3A4A6" width={16} height={15}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={` ${styles.active_container}`}>
                {stars.map((i) => {
                    return (
                        <div key={i}>
                            <div className={`${styles.stars_overflow}`}
                                 style={{width: getPercentage(rating, i)}}>
                                <Star fill="#F49630" width={16} height={15}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StarsContainer;
