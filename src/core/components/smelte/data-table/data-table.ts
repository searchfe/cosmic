import type { DataTableProps } from 'smelte/src/components/DataTable/DataTable';
import _DataTable from 'smelte/src/components/DataTable';
export default class <DataRow extends { [key: string]: any }> extends _DataTable<DataRow> {
    constructor(props: {
        target: Element;
        props: DataTableProps<DataRow>;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}