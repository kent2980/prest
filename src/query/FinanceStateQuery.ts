import { ExplainItemDataItem } from "../services/FsstockApiServies"

export enum ContextMember {
    RESULT_MEMBER = "ResultMember",
    FORECAST_MEMBER = "ForecastMember"
}

export enum ContextScale {
    CURRENT = "Current",
    PERIOR = "Prior"
}

export enum UnitRef {
    JPY = "JPY",
    PURE = "Pure",
    SHARES = "Shares"
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

export class FinanceStateQueryBase {
    private states: ExplainItemDataItem[];
    private contextMember: string = "";
    private contextScale: string = "";
    private elements: string[] = [];
    private unitref: string = "";
    private reportDetailCate: string = "";

    constructor(states: ExplainItemDataItem[]) {
        this.states = states;
    }

    public getItem(): ExplainItemDataItem[] {
        const states = this.states.filter(item => item.context.includes(this.contextMember))
            .filter(item => item.context.includes(this.contextScale))
            .filter(item => this.elements.includes(item.element))
            .filter(item => item.unitref.includes(this.unitref))
        return states;
    }

    public setContextMenber(contextMember: ContextMember): this {
        this.contextMember = contextMember;
        return this;
    }

    public setContextScale(contextScale: ContextScale): this {
        this.contextScale = contextScale;
        return this;
    }

    public setElements(elements: string[]): this {
        this.elements = elements;
        return this;
    }

    public setUnitref(unitref: UnitRef): this {
        this.unitref = unitref;
        return this;
    }

    public setReportDetailCat(reportDetailCat: ReportDetailCat): this {
        this.reportDetailCate = reportDetailCat;
        return this;
    }

    public setElementLabel(label: ElementLabel): this {
        return this;
    }

}
export class FinanceStateQuery extends FinanceStateQueryBase {
    public setElementLabel(label: ElementLabel): this {
        switch (label) {
            case ElementLabel.売上高:
                this.setElements([
                    'OperatingRevenues',
                    'NetSales',
                    'SalesIFRS',
                    'NetSalesUS',
                    'RevenueIFRS',
                    'TotalRevenuesUS'
                ])
                break;

            case ElementLabel.売上高変化率:
                this.setElements([
                    'ChangeInOperatingRevenues',
                    'ChangeInNetSales',
                    'ChangeInSalesIFRS',
                    'ChangeInNetSalesUS',
                    'ChangeInRevenueIFRS',
                    'ChangeInTotalRevenuesUS'
                ]);
                break;

            case ElementLabel.営業利益:
                this.setElements([
                    "OperatingIncome"
                ])
                break;

            case ElementLabel.営業利益変化率:
                this.setElements([
                    'ChangeInOperatingIncome'
                ])
                break;

            case ElementLabel.経常利益:
                this.setElements([
                    "OrdinaryIncome"
                ])
                break;

            case ElementLabel.経常利益変化率:
                this.setElements([
                    'ChangeInOrdinaryIncome'
                ])
                break;

            case ElementLabel.EPS:
                this.setElements([
                    'NetIncomePerShare'
                ])
                break;

            case ElementLabel.純利益:
                this.setElements([
                    'NetIncome',
                    'ProfitAttributableToOwnersOfParent'
                ])
                break;

            case ElementLabel.純利益変化率:
                this.setElements([
                    'ChangeInNetIncome',
                    'ChangeInProfitAttributableToOwnersOfParent'
                ])
                break;

            case ElementLabel.純資産:
                this.setElements([
                    'NetAssets'
                ])
                break;

            case ElementLabel.総資産:
                this.setElements([
                    'TotalAssets'
                ])
                break

            case ElementLabel.自己資本比率:
                this.setElements([
                    'CapitalAdequacyRatio'
                ])
                break;

            default:
                break;
        }
        return this;
    }
}

export class FinanceStateQueryBK extends FinanceStateQueryBase {
    public setElementLabel(label: ElementLabel): this {
        switch (label) {
            case ElementLabel.売上高:
                this.setElements([
                    'OrdinaryRevenuesBK'
                ])
                break;

            case ElementLabel.売上高変化率:
                this.setElements([
                    'ChangeInOrdinaryRevenuesBK'
                ]);
                break;

            case ElementLabel.経常利益:
                this.setElements([
                    "OrdinaryIncome"
                ])
                break;

            case ElementLabel.経常利益変化率:
                this.setElements([
                    'ChangeInOrdinaryIncome'
                ])
                break;

            case ElementLabel.EPS:
                this.setElements([
                    'NetIncomePerShare'
                ])
                break;

            case ElementLabel.純利益:
                this.setElements([
                    'ProfitAttributableToOwnersOfParent'
                ])
                break;

            case ElementLabel.純利益変化率:
                this.setElements([
                    'ChangeInProfitAttributableToOwnersOfParent'
                ])
                break;

            case ElementLabel.純資産:
                this.setElements([
                    'NetAssets'
                ])
                break;

            case ElementLabel.総資産:
                this.setElements([
                    'TotalAssets'
                ])
                break

            case ElementLabel.自己資本比率:
                this.setElements([
                    'CapitalAdequacyRatio'
                ])
                break;

            default:
                break;
        }
        return this;
    }
}

export class FinanceStateQueryIR extends FinanceStateQuery {
    public setElementLabel(label: ElementLabel): this {
        switch (label) {
            case ElementLabel.売上高:
                this.setElements([
                    'OperatingRevenues',
                    'NetSales',
                    'SalesIFRS',
                    'NetSalesUS',
                    'RevenueIFRS',
                    'TotalRevenuesUS'
                ])
                break;

            case ElementLabel.売上高変化率:
                this.setElements([
                    'ChangeInOperatingRevenues',
                    'ChangeInNetSales',
                    'ChangeInSalesIFRS',
                    'ChangeInNetSalesUS',
                    'ChangeInRevenueIFRS',
                    'ChangeInTotalRevenuesUS'
                ]);
                break;

            case ElementLabel.営業利益:
                this.setElements([
                    "OperatingIncome"
                ])
                break;

            case ElementLabel.営業利益変化率:
                this.setElements([
                    'ChangeInOperatingIncome'
                ])
                break;

            case ElementLabel.経常利益:
                this.setElements([
                    "OrdinaryIncome"
                ])
                break;

            case ElementLabel.経常利益変化率:
                this.setElements([
                    'ChangeInOrdinaryIncome'
                ])
                break;

            case ElementLabel.EPS:
                this.setElements([
                    'NetIncomePerShare'
                ])
                break;

            case ElementLabel.純利益:
                this.setElements([
                    'ProfitAttributableToOwnersOfParent'
                ])
                break;

            case ElementLabel.純利益変化率:
                this.setElements([
                    'ChangeInProfitAttributableToOwnersOfParent'
                ])
                break;

            case ElementLabel.純資産:
                this.setElements([
                    'NetAssets'
                ])
                break;

            case ElementLabel.総資産:
                this.setElements([
                    'TotalAssets'
                ])
                break

            case ElementLabel.自己資本比率:
                this.setElements([
                    'CapitalAdequacyRatio'
                ])
                break;

            default:
                break;
        }
        return this;
    }
}