/**
 * 节点
 */
export interface CosmicNode {

    /**
     * 节点 ID
     */
    id: string;

    /**
     * 节点名
     */
    name: string;

    /**
     * 节点类型
     */
    type: string; // 'container' | 'component'

    /**
     * 父级节点索引，根节点值为-1
     */
    parent: string;

    /**
     * 节点属性
     */
    props: CosmicProps;

    /**
     * 用于描述 props 的数据结构，符合标准 Schema 规范
     */
    schema?: Record<string, unknown>;

    /**
     * 子节点
     */
    children?: CosmicNode[];

    /**
     * 用于说明数据来源，仅在根节点上生效
     */
    data?: CosmicData;

    /**
     * 绑定事件，仅在根节点生效，需要额外开发事件回调函数
     */
    events?: CosmicEvent[];

    /**
     * 是否绑定生命周期，仅在根节点生效，需要额外开发生命周期函数
     */
    bindLifeCycle?: boolean;
}

/**
 * CosmicNode props
 */
export interface CosmicProps {

    /**
     * style
     */
    style?: Record<string, string>;

    /**
     * 其它原生 props 或自定义 props
     */
    [key: string]: Record<string, any>;
}

/**
 * 数据源
 */
 export interface CosmicData {

    /**
     * 数据
     */
    source: Record<string, any>;

    /**
     * 用于描述数据提供方的数据结构，符合标准 Schema 规范
     */
    schema?: Record<string, any>;
}

/**
 * 绑定事件
 */
 export interface CosmicEvent {

    /**
     * 需要绑定事件的节点 ID
     */
    id: string;

    /**
     * 事件名
     */
    eventName: string;

    /**
     * 事件函数名
     */
    eventHandler: string;
}