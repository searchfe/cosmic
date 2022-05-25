export default class RowsColsLayoutGrid implements Internal.RowsColsLayoutGrid {
    pattern: 'ROWS' | 'COLUMNS' = 'ROWS';
    alignment: 'MIN' | 'MAX' | 'STRETCH' | 'CENTER' = 'STRETCH';
    gutterSize = 10;

    count  = 12;      // Infinity when 'Auto' is set in the UI
    sectionSize? = 0; // Not set for alignment: 'STRETCH'
    offset? = 0;     // Not set for alignment: 'CENTER'

    visible?: boolean = true;
    rcolor?: Internal.RGBA = {r: 0, g: 36, b: 255, a: 10};
}
