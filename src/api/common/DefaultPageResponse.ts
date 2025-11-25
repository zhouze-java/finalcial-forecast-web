export interface DefaultPageResponse<T> {

    /**
     * 页码
     */
    current: number,

    /**
     * 数量
     */
    pageSize: number,

    /**
     * 总数
     */
    total: number,

    /**
     * 分页记录数量
     */
    records: T[];
}