// 'use client'
// import { useState,useRef } from 'react'
// import {
//     Editor,
//     EditorState,
//     convertToRaw,
//     convertFromRaw,
//     RichUtils,
//     AtomicBlockUtils } from 'draft-js'
// import createImagePlugin from '@draft-js-plugins/image'
// import type {DraftHandleValue} from 'draft-js'

// export default function DraftEditor(){
//     const [editorState,setEditorState] = useState(()=>
//     EditorState.createEmpty(),
// )
//     const imagePlugin = createImagePlugin()
//     const editorRef = useRef<Editor>(null);
//     const toggleBold = event=>{
//         event.preventDefault()
//         setEditorState(RichUtils.toggleInlineStyle(editorState,'BOLD'))
//     }

//     const toggleItalic = event=>{
//         event.preventDefault()
//         setEditorState(RichUtils.toggleInlineStyle(editorState,'ITALIC'))
//     }
    
//     const toggleStrikeThrough = event=>{
//         event.preventDefault()
//         setEditorState(RichUtils.toggleInlineStyle(editorState,'STRIKETHROUGH'))
//     }

//     const toggleUnderline = event=>{
//         event.preventDefault()
//         setEditorState(RichUtils.toggleInlineStyle(editorState,'UNDERLINE'))
//     }
//     const toggleBlockQuote = event=>{
//         event.preventDefault()
//         setEditorState(RichUtils.toggleBlockType(editorState,'blockquote'))
//     }
//     const insertImage = url => {
//         const newState = imagePlugin.addImage(editorState,url);
//         setEditorState(newState);
//     }

//     const handleDroppedFiles = (selection:any,files:Array<Blob> | null) : DraftHandleValue =>{
//         if (!files || files.length === 0) return "not-handled";

//     const file = files[0] as File;

//     if (!file.type.startsWith("image/")) {
//       return "not-handled"; // 이미지 아닌 경우 무시
//     }

//     insertImage('http://localhost:8080/uploads/2a3a00bb-6d01-467c-b945-9fabbd5e6de1_banner.svg');
//     return "handled";
        
//     }


    
    

//     const blockStyleFn = (block) => {
//         switch (block.getType()) {
//             case "blockquote":
//                 return "editor-quote";
//             default:
//                 return null;
//         }
//     };



//     return(
//         <>
//         <button onClick={toggleBold}>B</button>
//         <button onClick={toggleItalic}>I</button>
//         <button onClick={toggleStrikeThrough}>S</button>
//         <button onClick={toggleUnderline}>U</button>
//         <button onClick={toggleBlockQuote}>Q</button>
        
//         <div className='border border-[#FF9466] mb-[40px] px-[12px] py-[6px] text-[16px] rounded-[4px]'>
//             <Editor 
//                 editorState={editorState} 
//                 onChange={setEditorState} 
//                 blockStyleFn={blockStyleFn}
//                 plugins={[imagePlugin]} 
//                 handleDroppedFiles={handleDroppedFiles}
//                 ref={editorRef} />
//         </div>
//         </>
        
//     );
// }