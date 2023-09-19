"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const { contextBridge, ipcRenderer } = require("electron");
function sendMessage(messageType, message) {
  return ipcRenderer.send("sendMessage", messageType, message);
}
function resolveMessage(callback) {
  return ipcRenderer.on("resolveMessage", callback);
}
const openApis = {
  //-------------开放出去的api--------------//
  sendMessage,
  //-------------开放出去的监听api--------------//
  resolveMessage
};
contextBridge.exposeInMainWorld("electronAPI", openApis);
exports.openApis = openApis;
