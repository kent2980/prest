import { error } from "console";
import { EndPath } from "../FsstockApiServies2";

export type ExplainList = {
    index_id: number;
    id: string;
    filing_date: string;
    publication_date: string;
    code: string;
    document_title: string;
    period: number;
    period_division: string;
    period_division_label: string;
    consolidation_cat: string;
    consolidation_cat_label: string;
    report_cat: string;
    report_label: string;
    company_name: string;
    start_date: string;
    end_date: string;
    period_year: string;
}

export type ExplainItemLink = {
    id: string;
    publication_date: string;
    code: string;
    doc_element: string;
    namespace: string;
    element: string;
    from_element: string;
    from_element_label: string;
    order: number;
}

export type ExplainItemCalLink = {
    id: string;
    publication_date: string;
    code: string;
    doc_element: string;
    namespace: string;
    element: string;
    from_element: string;
    from_element_label: string;
    order: number;
    weight: number;
}

export type ExplainItem = {
    id: string;
    cal_link: ExplainItemCalLink;
    pre_link: ExplainItemLink;
    def_link: ExplainItemLink;
    publication_date: string;
    code: string;
    doc_element: string;
    doc_label: string;
    financial_statement: string;
    report_detail_cat: string;
    start_date: string;
    end_date: string;
    instant_date: string;
    namespace: string;
    unitref: string;
    format: string;
    element: string;
    element_label: string;
    context: string;
    numeric: string;
    decimals: number;
    scale: number;
    explain: string;
}

export type StockBrandsData = {
    id: string;
    code: string;
    security_name: string;
    market_product_category: string;
    number_33_industry_code: string;
    number_33_industry_category: string;
    number_17_industry_code: string;
    number_17_industry_category: string;
    scale_code: number;
    scale_category: string;
}

export type StockChart = {
    /** ID */
    id: number;
    /** 日付 */
    date: string;
    /** 銘柄コード */
    code: string;
    /**始値 */
    open: number;
    /**高値 */
    high: number;
    /**安値 */
    low: number;
    /**終値 */
    close: number;
    /**調整後終値 */
    adj_close: number;
    /** 出来高情報 */
    volume: number;
}

export class FsstockData {
    private _apiData: any | null;
    private _endPath: EndPath | null;

    constructor(apiData: any | null = null, endPath: EndPath | null = null) {
        this._apiData = apiData;
        this._endPath = endPath;
    }

    get apiData(): any | null {
        return this._apiData;
    }
    public setApiData(apiData: any): this {
        this._apiData = apiData;
        return this;
    }

    get endPath(): EndPath | null {
        return this._endPath;
    }
    public setEndPath(endPath: EndPath): this {
        this._endPath = endPath;
        return this;
    }
    public getItems() {
        if (!this._apiData) {
            throw new Error('APIからデータを取得していません。');
        } else if (!this._endPath) {
            throw new Error('エンドパスを指定してください。')
        }
    }
}