import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { RadiusStyle } from '@cosmic/core/parts';

@injectable()
export default class RadiusStyleService extends BaseService<RadiusStyle> {
    constructor() {
        super();
        this.setType('fill');
        [1, 2, 3, 4, 5].map(item => this.transformToLocal({tl: [0], tr: [0], bl: [0], br: [0], name: item + '', id: item + ''})).forEach(item =>  {
            this.addLocalStyle(item);
        });

        [7,8,9,10].map(item => this.transformToLocal({tl: [0], tr: [0], bl: [0], br: [0], name: item + '', id: item + ''})).forEach(item =>  {
            this.addServiceStyle(item);
        });
    }

    create() {
        // TODO
    }

    transformToLocal(radius: gql.Corner) {
        const radiusStyle = new RadiusStyle();
        const {tl, tr, bl, br, name, id} = radius; 
        radiusStyle.tl = tl[0];
        radiusStyle.tr = tr[0];
        radiusStyle.bl = bl[0];
        radiusStyle.br = br[0];
        radiusStyle.name = name;
        radiusStyle.id = id;
        return radiusStyle;
    }

    transformToServer(fillStyle: FillStyle) {
        const { name, color } = fillStyle;
        return { 
            name,
            day: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        };
    }
 
}