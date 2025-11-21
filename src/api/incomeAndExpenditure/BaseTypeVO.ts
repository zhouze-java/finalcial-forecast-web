export interface BaseTypeVO {
    /**
     * id
     */
    id?: number,

    /**
     * 名称
     */
    name: string,

    /**
     * 描述
     */
    description: string,

    /**
     * 周期
     */
    defaultCycle: string,

    /**
     * 是否允许设置增长率
     */
    allowsGrowth: boolean,

    [key: string]: any;
}