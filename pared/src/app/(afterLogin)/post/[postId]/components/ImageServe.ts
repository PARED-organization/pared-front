export default function ImageServe(link){
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${link}`;
}