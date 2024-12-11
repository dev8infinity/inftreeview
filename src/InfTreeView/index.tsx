import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { InfTreeViewProps, InfTreeViewMethods, NestedObject } from './types';
import { useImperativeHandle, forwardRef, useRef } from 'react';
import './index.css'
import { v4 as uuidv4 } from 'uuid';

const InfTreeView = forwardRef<InfTreeViewMethods, InfTreeViewProps>((props: InfTreeViewProps, ref) => {

    let treeRef: TreeViewComponent;
    const selectedNodeId = useRef("");
    const allowEditing = useRef(false);

    const fields = {
        dataSource: props.data || [],
        id: props.fields?.id || 'id',
        text: props.fields?.text || 'name',
        child: props.fields?.children || 'children',
    };

    useImperativeHandle(ref, () => ({
        expandAll: () => treeRef?.expandAll(),
        collapseAll: () => treeRef?.collapseAll(),
        getJson: () => data2Json(treeRef?.getTreeData()),
        getData: () => treeRef?.getTreeData(),
        updateSelectedNodeText: (text: string) => {
            allowEditing.current = true;
            treeRef?.updateNode(selectedNodeId.current, text);
        },
        updateFromJson: (jsonString: string) => {
            const toRemove: string[] = [];
            treeRef?.getTreeData().forEach((root) => toRemove.push(root[fields.id] as string) );
            let newData: InfTreeViewProps["data"];
            try {
                newData = json2Data(JSON.parse(jsonString));
            } catch (error) {
                return false;
            }
       
            treeRef?.removeNodes(toRemove);
            treeRef?.addNodes(newData);
            return true;
        },
    }));

    function data2Json(data: InfTreeViewProps["data"]): NestedObject {
        const result: NestedObject = {};

        data.forEach((node: any) => {
            const name = node[fields.text];
            const children = node[fields.child];
            if (children && children.length > 0) {
                result[name] = data2Json(children);
            } else {
                result[name] = "";
            }
        });

        return result;
    }

    function json2Data(nestedObject: NestedObject, expanded = true): InfTreeViewProps["data"] {
        const result: InfTreeViewProps["data"] = [];

        Object.entries(nestedObject).forEach(([key, value]) => {
            result.push({
                id: uuidv4(),
                name: key,
                children: (typeof value === "object" && value !== null) ? json2Data(value, false) : [],
                expanded
            });
        });

        return result;
    }

    const nodeTemplate = (data: any) => {
        const id = data[fields.id];
        const hasParent = treeRef.getNode(id)?.parentID != undefined;
        return (
            <div className='nodeContainer' key={id}>
                <span>{data[fields.text]}</span>
                <button className='InfButton' onClick={() => {
                    const newNode: any = {};
                    newNode[fields.id] = uuidv4();
                    newNode[fields.text] = "nome";
                    treeRef?.addNodes([newNode], id);
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0  0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
                <button disabled={!hasParent} className='InfButton' onClick={() => hasParent && id ? treeRef?.removeNodes([id]) : null}>
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
                    props.onNodeUpdate(args.newText);
                }
            }}
            nodeClicked={(args) => {
                const id = args.node.dataset.uid;
                selectedNodeId.current = id;
                if (props.onNodeSelected) {
                    props.onNodeSelected(args.event.target.innerText);
                }
            }}
            nodeEditing={(args) => {
                    if(allowEditing.current) {
                        allowEditing.current = false;
                    } else {
                        args.cancel = true;
                    }
                }
            }
        />
    );
})

export default InfTreeView;
