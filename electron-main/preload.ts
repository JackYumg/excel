const { contextBridge, ipcRenderer } = require('electron');
import { IpcRendererEvent } from 'electron';
import { MessageData, MessageType } from '../src/types/Message';

function sendMessage<T>(messageType: MessageType, message: MessageData<T>) {
  return ipcRenderer.send('sendMessage', messageType, message);
}


type ResolveFn<T> = (event: IpcRendererEvent, messageType: MessageType, messageData: MessageData<T>) => void;

function resolveMessage<T>(callback: ResolveFn<T>) {
  return ipcRenderer.on('resolveMessage', callback);
}

export const openApis = {
  //-------------开放出去的api--------------//
  sendMessage,
  //-------------开放出去的监听api--------------//
  resolveMessage
}
export type ChannelType = keyof typeof openApis;

contextBridge.exposeInMainWorld('electronAPI', openApis);