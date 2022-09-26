
import fetchCurrencyRate from "./fetch-rates";
const rateTable = document.querySelector("table");

async function setRateTable () {
    try {
        const rates = await fetchCurrencyRate();
        setMarkup(rates);
        } catch(error) {
            console.log(error);
        }
};

function setMarkup (rates) {
    const ratesMarkupString = rates.map(item => {
        const {
            ccy,
            base_ccy,
            normalizedBuyValue,
            normalizedSaleValue
        } = item;
        return `<tr>
            <td>
                ${ccy}
            </td>
            <td>
                ${normalizedBuyValue}${base_ccy}
            </td>
            <td>
                ${normalizedSaleValue} ${base_ccy}
            </td>
        </tr>`;
    })
    .join("");

    console.log(ratesMarkupString);
    rateTable.innerHTML = ratesMarkupString;
};

setRateTable();