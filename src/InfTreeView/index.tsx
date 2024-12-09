import { enableRipple } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { InfTreeViewProps, InfTreeViewMethods } from './types';
import { useImperativeHandle, forwardRef, useRef } from 'react';

import './index.css'
import { v4 as uuidv4 } from 'uuid';
enableRipple(true);
const InfTreeView = forwardRef<InfTreeViewMethods, InfTreeViewProps>((props: InfTreeViewProps, ref) => {

    const selectedNodeId = useRef("");
    const fields = {
        dataSource: props.data || [],
        id: props.fields?.id || 'id',
        text: props.fields?.text || 'name',
        child: props.fields?.children || 'children',
    };

    let treeRef: TreeViewComponent;
    useImperativeHandle(ref, () => ({
        expandAll: () => treeRef?.expandAll(),
        collapseAll: () => treeRef?.collapseAll(),
        getJson: () => data2Json(treeRef?.getTreeData()),
        getData: () => treeRef?.getTreeData(),
        updateSelectedNodeText: (text: string) => treeRef?.updateNode(selectedNodeId.current, text),
        updateFromJson: (jsonString: string) => {
            const toRemove: string[] = []
            treeRef?.getTreeData().forEach((root) => {
                toRemove.push(root[fields.id] as string) 
            });
            treeRef?.removeNodes(toRemove)
            treeRef?.addNodes(json2Data(JSON.parse(jsonString)))
        },
    }));

    type NestedObject = { [key: string]: string | NestedObject };

    function data2Json(tree: any): NestedObject {
        const result: NestedObject = {};

        tree.forEach((node: any) => {
            const { name, children } = node;
            if (children && children.length > 0) {
                result[name] = data2Json(children);
            } else {
                result[name] = "";
            }
        });

        return result;
    }

    function json2Data(
        nestedObject: NestedObject,
        parentId = "0",
        currentId = 1
    ): any {
        const result: any = [];

        Object.entries(nestedObject).forEach(([key, value]) => {
            const id = uuidv4();
            currentId++;

            if (typeof value === "object" && value !== null) {
                result.push({
                    id,
                    name: key,
                    children: json2Data(value, id, 1),
                });
            } else {
                result.push({
                    id,
                    name: key,
                });
            }
        });

        return result;
    }

    const nodeTemplate = (data: any) => {
        const hasParent = treeRef.getNode(data.id)?.parentID != undefined;
        return (
            <div className='nodeContainer' key={data[fields.id]}>
                <span>{data[fields.text]}</span>
                <button className='InfButton' onClick={() => {
                    const newNode: any = {};
                    newNode[fields.id] = uuidv4();
                    newNode[fields.text] = "nome";
                    treeRef?.addNodes([newNode], data.id);
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0  0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
                <button disabled={!hasParent} className='InfButton' onClick={() => hasParent && data.id ? treeRef?.removeNodes([data.id]) : null}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
                </button>
            </div>
        );
    };



    return (
        <TreeViewComponent
            fields={fields}
            allowEditing={true}
            nodeTemplate={nodeTemplate}
            ref={(tree: TreeViewComponent) => { treeRef = tree; }}
            nodeEdited={(args) => {
                if (props.onNodeUpdate && args.newText) {
                    props.onNodeUpdate(args.newText)
                }
            }}
            nodeClicked={(args) => {
                const id = args.node.dataset.uid;
                selectedNodeId.current = id;
                if (props.onNodeSelected) {
                    props.onNodeSelected(args.event.target.innerText)
                }
            }}
        />
    );
})

export default InfTreeView;
