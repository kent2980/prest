import axios from "axios";

export enum EndPath {
    EXPLAIN = "explain",
    ITEM = "item",
    BRANDS = "brands",
    RESULT = "result",
}

export class FsstockApiServiesBase {

    private _baseUrl: string;
    private _endPass: EndPath | null;
    private _params: Record<string, any> | null;
    private _requestUrl: string | null = null;
    private _apiData: any | null = null;

    constructor(baseUrl: string, endPath: EndPath | null = null, params: Record<string, any> | null = null) {
        this._baseUrl = baseUrl;
        this._endPass = endPath;
        this._params = params;
    }

    get endPath(): EndPath | null {
        return this._endPass
    }

    public setEndPath(endPath: EndPath): this {
        this._endPass = endPath;
        return this;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    public setBaseUrl(url: string): this {
        this._baseUrl = url;
        return this;
    }

    public setRequestUrl() {
        // API URLを生成
        const url: string = `${this._baseUrl}${this._endPass}`;

        // クエリパラメータをオブジェクト形式に変換
        if (this._params) {
            const queryParams: string = Object.entries(this._params)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            // APIにリクエストを送信
            this._requestUrl = `${url}?${queryParams}`;
        }
    }

    public async callApi(): Promise<any> {
        try {
            if (this._requestUrl) {
                const response = await axios.get(this._requestUrl);
                this._apiData = response.data;
                this._requestUrl = this._apiData?.next;
            }
        } catch (er) {
            console.error(er);
            throw new Error('APIリクエストに失敗しました');
        }
        return this._apiData;
    }

    get apiData(): any {
        return this._apiData;
    }

    async *[Symbol.asyncIterator]() {
        while (this._requestUrl) {
            yield this.callApi();
        }
    }
}

export class FsstockApiServies extends FsstockApiServiesBase {
    constructor() {
        super('https://api.fs-stock.net/xbrl/');
    }
}