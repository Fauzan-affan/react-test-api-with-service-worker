import React from 'react'
import styles from './ExchangeRate.module.scss'
import useSWR from 'swr'
import {convert} from '../../utils/currency'

function ExchangeRate() {
    const [base, dest] = ["USD", "PHP"]
    const {data: rate, error} = useSWR([base, dest], convert)
    const [rates, setRates] = React.useState()

    React.useEffect(() => {
        rate ? setRates(rate) : setRates()
    }, [rate])

    return (
        <>
            {error ? <span>Error</span> : !rate ? <span>Loading ...</span> : (
                <>
                    <h1>Exchange Rates</h1>
                    <div className={styles.container}>
                        <div className={styles.code_name}>
                            {dest}    
                        </div>
                        <span>:</span>
                        <div className={styles.rate}>
                            {rates}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ExchangeRate
