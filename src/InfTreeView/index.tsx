import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { InfTreeViewArgs } from './types';
import React from 'react';

class InfTreeView extends React.Component<InfTreeViewArgs> {
    static defaultProps = {
        fields: {
            id: 'id'
        }
    };
    // define the array of data
    // let tree: TreeViewComponent ;
  
    // function editing(args: any) {
    //     //check whether node is root node or not
    //     // if (args.node.parentNode.parentNode.nodeName !== "LI") {
    //     //     args.cancel = true;
    //     // }
    //     tree.expandAll()
    //     console.log(args)

    // }

    render () {
        const fields: Object = { dataSource: props.data || {}, id: props.fields.id , text: props.fields?.text || 'name', child: props.fields?.children || 'children' };
        return <TreeViewComponent  fields={fields} allowEditing={true} nodeEdited={(arg) => editing(arg)}  ref={ref => tree = ref as TreeViewComponent }/>
    }
}

export default InfTreeView;