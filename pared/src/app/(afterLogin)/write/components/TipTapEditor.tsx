'use client'

import { useRef, useState } from "react";
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
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align"
import YoutubeModal from "./YoutubeModal";
import api from "../../../(beforeLogin)/login/_component/AxiosApi"
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Strikethrough,
  Underline as UnderlineIcon,
  Quote,
  Heading1,
  Heading3,
  Heading5,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Youtube as YoutubeIcon
} from "lucide-react";



export default function TipTapEditor(){
    const [text,setText] = useState('')
    const [url,setUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement|null>(null);
    const handleImageButton = ()=>{
        fileInputRef?.current?.click();
    }

    const handleImageSelect = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file) return;
        if(!file.type.startsWith("image/")){
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        const imageUrl = await uploadImage(file);
        const finalUrl = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imageUrl}`
        console.log(finalUrl)
        editor
        ?.chain().focus().
        setImage({
          src: finalUrl,
        })
        .run()

        e.target.value = "";
    }

    async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/api/v1/article/upload-temporary-file", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  console.log(res.data);
  return res.data.data.fileDTO.link;  // 서버가 돌려주는 이미지 URL
}


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
                    enabled: false,
                    // directions: ['top','bottom','left','right'],
                    // minHeight: 50,
                    // minWidth: 50,
                    // alwaysPreserveAspectRatio: true
                },
                HTMLAttributes:{
                    class: 'my-custom-images'
                }
            }),
            Underline,
            Youtube.configure({
                controls: true,
                nocookie: false,
                HTMLAttributes:{
                    class: 'my-custom-youtubes'
                }
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
            }),
            Heading.configure({
                HTMLAttributes:{
                    class: 'my-custom-headings'
                },
                levels:[1,2,3,4,5,6]
            }),
            TextAlign.configure({
                types:['heading','paragraph'],
                alignments:['left','right','center']
            })
        ],
        content: text,
        onUpdate({editor}){
            setText(editor.getHTML());
        },
        shouldRerenderOnTransaction: true,
        immediatelyRender: false
    });

    const ToolbarButton = ({ onClick, active, children }: any) => (
  <button
  type="button"
  onMouseDown={(e)=>e.preventDefault()}
    onClick={onClick}
    className={`
      p-2 rounded-md border transition
      flex items-center justify-center gap-1
      text-sm
      ${active
        ? "bg-[#ff9466] text-white border-[#ff9466]"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"}
    `}
  >
    {children}
  </button>
);

    const [youtubeOpen, setYoutubeOpen] = useState(false);

    return(<>
    {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />

    <YoutubeModal
        isOpen={youtubeOpen}
        onClose={()=>setYoutubeOpen(false)}
        onSubmit={(url)=>{
            editor
                ?.chain()
                .focus()
                .setYoutubeVideo({src: url})
                .run();
        }}/>
    <div className="flex gap-[3px] flex-wrap bg-white p-2 rounded-lg border mb-4 h-[25px]">
  <ToolbarButton
    active={editor?.isActive("bold")}
    onClick={() => editor?.chain().focus().toggleBold().run()}
  >
    <BoldIcon size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive("italic")}
    onClick={() => editor?.chain().focus().toggleItalic().run()}
  >
    <ItalicIcon size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive("strike")}
    onClick={() => editor?.chain().focus().toggleStrike().run()}
  >
    <Strikethrough size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive("underline")}
    onClick={() => editor?.chain().focus().toggleUnderline().run()}
  >
    <UnderlineIcon size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive("blockquote")}
    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
  >
    <Quote size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive("heading", { level: 1 })}
    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
  >
    <Heading1 size={18} />
  </ToolbarButton>

<ToolbarButton
    active={editor?.isActive("heading", { level: 3 })}
    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
  >
    <Heading3 size={18} />
  </ToolbarButton>
  <ToolbarButton
    active={editor?.isActive("heading", { level: 5 })}
    onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
  >
    <Heading5 size={18} />
  </ToolbarButton>
  <ToolbarButton
    active={editor?.isActive({ textAlign: "left" })}
    onClick={() => editor?.chain().focus().toggleTextAlign("left").run()}
  >
    <AlignLeft size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive({ textAlign: "center" })}
    onClick={() => editor?.chain().focus().toggleTextAlign("center").run()}
  >
    <AlignCenter size={18} />
  </ToolbarButton>

  <ToolbarButton
    active={editor?.isActive({ textAlign: "right" })}
    onClick={() => editor?.chain().focus().toggleTextAlign("right").run()}
  >
    <AlignRight size={18} />
  </ToolbarButton>

  <ToolbarButton
    onClick={handleImageButton}
  >
    <ImageIcon size={18} />
  </ToolbarButton>

  <ToolbarButton
    onClick={() =>
      setYoutubeOpen(true)
    }
  >
    <YoutubeIcon size={18} />
  </ToolbarButton>
</div>

            <div className='border border-[#FF9466] mb-[40px] px-[12px] py-[6px] text-[16px] rounded-[4px]'>
            
            <EditorContent editor={editor}/>
        </div>
    </>
        
    );
}