import axios from 'axios'

const convertAxios = async (base, destinaton) => {
    let result = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
    
    if (result) {
        return result.data.rates[destinaton]
    } else {
        return result.status
    }

}

const convertAllAxios = async (base) => {
    let result = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
    
    if (result) {
        return result.data.rates
    } else {
        return result.status
    }

}

export {convertAxios as convert, convertAllAxios as convertAll}