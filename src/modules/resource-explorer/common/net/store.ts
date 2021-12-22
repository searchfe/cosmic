import { readable } from 'svelte/store';
import { Navigator } from './navigator';

export const isOnline = readable(false, function (toogle) {
  Navigator.getInstance().onNestStatusChange(toogle);
});
