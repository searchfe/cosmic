import SolidPaint from './solid-paint';
import RowsColsLayoutGrid from './rows-cols-layout-grid';

export type Paint = SolidPaint | Internal.GradientPaint | Internal.ImagePaint;

export type LayoutGrid = RowsColsLayoutGrid | Internal.GridLayoutGrid;

export { SolidPaint, RowsColsLayoutGrid };
