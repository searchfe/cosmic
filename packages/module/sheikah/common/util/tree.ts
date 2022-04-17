import type { TreeDataProps } from 'cosmic-vue';


interface TreeNode extends TreeDataProps {
    parent?: gql.Nullable<string>;
}

export function generateProjectForest(projects: gql.Project[], teams: string[]) {
    const teamMap = new Map<string, TreeNode>();
    const idNodeMap = new Map<string, TreeNode>();
    const unresolvedNode: TreeNode[] = [];

    teams.forEach(team => {
        teamMap.set(team, {
            id: '',
            label: '项目类别',
            children: [],
            isGroup: '',
            selected: '',
            open: '0',
        });
    });

    projects.forEach(project => {
        const treeNode = {
            id: project.id,
            label: project.name,
            children: [],
            parent: project.parent,
            extra: '+',
            selected: '',
            open: '0',
        };
        idNodeMap.set(project.id, treeNode);
        if (!project.parent) {
            // 团队一级项目
            teamMap.get(project.team)?.children?.push(treeNode);
        } else if (idNodeMap.has(project.parent)) {
            // 子项目父项目已遍历
            idNodeMap.get(project.parent)?.children?.push(treeNode);
        } else {
            // 暂时未确定父项目的子项目
            unresolvedNode.push(treeNode);
        }
    });

    unresolvedNode.forEach(pro => {
        if (pro.parent && idNodeMap.get(pro.parent)) {
            idNodeMap.get(pro.parent)?.children?.push(pro);
            delete pro.parent;
        }
    });

    return { teamMap, projectMap: idNodeMap};
}
