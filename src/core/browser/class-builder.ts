interface classConfig {
    id: string;
    class: string[];
}

interface stateConfig {
    id: string;
    classes: classConfig[];
    weight?: number;
}
interface WeightMap {
    [index: string]: number;
}

const defaultWeightMap: WeightMap = {
    undefined: 100,
    default: 200,
    focus: 300,
    hover: 400,
    active: 600,
    disabled: 800,
};
export class classBuilder {
    private orderedConfigs: stateConfig[] = [];
    constructor(configs: stateConfig[], private weightMap: WeightMap = defaultWeightMap) {
        configs.forEach((config: stateConfig) => {
            this.insertConfig(config);
        });
    }
    public clear(): void {
        this.orderedConfigs = [];
    }
    public addConfig(config: stateConfig): void {
        this.insertConfig(config);
    }
    private insertConfig(config: stateConfig) {
        const c = this.normalizeWeight(config);
        let cursor = 0;
        while (this.orderedConfigs[cursor] && this.orderedConfigs[cursor].weight! < c.weight!) {
            cursor++;
        }
        this.orderedConfigs.splice(cursor, 0, c);
    }
    private normalizeWeight(config: stateConfig): stateConfig {
        if (config.weight) return config;
        config.weight = defaultWeightMap[config.id] || defaultWeightMap.undefined;
        return config;
    }
}
