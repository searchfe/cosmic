
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
namespace gql {
export interface QueryTeamDTO {
    id?: Nullable<string>;
    name?: Nullable<string>;
    members?: Nullable<QueryTeamMemberDTO>;
}

export interface QueryTeamMemberDTO {
    user: string;
}

export interface QueryProjectDTO {
    id?: Nullable<string>;
    name?: Nullable<string>;
    team?: Nullable<string>;
    parent?: Nullable<string>;
}

export interface QueryColorDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    day?: Nullable<string>;
    night?: Nullable<string>;
    dark?: Nullable<string>;
    id?: Nullable<string>;
}

export interface QueryFontDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    style?: Nullable<string>;
    variant?: Nullable<string>;
    weight?: Nullable<string>;
    size?: Nullable<string>;
    lineHeight?: Nullable<string>;
    family?: Nullable<string>;
    id?: Nullable<string>;
}

export interface QueryShadowDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    type?: Nullable<string>;
    offsetX?: Nullable<string>;
    offsetY?: Nullable<string>;
    blur?: Nullable<string>;
    spread?: Nullable<string>;
    color?: Nullable<string>;
    id?: Nullable<string>;
}

export interface QueryBorderDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    top?: Nullable<BorderItemInput>;
    right?: Nullable<BorderItemInput>;
    bottom?: Nullable<BorderItemInput>;
    left?: Nullable<BorderItemInput>;
    id?: Nullable<string>;
}

export interface BorderItemInput {
    weight: string;
    style: string;
}

export interface QueryCornerDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    tl?: Nullable<string[]>;
    tr?: Nullable<string[]>;
    bl?: Nullable<string[]>;
    br?: Nullable<string[]>;
    id?: Nullable<string>;
}

export interface QueryOpacityDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    opacity?: Nullable<number>;
    id?: Nullable<string>;
}

export interface QueryComponentDTO {
    team?: Nullable<string>;
    name?: Nullable<string>;
}

export interface QueryPrefabDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    component?: Nullable<string>;
    atoms?: Nullable<string[]>;
    id?: Nullable<string>;
}

export interface QueryDraftDTO {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    team?: Nullable<string>;
    project?: Nullable<string>;
    data?: Nullable<JSON>;
    id?: Nullable<string>;
}

export interface CreateUserDTO {
    name?: Nullable<string>;
    username: string;
    password: string;
    email: string;
    intro?: Nullable<string>;
    avatar?: Nullable<string>;
}

export interface UpdateUserDTO {
    name?: Nullable<string>;
    intro?: Nullable<string>;
    avatar?: Nullable<string>;
    id: string;
}

export interface CreateTeamDTO {
    name: string;
}

export interface UpdateTeamDTO {
    id: string;
    name: string;
}

export interface AddTeamMemberDTO {
    user: string;
    permission?: Nullable<string>;
}

export interface CreateSpecificationDTO {
    name: string;
    team: string;
}

export interface UpdateSpecificationDTO {
    name: string;
    id: string;
}

export interface CreateCategoryDTO {
    specificationId: string;
    name: string;
    icon?: Nullable<string>;
}

export interface UpdateCategoryDTO {
    specificationId: string;
    name: string;
    id: string;
}

export interface CreateLevelDTO {
    specification: string;
    category: string;
    parent?: Nullable<string>;
    name: string;
    items?: Nullable<CreateItemDTO[]>;
}

export interface CreateItemDTO {
    name: string;
    imgs?: Nullable<string[]>;
    text?: Nullable<string>;
    info?: Nullable<string>;
    meta?: Nullable<string>;
}

export interface CreateProjectDTO {
    name: string;
    team: string;
    parent?: Nullable<string>;
}

export interface UpdateProjectDTO {
    name: string;
    id: string;
}

export interface CreateColorDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    day: string;
    night?: Nullable<string>;
    dark?: Nullable<string>;
}

export interface CreateFontDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    style?: Nullable<string>;
    variant?: Nullable<string>;
    weight?: Nullable<string>;
    size?: Nullable<string>;
    lineHeight?: Nullable<string>;
    family?: Nullable<string>;
}

export interface CreateShadowDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    type?: Nullable<string>;
    offsetX?: Nullable<string>;
    offsetY?: Nullable<string>;
    blur: string;
    spread?: Nullable<string>;
    color?: Nullable<string>;
}

export interface CreateBorderDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    top: BorderItemInput;
    right: BorderItemInput;
    bottom: BorderItemInput;
    left: BorderItemInput;
}

export interface CreateCornerDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    tl: string[];
    tr: string[];
    bl: string[];
    br: string[];
}

export interface CreateOpacityDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    opacity: number;
}

export interface CreateComponentDTO {
    name: string;
    desc: string;
    team: string;
    displayName: string;
    keyNodes: CreateKeyNode[];
    properties: CreateProperty[];
    variants: CreateVariant[];
}

export interface CreateKeyNode {
    type: string;
    name: string;
    desc: string;
}

export interface CreateProperty {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
}

export interface CreateVariant {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
}

export interface CreatePrefabDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    component: string;
    atoms: string[];
}

export interface CreateDraftDTO {
    name: string;
    desc?: Nullable<string>;
    team: string;
    project: string;
    data: JSON;
}

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    name: string;
    intro?: Nullable<string>;
    avatar?: Nullable<string>;
}

export interface Team {
    id: string;
    name: string;
    members: TeamMemer[];
}

export interface TeamMemer {
    user: string;
    permission: string;
}

export interface Project {
    id: string;
    team: string;
    name: string;
    parent?: Nullable<string>;
}

export interface Level {
    id: string;
    name: string;
    specification: string;
    category: string;
    parent?: Nullable<string>;
    items?: Nullable<Item[]>;
}

export interface Item {
    id: string;
    name: string;
    imgs?: Nullable<string[]>;
    text?: Nullable<string>;
    info?: Nullable<string>;
    meta?: Nullable<string>;
}

export interface Specification {
    id: string;
    name: string;
    team: string;
    categories: Category[];
}

export interface Category {
    id: string;
    name: string;
    icon?: Nullable<string>;
}

export interface Color {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    day: string;
    night: string;
    dark: string;
}

export interface Font {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    style: string;
    variant: string;
    weight: string;
    size: string;
    lineHeight: string;
    family: string;
}

export interface Shadow {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    type?: Nullable<string>;
    offsetX?: Nullable<string>;
    offsetY?: Nullable<string>;
    blur: string;
    spread?: Nullable<string>;
    color?: Nullable<string>;
}

export interface BorderItem {
    weight: string;
    style: string;
}

export interface Border {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    top: BorderItem;
    right: BorderItem;
    bottom: BorderItem;
    left: BorderItem;
}

export interface Corner {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    tl: string[];
    tr: string[];
    bl: string[];
    br: string[];
}

export interface Opacity {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    opacity: number;
}

export interface Property {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
}

export interface Variant {
    name: string;
    type: string;
    defaultValue: string;
    desc: string;
}

export interface KeyNode {
    type: string;
    name: string;
    desc: string;
}

export interface Component {
    id: string;
    name: string;
    desc: string;
    team: string;
    updatedAt: string;
    displayName: string;
    keyNodes: KeyNode[];
    properties: Property[];
    variants: Variant[];
}

export interface Prefab {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    component: string;
    atoms: string[];
}

export interface Draft {
    id: string;
    name: string;
    desc?: Nullable<string>;
    team: string;
    updatedAt: string;
    project: string;
    data: JSON;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    team(id: string): Team | Promise<Team>;
    teams(query?: Nullable<QueryTeamDTO>): Team[] | Promise<Team[]>;
    specification(fields?: Nullable<string[]>, id: string): Specification | Promise<Specification>;
    getAllSpecification(teamId: string): Specification[] | Promise<Specification[]>;
    category(fields?: Nullable<string[]>, categoryId: string, specificationId: string): Category | Promise<Category>;
    level(fields?: Nullable<string[]>, id: string): Level | Promise<Level>;
    levels(categories: string[], specification: string): Level[] | Promise<Level[]>;
    project(id: string): Project | Promise<Project>;
    projects(project?: Nullable<QueryProjectDTO>): Project[] | Promise<Project[]>;
    projectStructure(id: string): ProjectPlus[] | Promise<ProjectPlus[]>;
    getColor(id: string): Nullable<Color> | Promise<Nullable<Color>>;
    colors(query?: Nullable<QueryColorDTO>): Color[] | Promise<Color[]>;
    getFont(id: string): Nullable<Font> | Promise<Nullable<Font>>;
    fonts(query?: Nullable<QueryFontDTO>): Font[] | Promise<Font[]>;
    getShadow(id: string): Nullable<Shadow> | Promise<Nullable<Shadow>>;
    shadows(query?: Nullable<QueryShadowDTO>): Shadow[] | Promise<Shadow[]>;
    getBorder(id: string): Nullable<Border> | Promise<Nullable<Border>>;
    borders(query?: Nullable<QueryBorderDTO>): Border[] | Promise<Border[]>;
    getCorner(id: string): Nullable<Corner> | Promise<Nullable<Corner>>;
    corners(query?: Nullable<QueryCornerDTO>): Corner[] | Promise<Corner[]>;
    getOpacity(id: string): Nullable<Opacity> | Promise<Nullable<Opacity>>;
    opacitys(query?: Nullable<QueryOpacityDTO>): Opacity[] | Promise<Opacity[]>;
    getComponent(id: string): Nullable<Component> | Promise<Nullable<Component>>;
    components(query?: Nullable<QueryComponentDTO>): Component[] | Promise<Component[]>;
    getPrefab(id: string): Nullable<Prefab> | Promise<Nullable<Prefab>>;
    prefabs(query?: Nullable<QueryPrefabDTO>): Prefab[] | Promise<Prefab[]>;
    getDraft(id: string): Nullable<Draft> | Promise<Nullable<Draft>>;
    drafts(query?: Nullable<QueryDraftDTO>): Draft[] | Promise<Draft[]>;
}

export interface ProjectPlus {
    id: string;
    team: string;
    name: string;
    parent?: Nullable<string>;
    hasChildren: boolean;
}

export interface IMutation {
    createUser(user: CreateUserDTO): User | Promise<User>;
    updateUser(user: UpdateUserDTO): boolean | Promise<boolean>;
    createTeam(team: CreateTeamDTO): Team | Promise<Team>;
    updateTeam(team: UpdateTeamDTO): boolean | Promise<boolean>;
    createMember(member: AddTeamMemberDTO, teamId: string): boolean | Promise<boolean>;
    createSpecification(specification: CreateSpecificationDTO): Specification | Promise<Specification>;
    updateSpecification(fields?: Nullable<string[]>, specification: UpdateSpecificationDTO): Specification | Promise<Specification>;
    createCategory(category: CreateCategoryDTO): string | Promise<string>;
    updateCategory(category: UpdateCategoryDTO): boolean | Promise<boolean>;
    deleteCategory(categoryId: string, specificationId: string): boolean | Promise<boolean>;
    createLevel(level: CreateLevelDTO): Level | Promise<Level>;
    createItem(item: CreateItemDTO, levelId: string): string | Promise<string>;
    createProject(project: CreateProjectDTO): Project | Promise<Project>;
    updateProject(project: UpdateProjectDTO): boolean | Promise<boolean>;
    deleteProject(id: string): boolean | Promise<boolean>;
    createColor(data: CreateColorDTO): Color | Promise<Color>;
    createUniqueColor(filter: QueryColorDTO, data: CreateColorDTO): Color | Promise<Color>;
    updateColor(data: QueryColorDTO): boolean | Promise<boolean>;
    deleteColor(id: string): boolean | Promise<boolean>;
    createFont(data: CreateFontDTO): Font | Promise<Font>;
    createUniqueFont(filter: QueryFontDTO, data: CreateFontDTO): Font | Promise<Font>;
    updateFont(data: QueryFontDTO): boolean | Promise<boolean>;
    deleteFont(id: string): boolean | Promise<boolean>;
    createShadow(data: CreateShadowDTO): Shadow | Promise<Shadow>;
    createUniqueShadow(filter: QueryShadowDTO, data: CreateShadowDTO): Shadow | Promise<Shadow>;
    updateShadow(data: QueryShadowDTO): boolean | Promise<boolean>;
    deleteShadow(id: string): boolean | Promise<boolean>;
    createBorder(data: CreateBorderDTO): Border | Promise<Border>;
    createUniqueBorder(filter: QueryBorderDTO, data: CreateBorderDTO): Border | Promise<Border>;
    updateBorder(data: QueryBorderDTO): boolean | Promise<boolean>;
    deleteBorder(id: string): boolean | Promise<boolean>;
    createCorner(data: CreateCornerDTO): Corner | Promise<Corner>;
    createUniqueCorner(filter: QueryCornerDTO, data: CreateCornerDTO): Corner | Promise<Corner>;
    updateCorner(data: QueryCornerDTO): boolean | Promise<boolean>;
    deleteCorner(id: string): boolean | Promise<boolean>;
    createOpacity(data: CreateOpacityDTO): Opacity | Promise<Opacity>;
    createUniqueOpacity(filter: QueryOpacityDTO, data: CreateOpacityDTO): Opacity | Promise<Opacity>;
    updateOpacity(data: QueryOpacityDTO): boolean | Promise<boolean>;
    deleteOpacity(id: string): boolean | Promise<boolean>;
    createComponent(data: CreateComponentDTO): Component | Promise<Component>;
    createUniqueComponent(filter: QueryComponentDTO, data: CreateComponentDTO): Component | Promise<Component>;
    updateComponent(data: CreateComponentDTO): boolean | Promise<boolean>;
    deleteComponent(id: string): boolean | Promise<boolean>;
    deleteComponentByTeamAndName(data: QueryComponentDTO): number | Promise<number>;
    updateComponentByTeamAndName(data: CreateComponentDTO): boolean | Promise<boolean>;
    createPrefab(data: CreatePrefabDTO): Prefab | Promise<Prefab>;
    createUniquePrefab(filter: QueryPrefabDTO, data: CreatePrefabDTO): Prefab | Promise<Prefab>;
    updatePrefab(data: QueryPrefabDTO): boolean | Promise<boolean>;
    deletePrefab(id: string): boolean | Promise<boolean>;
    createDraft(data: CreateDraftDTO): Draft | Promise<Draft>;
    createUniqueDraft(filter: QueryDraftDTO, data: CreateDraftDTO): Draft | Promise<Draft>;
    updateDraft(data: QueryDraftDTO): boolean | Promise<boolean>;
    deleteDraft(id: string): boolean | Promise<boolean>;
}

export interface ISubscription {
    onColorCreate(): Color | Promise<Color>;
    onFontCreate(): Font | Promise<Font>;
    onShadowCreate(): Shadow | Promise<Shadow>;
    onBorderCreate(): Border | Promise<Border>;
    onCornerCreate(): Corner | Promise<Corner>;
    onOpacityCreate(): Opacity | Promise<Opacity>;
    onComponentCreate(): Component | Promise<Component>;
    onPrefabCreate(): Prefab | Promise<Prefab>;
    onDraftCreate(): Draft | Promise<Draft>;
}

export type JSON = any;
type Nullable<T> = T | null;
}
