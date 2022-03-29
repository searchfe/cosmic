import DocumentNode from './base/document-node';
import PageNode from './base/page-node';
import ComponentNode from './sence/component-node';
import TextNode from './sence/text-node';
import GroupNode from './sence/group-node';

export { DocumentNode, PageNode };

export { GroupNode, ComponentNode, TextNode};

export type SceneNode =  GroupNode | ComponentNode | TextNode;

export { hasMixin } from 'ts-mixer';

// type SceneNode =
//   SliceNode |
//   FrameNode |
//   GroupNode |
//   ComponentSetNode |
//   ComponentNode |
//   InstanceNode |
//   BooleanOperationNode |
//   VectorNode |
//   StarNode |
//   LineNode |
//   EllipseNode |
//   PolygonNode |
//   RectangleNode |
//   TextNode |
//   StickyNode |
//   ConnectorNode |
//   ShapeWithTextNode |
//   CodeBlockNode |
//   StampNode |
//   WidgetNode |
//   EmbedNode |
//   LinkUnfurlNode |
//   MediaNode

export { default as ChildrenMixin } from './mixin/children-mixin';

export * from './style/text-style';
export * from './style/fill-style';
export * from './style/radius-style';
export * from './style/effect-style';
export * from './style/stroke-style';
