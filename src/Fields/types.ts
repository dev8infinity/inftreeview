
export interface FieldsProps {
    onKeyInputChange: (newValue: string) => void
    onJsonInputChange: (newValue: string) => void
}

export interface FieldsMethods {
    updateKeyInput: (text: string) => void;
    updateJsonInput: (text: string) => void;
}