import React, {FunctionComponent} from "react";
import {Dropdown} from 'vtex.styleguide'
import {defineMessages, useIntl} from 'react-intl';
import {ReviewsContainerProps} from "../typings/global";
import styles from '../styles.css';


interface DropdownProps {
    filterByOrder: ReviewsContainerProps['filterByOrder']
    selectedOrder: any
}

const messages = defineMessages({
    oldest: {
        defaultMessage: '',
        id: 'store/netreviews.filter.date-asc',
    },
    highest: {
        defaultMessage: '',
        id: 'store/netreviews.filter.rate-desc',
    },
    lowest: {
        defaultMessage: '',
        id: 'store/netreviews.filter.rate-asc',
    },
    most_useful: {
        defaultMessage: '',
        id: 'store/netreviews.filter.most-helpful',
    },
    default: {
        defaultMessage: '',
        id: 'store/netreviews.filter.date-desc',
    },
    filter: {
        id: 'store/netreviews.filter.filter'
    }
});

const DropdownList: FunctionComponent<DropdownProps> = ({filterByOrder, selectedOrder}) => {
    const intl = useIntl();

    const options = [
        {value: 'date_desc', label: intl.formatMessage(messages.default)},
        {value: 'date_asc', label: intl.formatMessage(messages.oldest)},
        {value: 'rate_desc', label: intl.formatMessage(messages.highest)},
        {value: 'rate_asc', label: intl.formatMessage(messages.lowest)},
        {value: 'most_helpful', label: intl.formatMessage(messages.most_useful)},
    ];

    return (
        <div className={`${styles.dropdown_override}`}>
            <span className={`${styles.extra_margin}`}>{intl.formatMessage(messages.filter)}&nbsp;:&nbsp;</span>
            <Dropdown
                size='small'
                options={options}
                value={selectedOrder}
                onChange={filterByOrder}
            />
        </div>

    )
}

export default DropdownList;
