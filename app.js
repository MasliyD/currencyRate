const CURRENCY_CODE = {
    USD: 'USD',
    EUR: 'EUR',
    UAH: 'UAH',
};

const getToday = () => {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const renderContent = (response) => {
    const { data } = response;
    let content = document.getElementById('data').innerHTML;

    console.log(data);
    Object
        .keys(data.rates)
        .map((currencyCode) => {
            content += `
                <tr>
                    <td>${data.base}</td>
                    <td>${data.rates[currencyCode].toFixed(2)}</td>
                </tr>
            `;
            console.log(currencyCode);
        });

    document.getElementById('data').innerHTML = content;
};

Promise
    .all([
        axios.get(`https://api.exchangerate.host/${getToday()}?base=${CURRENCY_CODE.USD}&symbols=${CURRENCY_CODE.UAH}`),
        axios.get(`https://api.exchangerate.host/${getToday()}?base=${CURRENCY_CODE.EUR}&symbols=${CURRENCY_CODE.UAH}`),
    ])
    .then(values => values.forEach(renderContent));