'use client'

import { useState } from "react";
import { useEditor,EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import YoutubeVideo, { Youtube } from "@tiptap/extension-youtube"
import BlockQuote from "@tiptap/extension-blockquote"
// import {
//     toggleBold,
//     toggleImage,
//     toggleBlockquote,
//     toggleItalic,
//     toggleStrikeThrough,
//     toggleUnderline,
//     toggleYoutubeLink
// } from "./TipTapCommands"
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";



export default function TipTapEditor(){
    const [text,setText] = useState('');
    const editor = useEditor(
        {
        extensions:[
            StarterKit,
            Link.extend({inclusive: false}).configure({
                openOnClick: false,
            }),
            BlockQuote.configure({
                HTMLAttributes:{
                    class: 'my-custom-blockquotes'
                }
            }),
            Image.configure({
                resize:{
                    enabled: true,
                    directions: ['top','bottom','left','right'],
                    minHeight: 50,
                    minWidth: 50,
                    alwaysPreserveAspectRatio: true
                },
                HTMLAttributes:{
                    class: 'my-custom-images'
                }
            }),
            Underline,
            Youtube.configure({
                controls: true,
                nocookie: false
            }),
            Bold.configure({
                HTMLAttributes:{
                    class: 'my-custom-bolds'
                }
            }),
            Italic.configure({
                HTMLAttributes:{
                    class: 'my-custom-italics'
                }
            }),
            Strike.configure({
                HTMLAttributes:{
                    class: 'my-custom-strikes'
                }
            })
        ],
        content: text,
        onUpdate({editor}){
            setText(editor.getHTML());
        },
        shouldRerenderOnTransaction: true,
        immediatelyRender: false
    });

    
    
//https://youtu.be/rma3HnwcBp0?si=H7SwDewEOT8_8xEa
    return(<>
    <div className="flex gap-2">
                <button onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
      <button onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
      <button onClick={() => editor?.chain().focus().toggleStrike().run()}>Strike</button>
      <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
      <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Blockquote</button>

      <button
        onClick={() => {
            editor?.chain().focus().setImage({src: 'http://localhost:8080/uploads/2a3a00bb-6d01-467c-b945-9fabbd5e6de1_banner.svg'}).run()
        }}
      >
        IMG
      </button>

      <button
        onClick={() => {
          editor?.commands.setYoutubeVideo({src:'https://youtu.be/rma3HnwcBp0?si=H7SwDewEOT8_8xEa'})
        }}
      >
        YouTube
      </button>

            </div>
            <div className='border border-[#FF9466] mb-[40px] px-[12px] py-[6px] text-[16px] rounded-[4px]'>
            
            <EditorContent editor={editor}/>
        </div>
    </>
        
    );
}