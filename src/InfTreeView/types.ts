
export interface InfTreeViewProps {
    data: Array<{ [key: string]: any, expanded?: boolean }>,
    fields?: { id?: string, text?: string, children?: string },
    onNodeSelected?: (text: string) => void,
    onNodeUpdate?: (newText: string) => void,
}
export interface InfTreeViewMethods {
    expandAll: () => void;
    collapseAll: () => void;
    getJson: () => Object;
    getData: () => Object;
    updateSelectedNodeText: (text: string) => void;
    updateFromJson: (jsonString: string) => void;
}