import React from 'react';
import CommentsComponent from '@/components/CommentsComponent';

export default function page() {
  return (
    // <div className='p-4'>page {params.modulId}</div>
    <div className='p-4'>
        <CommentsComponent />
    </div>
  )
}