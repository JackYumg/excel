import { BrowserWindow, Menu, MenuItem, dialog } from "electron";
import { reaFile } from "./utils/files";
import { read, utils } from 'xlsx';
const menus = new Menu();
export const addMenu = (app: Electron.App, win: BrowserWindow) => {
    menus.append(new MenuItem({
        label: '文件', role: 'fileMenu', submenu: [{
            label: '打开', click: () => {
                dialog.showOpenDialog({
                    properties: [
                        'openFile'
                    ]
                }).then(({ canceled, filePaths }) => {
                    const data = reaFile(filePaths[0]);
                    const wb = read(data);
                    const datas = utils.sheet_to_txt(wb.Sheets[wb.SheetNames[0]]);
                    const rows = datas.split(/\n/);
                    const res: string[][] = [];
                    rows.forEach((item) => {
                        const temp = item.split(/\s|\n|t/);
                        res.push(temp);
                    });
                    win.webContents.send('resolveMessage', 'openXlsxFile', { data: res })
                });
            }
        }, { label: '导入' }, { label: '导出' }, {
            label: '退出', click: () => {
                app.exit();
            }
        }]
    }));
    Menu.setApplicationMenu(menus);
}