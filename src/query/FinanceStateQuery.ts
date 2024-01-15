import { ExplainItemDataItem } from "../services/FsstockApiServies"

export enum ContextMember {
    RESULT_MEMBER = "_ResultMember",
    FORECAST_MEMBER = "_ForecastMember"
}

export enum ContextScale {
    CURRENT = "Current",
    PERIOR = "Prior"
}

export enum UnitRef {
    JPY = "JPY",
    PURE = "Pure",
    SHARES = "Shares",
    JPYPERSHARES = "JPYPerShares",
    NUMBEROFCOMPANIES = "NumberOfCompanies"
}

export enum ReportDetailCat {
    SM = "sm",
    FR = "fr"
}

export enum ElementLabel {
    売上高 = "NetSales",
    売上高変化率 = "ChangeInNetSales",
    営業利益 = "OperatingIncome",
    営業利益変化率 = "ChangeInOperatingIncome",
    経常利益 = "OrdinaryIncome",
    経常利益変化率 = "ChangeInOrdinaryIncome",
    純利益 = "NetIncome",
    純利益変化率 = "ChangeInNetIncome",
    EPS = "NetIncomePerShare",
    総資産 = "TotalAssets",
    純資産 = "NetAssets",
    自己資本比率 = "CapitalAdequacyRatio"
}

export enum ConsolidatedMember {
    連結 = "_ConsolidatedMember",
    非連結 = "_NonConsolidatedMember"
}

/**
 * ExplainItemDataItem配列からアイテムを抽出する機能を定義した基底クラスです。
 */
export class FinanceStateQueryBase {
    private _states: ExplainItemDataItem[];
    private _contextMember: string = "";
    private _contextScale: string = "";
    private _elements: string[] = [];
    private _unitref: string = "";
    private _reportDetailCate: string = "";
    private _consolidatedMember: string = "";

    constructor(states: ExplainItemDataItem[]) {
        this._states = states;
    }

    get item(): ExplainItemDataItem[] {
        const states = this.states.filter(item => item.context.includes(this.contextMember))
            .filter(item => item.context.includes(this.contextScale))
            .filter(item => this.elements.includes(item.element))
            .filter(item => item.unitref.includes(this.unitref))
            .filter(item => item.context.includes(this.consolidatedMember))
        return states;
    }

    public setContextMenber(contextMember: ContextMember): this {
        this._contextMember = contextMember;
        return this;
    }

    public setContextScale(contextScale: ContextScale): this {
        this._contextScale = contextScale;
        return this;
    }

    public setElements(elements: string[]): this {
        this._elements = elements;
        return this;
    }

    public setUnitref(unitref: UnitRef): this {
        this._unitref = unitref;
        return this;
    }

    public setReportDetailCat(reportDetailCat: ReportDetailCat): this {
        this._reportDetailCate = reportDetailCat;
        return this;
    }

    public setConsolidatedMember(consolidateMember: string): this {
        switch (consolidateMember) {
            case "c":
                this._consolidatedMember = ConsolidatedMember.連結;
                break;
            case "n":
                this._consolidatedMember = ConsolidatedMember.非連結;
                break;
            case "連結":
                this._consolidatedMember = ConsolidatedMember.連結;
                break;
            case "非連結":
                this._consolidatedMember = ConsolidatedMember.非連結;
                break;

            default:
                break;
        }
        return this;
    }

    get states(): ExplainItemDataItem[] {
        return this._states;
    }

    get contextMember(): string {
        return this._contextMember;
    }

    get contextScale(): string {
        return this._contextScale;
    }

    get elements(): string[] {
        return this._elements;
    }

    get unitref(): string {
        return this._unitref;
    }

    get reportDetailCate(): string {
        return this._reportDetailCate;
    }

    get consolidatedMember(): string {
        return this._consolidatedMember;
    }
}

/**
 * ExplainItemDataItem配列からアイテムを抽出するクラスです。
 * 一般企業に対応したクラスです。
 */
export class FinanceStateQuery extends FinanceStateQueryBase {

    /**
     * 売上高に対応するコンテキスト
     */
    protected salesContext: string[] = [
        'OperatingRevenues',
        'NetSales',
        'SalesIFRS',
        'NetSalesIFRS',
        'NetSalesUS',
        'RevenueIFRS',
        'TotalRevenuesUS'
    ];

    /**
     * 売上高変化率に対応するコンテキスト
     */
    protected changeInSalesContext: string[] = [
        'ChangeInOperatingRevenues',
        'ChangeInNetSales',
        'ChangeInNetSalesIFRS',
        'ChangeInSalesIFRS',
        'ChangeInNetSalesUS',
        'ChangeInRevenueIFRS',
        'ChangeInTotalRevenuesUS'
    ];

    /**
     * 営業利益に対応するコンテキスト
     */
    protected operatingIncomeContext: string[] = [
        "OperatingIncome",
        'OperatingIncomeIFRS'
    ];

    /**
     * 営業利益変化率に対応するコンテキスト
     */
    protected changeInIncomeContext: string[] = [
        'ChangeInOperatingIncome',
        'ChangeInOperatingIncomeIFRS',
    ];

    /**
     * 経常利益に対応するコンテキスト
     */
    protected ordinaryIncomeContext: string[] = [
        "OrdinaryIncome",
        'ProfitBeforeTaxIFRS'
    ];

    /**
     * 経常利益変化率に対応するコンテキスト
     */
    protected changeInOrdinaryIncomeContext: string[] = [
        'ChangeInOrdinaryIncome',
        'ChangeInOrdinaryIncomeIFRS',
        'ChangeInProfitBeforeTaxIFRS'
    ];

    /**
     * EPS(1株利益)に対応するコンテキスト
     */
    protected netIncomePerShareContext: string[] = [
        'NetIncomePerShare',
        'NetIncomePerShareIFRS'
    ];

    /**
     * 純利益に対応するコンテキスト
     */
    protected netIncomeContext: string[] = [
        'NetIncome',
        'ProfitAttributableToOwnersOfParent',
        'ProfitAttributableToOwnersOfParentIFRS'
    ];

    /**
     * 純利益変化率に対応するコンテキスト
     */
    protected changeInNetIncomeContext: string[] = [
        'ChangeInNetIncome',
        'ChangeInProfitAttributableToOwnersOfParent',
        'ChangeInProfitAttributableToOwnersOfParentIFRS',
    ];

    /**
     * 純資産に対応するコンテキスト
     */
    protected netAssetsContext: string[] = [
        'NetAssets',
        'NetAssetsIFRS'
    ];

    /**
     * 総資産に対応するコンテキスト
     */
    protected totalAssetsContext: string[] = [
        'TotalAssets',
        'TotalAssetsIFRS'
    ];

    /**
     * 自己資本比率に対応するコンテキスト
     */
    protected capitalAdequacyRatioContext: string[] = [
        'CapitalAdequacyRatio',
        'CapitalAdequacyRatioIFRS'
    ];

    /**
     * エレメントラベルを設定し、アイテムを抽出します。
     * @param label elementLabel
     * @returns this
     */
    public setElementLabel(label: ElementLabel): this {
        switch (label) {
            case ElementLabel.売上高:
                this.setElements(this.salesContext)
                this.setUnitref(UnitRef.JPY);
                break;

            case ElementLabel.売上高変化率:
                this.setElements(this.changeInSalesContext);
                this.setUnitref(UnitRef.PURE);
                break;

            case ElementLabel.営業利益:
                this.setElements(this.operatingIncomeContext)
                this.setUnitref(UnitRef.JPY);
                break;

            case ElementLabel.営業利益変化率:
                this.setElements(this.changeInIncomeContext)
                this.setUnitref(UnitRef.PURE);
                break;

            case ElementLabel.経常利益:
                this.setElements(this.ordinaryIncomeContext)
                this.setUnitref(UnitRef.JPY);
                break;

            case ElementLabel.経常利益変化率:
                this.setElements(this.changeInOrdinaryIncomeContext)
                this.setUnitref(UnitRef.PURE);
                break;

            case ElementLabel.EPS:
                this.setElements(this.netIncomePerShareContext)
                this.setUnitref(UnitRef.JPY);
                break;

            case ElementLabel.純利益:
                this.setElements(this.netIncomeContext)
                this.setUnitref(UnitRef.JPY);
                break;

            case ElementLabel.純利益変化率:
                this.setElements(this.changeInNetIncomeContext)
                this.setUnitref(UnitRef.PURE);
                break;

            case ElementLabel.純資産:
                this.setElements(this.netAssetsContext)
                this.setUnitref(UnitRef.JPY);
                break;

            case ElementLabel.総資産:
                this.setElements(this.totalAssetsContext)
                this.setUnitref(UnitRef.JPY);
                break

            case ElementLabel.自己資本比率:
                this.setElements(this.capitalAdequacyRatioContext)
                this.setUnitref(UnitRef.PURE);
                break;

            default:
                break;
        }
        return this;
    }
}

/**
 * ExplainItemDataItem配列からアイテムを抽出するクラスです。
 * 銀行業に対応したクラスです。
 */
export class FinanceStateQueryBK extends FinanceStateQuery {
    /**
     * 銀行業に対応する売上高のコンテキスト
     */
    protected salesContext: string[] = ['OrdinaryRevenuesBK'];

    /**
     * 銀行業に対応する売上高変化率のコンテキスト
     */
    protected changeInSalesContext: string[] = ['ChangeInOrdinaryRevenuesBK'];
}


/**
 * ExplainItemDataItem配列からアイテムを抽出するクラスです。
 * 不動産業に対応したクラスです。
 */
export class FinanceStateQueryIR extends FinanceStateQuery {
}