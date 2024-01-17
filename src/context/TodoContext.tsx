import React, { createContext, useContext, useState } from "react";

export type Todo = {
    id: number;
    content: string;
}

// Contextの作成
export const TodoContext = createContext({} as {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
});
export const ContentContext = createContext({} as {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
});

const todoList: Todo[] = [
    {
        id: 1,
        content: "洗濯する"
    },
    {
        id: 2,
        content: "掃除機かける"
    },
    {
        id: 3,
        content: "ご飯作る"
    }
];

type SectionProps = {
    children: React.ReactNode;
};

// グローバルに使いたいstateと更新関数を設定
// TodoProviderで囲んだ範囲で上記を使用できる
export const TodoProvider = ({ children }: SectionProps) => {
    const [todos, setTodos] = useState<Todo[]>(todoList);
    const [content, setContent] = useState("");

    return (
        <TodoContext.Provider value={{ todos, setTodos }}>
            <ContentContext.Provider value={{ content, setContent }}>
                {children}
            </ContentContext.Provider>
        </TodoContext.Provider>
    );
};

// 作成したContextを外部から使いやすいようにする
export const useTodoContext = () => useContext(TodoContext);
export const useContentContext = () => useContext(ContentContext);