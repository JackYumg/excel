
/** 获取列名 */
export const getColumnName = (colnumber: number) => {
    const data: string[] = [];
    for (let i = 0; i <= colnumber; i++) {
        data.push(getPater(i));
    }
    return data;
}

function getPater(num: number): string {
    if (num > 25) {
        const a = (num / 25) - 1;
        const b = num % 25;
        return getPater(a) + getPater(b);
    } else {
        return String.fromCharCode(65 + num);
    }
}