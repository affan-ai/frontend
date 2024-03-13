import React, { useState, useEffect } from 'react';
import { BiLink } from 'react-icons/bi';



const LinkButton: React.FC<{ itemId: string }> = ({ itemId }) => {

    return (
        <BiLink size='20'
            onClick={() => {
            const linkElement = document.querySelector(`a[href="/forum/${itemId}"]`);
            const link = (linkElement as HTMLAnchorElement).href;                  
            if (link) {
                navigator.clipboard.writeText(link);
            };
        }}
        />
    )
}

export default LinkButton;