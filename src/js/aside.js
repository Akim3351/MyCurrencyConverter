
import fetchRatePrivatBank from "./fetch-privat";
import { v4 as uuidv4 } from 'uuid';

const tablePrivat = document.getElementById("tableprivat");

async function setRateTable() {
    try {
        const ratesPrivat = await fetchRatePrivatBank();
        setPrivatMarkup(ratesPrivat);
    } catch (error) {
        console.log(error);
    }
};

function setPrivatMarkup(ratesPrivat) {
    const ratesPrivatString = ratesPrivat.map(item => {
        const {
            ccy,
            base_ccy,
            normalizedBuyValue,
            normalizedSaleValue
        } = item;
        return `<tr key=${uuidv4()}>
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

    tablePrivat.innerHTML = ratesPrivatString;
};

setRateTable();
