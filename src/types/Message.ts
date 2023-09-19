export type MessageType = 'openXlsxFile' | 'BToClient' ;

export interface MessageData<T> {
    data: T;
    [key: string]: any;
}