export default class PublishableMixin {
    description: string;
    documentationLinks: ReadonlyArray<Internal.DocumentationLink>;
    readonly remote: boolean;
    readonly key: string;
    getPublishStatusAsync() {
      // TODO
      return '' as any;
    }
}