
export interface InfTreeViewArgs {
    data: Array<{ [key: string]: any, expanded?: boolean }>,
    fields?: { id?: string, text?: string, children?: string }
}
