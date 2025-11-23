import React from "react";

export const InnerContent = React.memo(({content})=>{
    return(
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
});