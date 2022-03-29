type PluginAPI = Internal.PluginAPI;
type FontName = Internal.FontName;
type TextCase = Internal.TextCase;
type TextDecoration = Internal.TextDecoration;
type LetterSpacing = Internal.LetterSpacing;
type LineHeight = Internal.LineHeight;
type HyperlinkTarget = Internal.HyperlinkTarget;
type Paint = Internal.Paint;
type TextListOptions = Internal.TextListOptions;
type StyledTextSegment = Internal.StyledTextSegment;


export default class TextSublayerNode implements Internal.TextSublayerNode {

  readonly hasMissingFont: boolean;

  paragraphIndent: number;
  paragraphSpacing: number;

  fontSize: number | PluginAPI['mixed'];
  fontName: FontName | PluginAPI['mixed'];
  textCase: TextCase | PluginAPI['mixed'];
  textDecoration: TextDecoration | PluginAPI['mixed'];
  letterSpacing: LetterSpacing | PluginAPI['mixed'];
  lineHeight: LineHeight | PluginAPI['mixed'];
  hyperlink: HyperlinkTarget | null | PluginAPI['mixed'];

  characters: string;
  insertCharacters(start: number, characters: string, useStyle?: 'BEFORE' | 'AFTER') { /**TODO */ }
  deleteCharacters(start: number, end: number) { /**TODO */ }

  getRangeFontSize(start: number, end: number) { return 0; }
  setRangeFontSize(start: number, end: number, value: number) { /**TODO */ }
  getRangeFontName(start: number, end: number) { return '' as any; }
  setRangeFontName(start: number, end: number, value: FontName) { /**TODO */ }
  getRangeAllFontNames(start: number, end: number) { return []; }
  getRangeTextCase(start: number, end: number) { return '' as any; }
  setRangeTextCase(start: number, end: number, value: TextCase) { /**TODO */ }
  getRangeTextDecoration(start: number, end: number) { return '' as any; }
  setRangeTextDecoration(start: number, end: number, value: TextDecoration) { /**TODO */ }
  getRangeLetterSpacing(start: number, end: number) { return '' as any; }
  setRangeLetterSpacing(start: number, end: number, value: LetterSpacing) { /**TODO */ }
  getRangeLineHeight(start: number, end: number) { return '' as any; }
  setRangeLineHeight(start: number, end: number, value: LineHeight) { /**TODO */ }
  getRangeHyperlink(start: number, end: number) { return '' as any; }
  setRangeHyperlink(start: number, end: number, value: HyperlinkTarget | null) { /**TODO */ }
  getRangeFills(start: number, end: number) { return '' as any; }
  setRangeFills(start: number, end: number, value: Paint[]) { /**TODO */ }
  getRangeTextStyleId(start: number, end: number) { return '' as any; }
  setRangeTextStyleId(start: number, end: number, value: string) { /**TODO */ }
  getRangeFillStyleId(start: number, end: number) { return ''; }
  setRangeFillStyleId(start: number, end: number, value: string) { /**TODO */ }
  getRangeListOptions(start: number, end: number) { return '' as any; }
  setRangeListOptions(start: number, end: number, value: TextListOptions) { /**TODO */ }
  getRangeIndentation(start: number, end: number) { return 0; }
  setRangeIndentation(start: number, end: number, value: number) { /**TODO */ }
  getStyledTextSegments<StyledTextSegmentFields extends (keyof Omit<StyledTextSegment, 'characters' | 'start' | 'end'>)[]>(
    fields: StyledTextSegmentFields,
    start?: number,
    end?: number,
  ) { return []; }

}