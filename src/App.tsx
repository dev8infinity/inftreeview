import InfTreeView from "./InfTreeView";
import { InfTreeViewMethods, InfTreeViewProps } from "./InfTreeView/types";
import { Fields } from './Fields'
import { FieldsMethods } from "./Fields/types";
const hierarchicalData: InfTreeViewProps["data"] = [
  {
    id: '01', name: 'Local Disk (C:)', expanded: true,
    children: [
      {
        id: '01-01', name: 'Program Files',
        children: [
          { id: '01-01-01', name: '7-Zip' },
          { id: '01-01-02', name: 'Git' },
          { id: '01-01-03', name: 'IIS Express' },
        ]
      },
      {
        id: '01-02', name: 'Users', expanded: true,
        children: [
          { id: '01-02-01', name: 'Smith' },
          { id: '01-02-02', name: 'Public' },
          { id: '01-02-03', name: 'Admin' },
        ]
      },
      {
        id: '01-03', name: 'Windows',
        children: [
          { id: '01-03-01', name: 'Boot' },
          { id: '01-03-02', name: 'FileManager' },
          { id: '01-03-03', name: 'System32' },
        ]
      },
    ]
  },
  {
    id: '02', name: 'Local Disk (D:)',
    children: [
      {
        id: '02-01', name: 'Personals',
        children: [
          { id: '02-01-01', name: 'My photo.png' },
          { id: '02-01-02', name: 'Rental document.docx' },
          { id: '02-01-03', name: 'Pay slip.pdf' },
        ]
      },
      {
        id: '02-02', name: 'Projects',
        children: [
          { id: '02-02-01', name: 'ASP Application' },
          { id: '02-02-02', name: 'TypeScript Application' },
          { id: '02-02-03', name: 'React Application' },
        ]
      },
      {
        id: '02-03', name: 'Office',
        children: [
          { id: '02-03-01', name: 'Work details.docx' },
          { id: '02-03-02', name: 'Weekly report.docx' },
          { id: '02-03-03', name: 'Wish list.csv' },
        ]
      },
    ]
  },
  {
    id: '03', name: 'Local Disk (E:)', icon: 'folder',
    children: [
      {
        id: '03-01', name: 'Pictures',
        children: [
          { id: '03-01-01', name: 'Wind.jpg' },
          { id: '03-01-02', name: 'Stone.jpg' },
          { id: '03-01-03', name: 'Home.jpg' },
        ]
      },
      {
        id: '03-02', name: 'Documents',
        children: [
          { id: '03-02-01', name: 'Environment Pollution.docx' },
          { id: '03-02-02', name: 'Global Warming.ppt' },
          { id: '03-02-03', name: 'Social Network.pdf' },
        ]
      },
      {
        id: '03-03', name: 'Study Materials',
        children: [
          { id: '03-03-01', name: 'UI-Guide.pdf' },
          { id: '03-03-02', name: 'Tutorials.zip' },
          { id: '03-03-03', name: 'TypeScript.7z' },
        ]
      },
    ]
  }
];
function App() {
  let treeRef: InfTreeViewMethods;
  let fieldRef: FieldsMethods;


  return (
    <div>
      <div>
        <button onClick={() => treeRef?.expandAll()} >Expandir</button>
        <button onClick={() => treeRef?.collapseAll()}>Foldar</button>
        <button onClick={() => fieldRef.updateJsonInput(JSON.stringify(treeRef?.getJson()))} >Copiar Estrutura JSON</button>
      </div>

      <InfTreeView
        data={hierarchicalData}
        // fields={{}} // Opcional
        onNodeSelected={(text: string) => fieldRef?.updateKeyInput(text)}
        ref={(ref: InfTreeViewMethods) => treeRef = ref}
        onNodeUpdate={(newValue: string) => fieldRef?.updateKeyInput(newValue)} 
      />

      <Fields
        onKeyInputChange={(newValue) => treeRef?.updateSelectedNodeText(newValue)}
        onJsonInputChange={(newValue) => treeRef?.updateFromJson(newValue)}
        ref={(ref: FieldsMethods) => fieldRef = ref}
      >

      </Fields>
    </div>
  );
}
export default App;