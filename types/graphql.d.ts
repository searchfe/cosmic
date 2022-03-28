
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
namespace gql {
export interface QueryProjectDTO {
    id?: Nullable<string>;
    name?: Nullable<string>;
    team?: Nullable<string>;
    parent?: Nullable<string>;
}

export interface QueryBaseDTO {
    id: string;
    team: string;
}

export interface QueryComponentDTO {
    team: string;
    name: string;
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
    f?: Nullable<string>;
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
    team: string;
    day: string;
    night?: Nullable<string>;
    dark?: Nullable<string>;
}

export interface CreateFontDTO {
    name: string;
    team: string;
    style: string;
    variant: string;
    weight: string;
    size: string;
    lineHeight: string;
    family: string;
}

export interface CreateShadowDTO {
    name: string;
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
    team: string;
    top: BorderItemInput;
    right: BorderItemInput;
    bottom: BorderItemInput;
    left: BorderItemInput;
}

export interface BorderItemInput {
    weight: string;
    style: string;
}

export interface CreateCornerDTO {
    name: string;
    team: string;
    tl: string[];
    tr: string[];
    bl: string[];
    br: string[];
}

export interface CreateOpacityDTO {
    name: string;
    team: string;
    opacity: number;
}

export interface CreateComponentDTO {
    name: string;
    team: string;
    displayName: string;
    desc: string;
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
    team: string;
    day: string;
    night: string;
    dark: string;
}

export interface Font {
    id: string;
    name: string;
    team: string;
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
    team: string;
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
    team: string;
    top: BorderItem;
    right: BorderItem;
    bottom: BorderItem;
    left: BorderItem;
}

export interface Corner {
    id: string;
    name: string;
    team: string;
    tl: string[];
    tr: string[];
    bl: string[];
    br: string[];
}

export interface Opacity {
    id: string;
    name: string;
    team: string;
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
    team: string;
    displayName: string;
    desc: string;
    keyNodes: KeyNode[];
    properties: Property[];
    variants: Variant[];
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    team(id: string): Team | Promise<Team>;
    teams(): Team[] | Promise<Team[]>;
    specification(fields?: Nullable<string[]>, id: string): Specification | Promise<Specification>;
    getAllSpecification(teamId: string): Specification[] | Promise<Specification[]>;
    category(fields?: Nullable<string[]>, categoryId: string, specificationId: string): Category | Promise<Category>;
    level(fields?: Nullable<string[]>, id: string): Level | Promise<Level>;
    levels(categories: string[], specification: string): Level[] | Promise<Level[]>;
    project(id: string): Project | Promise<Project>;
    projects(project?: Nullable<QueryProjectDTO>): Project[] | Promise<Project[]>;
    projectStructure(id: string): ProjectPlus[] | Promise<ProjectPlus[]>;
    getColor(fields?: Nullable<string[]>, id: string): Nullable<Color> | Promise<Nullable<Color>>;
    colors(fields?: Nullable<string[]>, query?: Nullable<QueryBaseDTO>): Color[] | Promise<Color[]>;
    getFont(fields?: Nullable<string[]>, id: string): Nullable<Font> | Promise<Nullable<Font>>;
    fonts(fields?: Nullable<string[]>, query?: Nullable<QueryBaseDTO>): Font[] | Promise<Font[]>;
    getShadow(fields?: Nullable<string[]>, id: string): Nullable<Shadow> | Promise<Nullable<Shadow>>;
    shadows(fields?: Nullable<string[]>, query?: Nullable<QueryBaseDTO>): Shadow[] | Promise<Shadow[]>;
    getBorder(fields?: Nullable<string[]>, id: string): Nullable<Border> | Promise<Nullable<Border>>;
    borders(fields?: Nullable<string[]>, query?: Nullable<QueryBaseDTO>): Border[] | Promise<Border[]>;
    getCorner(fields?: Nullable<string[]>, id: string): Nullable<Corner> | Promise<Nullable<Corner>>;
    corners(fields?: Nullable<string[]>, query?: Nullable<QueryBaseDTO>): Corner[] | Promise<Corner[]>;
    getOpacity(fields?: Nullable<string[]>, id: string): Nullable<Opacity> | Promise<Nullable<Opacity>>;
    opacitys(fields?: Nullable<string[]>, query?: Nullable<QueryBaseDTO>): Opacity[] | Promise<Opacity[]>;
    getComponent(fields?: Nullable<string[]>, id: string): Nullable<Component> | Promise<Nullable<Component>>;
    components(fields?: Nullable<string[]>, query?: Nullable<QueryComponentDTO>): Component[] | Promise<Component[]>;
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
    updateColor(data: CreateColorDTO): Color | Promise<Color>;
    deleteColor(id: string): Color | Promise<Color>;
    createFont(data: CreateFontDTO): Font | Promise<Font>;
    updateFont(data: CreateFontDTO): Font | Promise<Font>;
    deleteFont(id: string): Font | Promise<Font>;
    createShadow(data: CreateShadowDTO): Shadow | Promise<Shadow>;
    updateShadow(data: CreateShadowDTO): Shadow | Promise<Shadow>;
    deleteShadow(id: string): Shadow | Promise<Shadow>;
    createBorder(data: CreateBorderDTO): Border | Promise<Border>;
    updateBorder(data: CreateBorderDTO): Border | Promise<Border>;
    deleteBorder(id: string): Border | Promise<Border>;
    createCorner(data: CreateCornerDTO): Corner | Promise<Corner>;
    updateCorner(data: CreateCornerDTO): Corner | Promise<Corner>;
    deleteCorner(id: string): Corner | Promise<Corner>;
    createOpacity(data: CreateOpacityDTO): Opacity | Promise<Opacity>;
    updateOpacity(data: CreateOpacityDTO): Opacity | Promise<Opacity>;
    deleteOpacity(id: string): Opacity | Promise<Opacity>;
    createComponent(data: CreateComponentDTO): Component | Promise<Component>;
    updateComponent(data: CreateComponentDTO): Component | Promise<Component>;
    deleteComponent(id: string): Component | Promise<Component>;
}

export interface ISubscription {
    onColorCreate(): Color | Promise<Color>;
    onFontCreate(): Font | Promise<Font>;
    onShadowCreate(): Shadow | Promise<Shadow>;
    onBorderCreate(): Border | Promise<Border>;
    onCornerCreate(): Corner | Promise<Corner>;
    onOpacityCreate(): Opacity | Promise<Opacity>;
    onComponentCreate(): Component | Promise<Component>;
}

type Nullable<T> = T | null;
}
