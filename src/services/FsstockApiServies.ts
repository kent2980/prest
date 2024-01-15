import axios from 'axios';

// ベースURLを設定
const baseURL: string = 'https://api.fs-stock.net/xbrl/';

/**
 * API呼び出し用のベース関数
 * @param path - APIのサブディレクトリのパス
 * @param params - クエリパラメータのオブジェクト
 * @returns APIのレスポンスのデータ
 * @throws {Error} - APIリクエストに失敗した場合にスローされるエラー
 */
const callApi = async (path: string, params: Record<string, any>, allRecord: boolean): Promise<any> => {
    try {
        // サブディレクトリのパスを作成
        const url: string = `${baseURL}${path}`;

        // クエリパラメータをオブジェクト形式に変換
        const queryParams: string = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        // APIにリクエストを送信
        let requestUrl: string = `${url}?${queryParams}`;
        let resultsData: any[] = [];

        while (requestUrl) {
            console.log(requestUrl)
            const response = await axios.get(requestUrl);

            // 必要な処理を実行
            // ...
            let apiData = response.data;
            let countData = apiData.count;
            if (countData > 0) {
                resultsData = resultsData.concat(apiData.results);
            } else {
                throw new Error('APIからデータが取得できませんでした')
            }
            if (allRecord) {
                requestUrl = apiData.next;
            } else {
                requestUrl = "";
            }
        }
        return resultsData;
    } catch (error) {
        console.error(error);
        throw new Error('APIリクエストに失敗しました');
    }
};

export interface ExplainListParamsInterface {

    /**
     * 報告書ID
     * @type {string}
     */
    id: string;

    /**
     * 銘柄コード
     * @type {string}
     */
    code: string;

    /**
     * 公表日
     * @type {string}
     */
    publication_date: string;

    /**
     * 報告区分
     * @type {string}
     */
    report_cat: string;

    /**
     * インデックスID
     * @type {string}
     */
    index_id: string;

    /**
     * 会計期間
     * @type {string}
     */
    period: string;

    /**
     * 会計年度
     * @type {string}
     */
    period_year: string;

    /**
     * (指定)IDより新しい報告書
     * @type {string}
     */
    index_id_gt: string;

    /**
     * (指定)ID以前の報告書
     * @type {string}
     */
    index_id_lte: string;

    /**
     * ソート順
     * @type {string}
     */
    ordering: string;

    /**
     * ページ番号
     * @type {number}
     */
    page: number;
}

export class ExplainList implements ExplainListParamsInterface {

    id: string = "";
    code: string = "";
    publication_date: string = "";
    report_cat: string = "";
    index_id: string = "";
    period: string = "";
    period_year: string = "";
    index_id_gt: string = "";
    index_id_lte: string = "";
    ordering: string = "";
    page: number = 1;

    /**
     * パラメータオブジェクトを取得します。
     * @returns {ExplainListParamsInterface}
     */
    get Record(): ExplainListParamsInterface {
        return {
            id: this.id,
            code: this.code,
            publication_date: this.publication_date,
            report_cat: this.report_cat,
            index_id: this.index_id,
            period: this.period,
            period_year: this.period_year,
            index_id_gt: this.index_id_gt,
            index_id_lte: this.index_id_lte,
            ordering: this.ordering,
            page: this.page
        }
    }

    /**
     * 他のExplainListオブジェクトと等しいかどうかをチェックします。
     * @param {ExplainList} other - 比較するオブジェクト
     * @returns {boolean} - オブジェクトが等しい場合はtrue、それ以外はfalse
     */
    equals(other: ExplainList): boolean {
        return (
            this.id === other.id &&
            this.code === other.code &&
            this.publication_date === other.publication_date &&
            this.report_cat === other.report_cat &&
            this.index_id === other.index_id &&
            this.period === other.period &&
            this.period_year === other.period_year &&
            this.index_id_gt === other.index_id_gt &&
            this.index_id_lte === other.index_id_lte &&
            this.ordering === other.ordering &&
            this.page === other.page
        );
    }
}


/**
 * explain APIを呼び出す関数
 * @param params - クエリパラメータのオブジェクト
 * @returns explain APIのレスポンスのデータ
 */
export const ExplainListApi = {
    /**
     * fetchDataメソッド
     * @param params - クエリパラメータのオブジェクト
     * @returns explain APIのレスポンスのデータ
     */
    fetchData: async (params: ExplainListParamsInterface, allRecord: boolean): Promise<any> => {
        return await callApi('explain', params, allRecord);
    },
};

export type ExplainListDataItem = {
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

interface ExplainItemParamsInterface {
    calLinkFromElement: string;
    calLinkNull: string;
    calLinkOrder: string;
    code: string;
    current_context: boolean;
    defLinkFromElement: string;
    defLinkOrder: string;
    doc_element: string;
    element: string;
    elementLabel: string;
    explain: string;
    financial_statement: string;
    page: number;
    preLinkFromElement: string;
    preLinkOrder: string;
    publication_date: string;
    report_detail_cat: string;
}

// ExplainItemParamsクラスの定義
export class ExplainItemParams implements ExplainItemParamsInterface {
    calLinkFromElement: string = '';
    calLinkNull: string = '';
    calLinkOrder: string = '';
    code: string = '';
    current_context: boolean = false;
    defLinkFromElement: string = '';
    defLinkOrder: string = '';
    doc_element: string = '';
    element: string = '';
    elementLabel: string = '';
    explain: string = '';
    financial_statement: string = '';
    page: number = 1;
    preLinkFromElement: string = '';
    preLinkOrder: string = '';
    publication_date: string = '';
    report_detail_cat: string = '';

    /**
     * パラメータオブジェクトを取得
     * @returns {ExplainItemParamsInterface}
     */
    get Record(): ExplainItemParamsInterface {
        return {
            calLinkFromElement: this.calLinkFromElement,
            calLinkNull: this.calLinkNull,
            calLinkOrder: this.calLinkOrder,
            code: this.code,
            current_context: this.current_context,
            defLinkFromElement: this.defLinkFromElement,
            defLinkOrder: this.defLinkOrder,
            doc_element: this.doc_element,
            element: this.element,
            elementLabel: this.elementLabel,
            explain: this.explain,
            financial_statement: this.financial_statement,
            page: this.page,
            preLinkFromElement: this.preLinkFromElement,
            preLinkOrder: this.preLinkOrder,
            publication_date: this.publication_date,
            report_detail_cat: this.report_detail_cat,
        };
    }


    /**
    * 他のオブジェクトと等しいかどうかをチェックする
    * @param {*} obj - 比較対象のオブジェクト
    * @returns {boolean} - 等しい場合はtrue、そうでない場合はfalse
    */
    equals(obj: any): boolean {
        if (this === obj) {
            return true;
        }
        return (
            this.calLinkFromElement === obj.calLinkFromElement &&
            this.calLinkNull === obj.calLinkNull &&
            this.calLinkOrder === obj.calLinkOrder &&
            this.code === obj.code &&
            this.current_context === obj.current_context &&
            this.defLinkFromElement === obj.defLinkFromElement &&
            this.defLinkOrder === obj.defLinkOrder &&
            this.doc_element === obj.doc_element &&
            this.element === obj.element &&
            this.elementLabel === obj.elementLabel &&
            this.explain === obj.explain &&
            this.financial_statement === obj.financial_statement &&
            this.page === obj.page &&
            this.preLinkFromElement === obj.preLinkFromElement &&
            this.preLinkOrder === obj.preLinkOrder &&
            this.publication_date === obj.publication_date &&
            this.report_detail_cat === obj.report_detail_cat
        );
    }

}

/**
 * item APIを呼び出す関数
 * @param params - クエリパラメータのオブジェクト
 * @returns item APIのレスポンスのデータ
 */
export const ExplainItemApi = {
    /**
     * fetchDataメソッド
     * @param params - クエリパラメータのオブジェクト
     * @returns item APIのレスポンスのデータ
     */
    fetchData: async (params: ExplainItemParamsInterface, allRecord: boolean): Promise<any> => {
        return await callApi('item', params, allRecord);
    },
};

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

export type ExplainItemDataItem = {
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


interface StockBrandsParamsInterface {
    code: string;
    market_product_code: string;
    number_33_industry_code: string;
    number_17_industry_code: string;
    scale_code: string;
}

// StockBrandsParamsクラスの定義
export class StockBrandsParams implements StockBrandsParamsInterface {
    /**
     * @type {string} - 銘柄コード
     */
    code: string = "";

    /**
     * @type {string} - 市場商品コード
     */
    market_product_code: string = "";

    /**
     * @type {string} - 33産業分野コード
     */
    number_33_industry_code: string = "";

    /**
     * @type {string} - 17産業分野コード
     */
    number_17_industry_code: string = "";

    /**
     * @type {string} - 規模コード
     */
    scale_code: string = "";

    /**
     * パラメータオブジェクトを取得
     * @returns {StockBrandsParamsInterface}
     */
    get Record(): StockBrandsParamsInterface {
        return {
            code: this.code,
            market_product_code: this.market_product_code,
            number_33_industry_code: this.number_33_industry_code,
            number_17_industry_code: this.number_17_industry_code,
            scale_code: this.scale_code,
        };
    }

    /**
     * 他のStockBrandsParamsとの等価性を判定
     * @param {StockBrandsParams} other - 比較対象のStockBrandsParams
     * @returns {boolean} - 等しい場合はtrue、そうでない場合はfalse
     */
    equals(other: StockBrandsParams): boolean {
        return (
            this.code === other.code &&
            this.market_product_code === other.market_product_code &&
            this.number_33_industry_code === other.number_33_industry_code &&
            this.number_17_industry_code === other.number_17_industry_code &&
            this.scale_code === other.scale_code
        );
    }
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
};

/**
 * brands APIを呼び出す関数
 * @param params - クエリパラメータのオブジェクト
 * @returns brands APIのレスポンスのデータ
 */
export const StockBrandsApi = {
    /**
     * fetchDataメソッド
     * @param params - クエリパラメータのオブジェクト
     * @returns brands APIのレスポンスのデータ
     */
    fetchData: async (params: StockBrandsParamsInterface, allRecord: boolean): Promise<any> => {
        return await callApi('brands', params, allRecord);
    },
};

interface StockChartParamsInterface {
    /**
     * 銘柄コード
     */
    code: string;
    date_range_lte: string;
    date_range_gte: string;
    select_date: string;
    /**
     * ソート順
     * @type {string}
     */
    ordering: string;
}

/**
* 株価データ取得のためのパラメータクラス
*/
export class StockChartParams implements StockChartParamsInterface {
    /**
     * @type {string} - 銘柄コード
     */
    code: string = "";

    /**
     * @type {string} - 取得する日付範囲の上限
     */
    date_range_lte: string = "";

    /**
     * @type {string} - 取得する日付範囲の下限
     */
    date_range_gte: string = "";

    /**
     * @type {string} - 選択した日付
     */
    select_date: string = "";

    ordering: string = "";

    /**
     * パラメータオブジェクトを取得
     * @type {StockChartParamsInterface}
     */
    get Record(): StockChartParamsInterface {
        return {
            code: this.code,
            date_range_gte: this.date_range_gte,
            date_range_lte: this.date_range_lte,
            select_date: this.select_date,
            ordering: this.ordering
        };
    }

    /**
     * 他のStockChartParamsとの等価性を判定
     * @param {StockChartParams} other - 比較対象のStockChartParams
     * @returns {boolean} - 等しい場合はtrue、そうでない場合はfalse
     */
    equals(other: StockChartParams): boolean {
        return (
            this.code === other.code &&
            this.date_range_lte === other.date_range_lte &&
            this.date_range_gte === other.date_range_gte &&
            this.select_date === other.select_date
        );
    }
}


/**
 * result APIを呼び出す関数
 * @param params - クエリパラメータのオブジェクト
 * @returns result APIのレスポンスのデータ
 */
export const StockChartDataApi = {
    /**
     * fetchDataメソッド
     * @param params - クエリパラメータのオブジェクト
     * @returns result APIのレスポンスのデータ
     */
    fetchData: async (params: StockChartParamsInterface, allRecord: boolean): Promise<any> => {
        return await callApi('result', params, allRecord);
    },
};

export type StockChartDataItem = {
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
