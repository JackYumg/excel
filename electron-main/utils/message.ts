import { ipcRenderer } from "electron";
import { MessageData } from "../../src/types/Message";

export function sendMessageToB<T>(messageType: string, messageData: MessageData<T>) {
    ipcRenderer.send(messageType, messageData);
}