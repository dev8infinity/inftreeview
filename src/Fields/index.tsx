
import { FieldsMethods, FieldsProps } from "./types";
import { useImperativeHandle, forwardRef, useState } from 'react';

export const Fields = forwardRef<FieldsMethods, FieldsProps>((props: FieldsProps, ref) => {

    // export function Fields(props: FieldsProps) {

    const [key, updateKey] = useState("");
    const [json, updateJson] = useState("");

    useImperativeHandle(ref, () => ({
        updateKeyInput: (text: string) => updateKey(text),
        updateJsonInput: (text: string) => updateJson(text),
    }));

    return (
        <div>
            <label htmlFor="Chave">Chave</label>
            <input
                onChange={(e) => {
                    updateKey(e.target.value);
                    props.onKeyInputChange(e.target.value);
                }}
                type="text" id="Chave"
                value={key}
            />
        
            <label htmlFor="Valor">Valor</label>
            <input type="text" id="Valor" />

            <br />
            <label htmlFor="json">JSON</label>
            <textarea id="json"
                onChange={(e) => updateJson(e.target.value)}
                value={json}></textarea>
            <button onClick={() => {
                props.onJsonInputChange(json);
                updateJson("")
            }}>Importar JSON</button>
        </div>
    )
})