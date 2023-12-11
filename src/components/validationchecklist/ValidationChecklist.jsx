import React from 'react'
import styles from './Validation.module.css'
import { UPPERCASE_REGEX, NUMBER_REGEX, LENGTH_REGEX, SPECIAL_CHARS_REGEX } from '@/utils/helpers/validationRules';

const rules = [
    { label: "At least 1 uppercase", pattern: UPPERCASE_REGEX },
    { label: "At least 1 number", pattern: NUMBER_REGEX },
    { label: "At least 8 characters", pattern: LENGTH_REGEX },
    { label: "At least 1 special character", pattern: SPECIAL_CHARS_REGEX }
];
const ValidationChecklist = ({value}) => {


    return (
        <div className={styles.wrapper}>
            {rules.map((rule) => {
                const cn =
                    value && value.match(rule.pattern) ? styles.passed : "";
                return <p className={cn}>{rule.label}</p>;
            })}
        </div>
    );
}

export default ValidationChecklist