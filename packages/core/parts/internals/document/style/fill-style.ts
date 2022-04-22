import SolidPaint from '../property/solid-paint';

export class FillStyle extends SolidPaint {
    readonly id: string;
    name: string;
    description: string;


    constructor(id: string) {
        super();
        this.id = id;
    }

    clone(): FillStyle {
        const fill = JSON.parse(JSON.stringify(this));
        fill.clone = this.clone;
        return fill;
    }
}