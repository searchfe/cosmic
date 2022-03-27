import DocumentNode from './base/document-node';
import PageNode from './base/page-node';
import ComponentNode from './sence/component-node';
import TextNode from './sence/text-node';

export { DocumentNode, PageNode };

export { ComponentNode, TextNode};

export type SceneNode = ComponentNode | TextNode;

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
