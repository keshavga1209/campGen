import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

export default function ImageEditor({src, onSave}) {
   
  return (
        <FilerobotImageEditor
          source={src}
          onSave={onSave}
          Text={{ text: 'Enter Text' }}
          tabsIds={[TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
  );
}
