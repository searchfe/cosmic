import BaseStyle from './base-style';
export class TextStyle extends BaseStyle implements Internal.TextStyle {
    type: 'TEXT';
    fontSize: number;
    textDecoration: Internal.TextDecoration;
    fontName: Internal.FontName;
    letterSpacing: Internal.LetterSpacing;
    lineHeight: Internal.LineHeight;
    paragraphIndent: number;
    paragraphSpacing: number;
    textCase: Internal.TextCase;

    constructor(id: string) {
        super(id, 'TEXT');
        // TODO:
        this.type = 'TEXT';
    }

    public clone(): TextStyle {
        const target = JSON.parse(JSON.stringify(this));
        target.clone = this.clone;
        return {...target};
    }
}