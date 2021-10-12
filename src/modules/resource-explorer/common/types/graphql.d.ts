/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ETextUnit {
  PIXELS = 'PIXELS',
  PERCENT = 'PERCENT',
  AUTO = 'AUTO',
}

export enum ETextAlignHorizontal {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
  JUSTIFIED = 'JUSTIFIED',
}

export enum ETextAlignVertical {
  TOP = 'TOP',
  CENTER = 'CENTER',
  BOTTOM = 'BOTTOM',
}

export enum EShadowType {
  INSET = 'INSET',
  OUTSET = 'OUTSET',
}

export enum EConstaintType {
  MIN = 'MIN',
  CENTER = 'CENTER',
  MAX = 'MAX',
  STRETCH = 'STRETCH',
  SCALE = 'SCALE',
}

export interface QueryProjectDTO {
  id?: Nullable<string>;
  name?: Nullable<string>;
  team?: Nullable<string>;
  parent?: Nullable<string>;
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

export interface CreateConstraintDTO {
  vertical: EConstaintType;
  horizontal: EConstaintType;
}

export interface CreateTextDTO {
  fontSize: number;
  fontName?: Nullable<FontNameDTO>;
  textAlignHorizontal?: Nullable<ETextAlignHorizontal>;
  textAlignVertical?: Nullable<ETextAlignVertical>;
  letterSpacing?: Nullable<TextValuePropDTO>;
  lineHeight?: Nullable<TextValuePropDTO>;
}

export interface FontNameDTO {
  family: string;
  style: string;
}

export interface TextValuePropDTO {
  value?: Nullable<number>;
  unit: ETextUnit;
}

export interface CreateCornerDTO {
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
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

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  intro?: Nullable<string>;
  avatar?: Nullable<string>;
}

export interface Color {
  id: string;
  color: ColorString;
}

export interface TextValueProp {
  value: number;
  unit: ETextUnit;
}

export interface FontName {
  family: string;
  style: string;
}

export interface Text {
  id: string;
  textAlignHorizontal: ETextAlignHorizontal;
  textAlignVertical: ETextAlignVertical;
  fontSize: number;
  fontName: FontName;
  letterSpacing: TextValueProp;
  lineHeight: TextValueProp;
}

export interface Stroke {
  id: string;
  dashPattern: number[];
  paint: string[];
  weight: number;
}

export interface Corner {
  id: string;
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
}

export interface Shadow {
  id: string;
  color?: Nullable<string>;
  type?: Nullable<EShadowType>;
  offset: Vetor;
  spread?: Nullable<number>;
  blur: number;
}

export interface Constraint {
  id: string;
  horizontal: EConstaintType;
  vertical: EConstaintType;
}

export interface Layout {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
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
  projects(project: QueryProjectDTO): Project[] | Promise<Project[]>;
  color(id: string): Color | Promise<Color>;
  text(id: string): Text | Promise<Text>;
  stroke(id: string): Stroke | Promise<Stroke>;
  corner(id: string): Corner | Promise<Corner>;
  shadow(id: string): Shadow | Promise<Shadow>;
  constraint(id: string): Constraint | Promise<Constraint>;
  layout(id: string): Layout | Promise<Layout>;
}

export interface IMutation {
  createUser(user: CreateUserDTO): User | Promise<User>;
  updateUser(user: UpdateUserDTO): boolean | Promise<boolean>;
  createTeam(team: CreateTeamDTO): Team | Promise<Team>;
  updateTeam(team: UpdateTeamDTO): boolean | Promise<boolean>;
  createMember(member: AddTeamMemberDTO, teamId: string): boolean | Promise<boolean>;
  createSpecification(specification: CreateSpecificationDTO): Specification | Promise<Specification>;
  updateSpecification(
    fields?: Nullable<string[]>,
    specification: UpdateSpecificationDTO
  ): Specification | Promise<Specification>;
  createCategory(category: CreateCategoryDTO): string | Promise<string>;
  updateCategory(category: UpdateCategoryDTO): boolean | Promise<boolean>;
  deleteCategory(categoryId: string, specificationId: string): boolean | Promise<boolean>;
  createLevel(level: CreateLevelDTO): Level | Promise<Level>;
  createItem(item: CreateItemDTO, levelId: string): string | Promise<string>;
  createProject(project: CreateProjectDTO): Project | Promise<Project>;
  updateProject(project: UpdateProjectDTO): boolean | Promise<boolean>;
  createColor(constraint: CreateConstraintDTO): Constraint | Promise<Constraint>;
  createText(text: CreateTextDTO): Text | Promise<Text>;
  createStroke(stroke: string): Stroke | Promise<Stroke>;
  createCorner(corner: CreateCornerDTO): Corner | Promise<Corner>;
  createShadow(shadow: string): Shadow | Promise<Shadow>;
  createLayout(layout: string): Layout | Promise<Layout>;
}

export type ColorString = any;
export type Vetor = any;
type Nullable<T> = T | null;
