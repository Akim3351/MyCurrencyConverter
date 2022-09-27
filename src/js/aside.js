
import fetchCurrencyRate from "./fetch-rates";

const table = document.getElementById("table");

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
                ${normalizedBuyValue} ${base_ccy}
            </td>
            <td>
                ${normalizedSaleValue} ${base_ccy}
            </td>
        </tr>`;
    })
    .join("");

    console.log(ratesMarkupString);
    console.log(table);
    table.innerHTML = ratesMarkupString;
};

setRateTable();