import { ExplainItemDataItem } from "../services/FsstockApiServies"

class FinanceStateQuery  {

    private states: ExplainItemDataItem[];
    private contextMember:string = "";
    private elements:string[] = [];

    constructor(states:ExplainItemDataItem[]){
        this.states = states;
    }

    setContextResultMember():this{
        this.contextMember = "ResultMember";
        return this;
    }

    setContextForecastMember():this {
        this.contextMember = "ForecastMember";
        return this;
    }

    getSales():ExplainItemDataItem[]{
        const elements = ['OperatingRevenues', 'NetSales'];
        const contextMenberOfStates = this.states.filter(item => item.context.includes(this.contextMember));
        return contextMenberOfStates.filter(item => elements.includes(item.element))
    }

    getChangeInSales(){
        const elements= ['ChangeInOperatingRevenues', 'ChangeInNetSales'];
        const contextMenberOfStates = this.states.filter(item => item.context.includes(this.contextMember));
        return contextMenberOfStates.filter(item => elements.includes(item.element))
    }

}

export default FinanceStateQuery