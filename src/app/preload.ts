import {contextBridge} from 'electron';

contextBridge.exposeInMainWorld('electron', {
    name: 1,
});

