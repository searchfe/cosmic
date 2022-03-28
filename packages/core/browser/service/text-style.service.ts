import { injectable } from '@cosmic/core/inversify';

type TextStyleId = string;

@injectable()
export default class TextStyleService {

    map: Record<TextStyleId, Internal.TextStyle>;

    create() {
      return '' as TextStyleId;
    }

    delete(string: TextStyleId) {
        // TODO
    }

    get(string: TextStyleId) {
        return {} as Internal.TextStyle;
    }

    clone(textStyleId: TextStyleId): TextStyleId {
        return '';
    }
}