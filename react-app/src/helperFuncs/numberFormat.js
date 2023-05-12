export default function numberFormat(number) {
    // Formats large numbers to user-friendly strings
    // 1, 1e3, 1e6, 1e9, 1e12
    // number is between 1,000 and 1,000,000
    if (number / 1e3 >= 1 && number / 1e6 < 1) {
        return (`${Math.floor(number / 1e3)}K`);
    }
    // number is between 1M and 1B
    else if (number / 1e6 >= 1 && number / 1e9 < 1) {
        return (`${Math.floor(number / 1e6)}M`);
    }
    // number is between 1B and 1T
    else if (number / 1e9 >= 1 && number / 1e12 < 1) {
        return (`${Math.floor(number / 1e9)}B`);
    }
    // number is greater than 1T
    else if (number / 1e12 >= 1) {
        return (`1T+`);
    }

    else
        return `${number}`;
}

