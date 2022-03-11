/*
* -------------------------------------------------------
* THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
* -------------------------------------------------------
*/
declare namespace gql {
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

    export enum EConstaintType {
        MIN = 'MIN',
        CENTER = 'CENTER',
        MAX = 'MAX',
        STRETCH = 'STRETCH',
        SCALE = 'SCALE',
    }

    export enum EShadowType {
        INSET = 'INSET',
        OUTSET = 'OUTSET',
    }

    export interface QueryProjectDTO {
        id?: Nullable<string>;
        name?: Nullable<string>;
        team?: Nullable<string>;
        parent?: Nullable<string>;
    }

    export interface QueryColorDTO {
        id?: Nullable<string>;
        team?: Nullable<string>;
    }

    export interface QueryTextDTO {
        id?: Nullable<string>;
        team?: Nullable<string>;
    }

    export interface QueryStrokeDTO {
        id?: Nullable<string>;
        team?: Nullable<string>;
    }

    export interface QueryConstraintDTO {
        id?: Nullable<string>;
        team?: Nullable<string>;
    }

    export interface QueryShadowDTO {
        id?: Nullable<string>;
        team?: Nullable<string>;
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
        color: string;
        team?: Nullable<string>;
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

    export interface CreatStrokeDTO {
        paint: string[];
        weight: number;
    }

    export interface CreateConstraintDTO {
        vertical: EConstaintType;
        horizontal: EConstaintType;
    }

    export interface CreateShadowDTO {
        type?: Nullable<EShadowType>;
        spread?: Nullable<number>;
        blur: number;
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
        team: string;
        color: string;
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
        team: string;
        fontSize: number;
        textAlignHorizontal: ETextAlignHorizontal;
        textAlignVertical: ETextAlignVertical;
        fontName: FontName;
        letterSpacing: TextValueProp;
        lineHeight: TextValueProp;
    }

    export interface Constraint {
        id: string;
        team: string;
        horizontal: EConstaintType;
        vertical: EConstaintType;
    }

    export interface Shadow {
        id: string;
        team: string;
        color?: Nullable<string>;
        type?: Nullable<EShadowType>;
        spread?: Nullable<number>;
        blur: number;
    }

    export interface Stroke {
        id: string;
        team: string;
        paint: string[];
        weight: number;
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
        getColor(fields?: Nullable<string[]>, id: string): Nullable<Color> | Promise<Nullable<Color>>;
        colors(fields?: Nullable<string[]>, query?: Nullable<QueryColorDTO>): Color[] | Promise<Color[]>;
        getText(fields?: Nullable<string[]>, id: string): Nullable<Text> | Promise<Nullable<Text>>;
        texts(fields?: Nullable<string[]>, query?: Nullable<QueryTextDTO>): Text[] | Promise<Text[]>;
        getStroke(fields?: Nullable<string[]>, id: string): Nullable<Stroke> | Promise<Nullable<Stroke>>;
        strokes(fields?: Nullable<string[]>, query?: Nullable<QueryStrokeDTO>): Stroke[] | Promise<Stroke[]>;
        getConstraint(fields?: Nullable<string[]>, id: string): Nullable<Constraint> | Promise<Nullable<Constraint>>;
        constraints(
            fields?: Nullable<string[]>,
            query?: Nullable<QueryConstraintDTO>,
            ): Constraint[] | Promise<Constraint[]>;
            getShadow(fields?: Nullable<string[]>, id: string): Nullable<Shadow> | Promise<Nullable<Shadow>>;
            shadows(fields?: Nullable<string[]>, query?: Nullable<QueryShadowDTO>): Shadow[] | Promise<Shadow[]>;
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
                specification: UpdateSpecificationDTO,
                ): Specification | Promise<Specification>;
                createCategory(category: CreateCategoryDTO): string | Promise<string>;
                updateCategory(category: UpdateCategoryDTO): boolean | Promise<boolean>;
                deleteCategory(categoryId: string, specificationId: string): boolean | Promise<boolean>;
                createLevel(level: CreateLevelDTO): Level | Promise<Level>;
                createItem(item: CreateItemDTO, levelId: string): string | Promise<string>;
                createProject(project: CreateProjectDTO): Project | Promise<Project>;
                updateProject(project: UpdateProjectDTO): boolean | Promise<boolean>;
                createColor(data: CreateColorDTO): Color | Promise<Color>;
                updateColor(data: CreateColorDTO): Color | Promise<Color>;
                deleteColor(id: string): Color | Promise<Color>;
                createText(data: CreateTextDTO): Text | Promise<Text>;
                updateText(data: CreateTextDTO): Text | Promise<Text>;
                deleteText(id: string): Text | Promise<Text>;
                createStroke(data: CreatStrokeDTO): Stroke | Promise<Stroke>;
                updateStroke(data: CreatStrokeDTO): Stroke | Promise<Stroke>;
                deleteStroke(id: string): Stroke | Promise<Stroke>;
                createConstraint(data: CreateConstraintDTO): Constraint | Promise<Constraint>;
                updateConstraint(data: CreateConstraintDTO): Constraint | Promise<Constraint>;
                deleteConstraint(id: string): Constraint | Promise<Constraint>;
                createShadow(data: CreateShadowDTO): Shadow | Promise<Shadow>;
                updateShadow(data: CreateShadowDTO): Shadow | Promise<Shadow>;
                deleteShadow(id: string): Shadow | Promise<Shadow>;
            }

            export interface ISubscription {
                onColorCreate(): Color | Promise<Color>;
                onTextCreate(): Text | Promise<Text>;
                onStrokeCreate(): Stroke | Promise<Stroke>;
                onConstraintCreate(): Constraint | Promise<Constraint>;
                onShadowCreate(): Shadow | Promise<Shadow>;
            }

            type Nullable<T> = T | null;
        }

