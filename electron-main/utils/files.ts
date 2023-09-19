import fs from 'fs';
import * as XLSX from 'xlsx';
import quotedPrintable from 'quoted-printable';
import utf8 from 'utf8';
XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
export const reaFile = (path) => {
    const e = fs.readFileSync(path);
    return e;
}

export const createVcfTxt = (entity) => {
    let item = quotedPrintable.encode(utf8.encode(entity['名称']));
    return `
BEGIN:VCARD
VERSION:2.1
FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:${item}
TEL;CELL:${entity['电话号码']}
END:VCARD`
}

export const creaetVf = (data) => {
    let res = '';
    data.forEach((item) => {
        res += createVcfTxt(item);
    });
    fs.writeFileSync('D://' + Date.now() + '.vcf', res, { encoding: 'utf-8' });
}