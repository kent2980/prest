import React, { createContext, useState } from 'react'
import { ExplainListDataItem } from '../services/FsstockApiServies';

export const ExplainListContext = createContext({} as {
    explain: ExplainListDataItem[];
    setExplain: React.Dispatch<React.SetStateAction<ExplainListDataItem[]>>;
});

type Props = {
    children: React.ReactNode;
}

const XbrlDataProvider = ({ children }: Props) => {
    const [explain, setExplain] = useState<ExplainListDataItem[]>([])
    return (
        <ExplainListContext.Provider value={{ explain, setExplain }}>
            {children}
        </ExplainListContext.Provider>
    )
}

export default XbrlDataProvider;