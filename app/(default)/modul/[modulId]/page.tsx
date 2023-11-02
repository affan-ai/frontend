import React from 'react';
import DetailModul from '@/components/DetailModul';


export default function page() {
  return (
    // <div className='p-4'>page {params.modulId}</div>
    <div className='p-4'>
      <DetailModul /> {/* Gunakan komponen DetailPage di sini */}
    </div>
  )
}
