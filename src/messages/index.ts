import { message } from "ant-design-vue";
import { MessageData, MessageType } from "../types/Message";
import { Subject } from "rxjs";
export const globalSubject = new Subject();
export const useMessageTool = () => {
    window.electronAPI?.resolveMessage((_event: any, messageType: MessageType, messageData: MessageData<number>) => {
        globalSubject.next({messageType , messageData});
    });
}