import React from 'react';
import CodeEditor from '../components/CodeEditor';

const page = () => {
  return (
    <div className='p-4'>
      <div>
        Compiler Page
      </div>
      <div>
        <CodeEditor />
      </div>
    </div>
    
  )
}

export default page