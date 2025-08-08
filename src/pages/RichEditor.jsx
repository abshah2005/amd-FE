// // Usage example
// import SimpleTextEditor from '../components/RichTextEditor';
// import RichTextEditor from '../components/RichTextEditor';

// const RichEditor = () => {
//   const handleSubmit = (content) => {
//     console.log('Editor content:', content);
//   };

//   return (
//     <div>
//       <SimpleTextEditor 
//         onSubmit={handleSubmit}
//         placeholder="Type your question..."
//       />
//     </div>
//   );
// };

// export default RichEditor;


import React from 'react';
import LexicalEditor from '../components/RichTextEditor';
// import TiptapEditor from '../components/RichTextEditor';

const RichEditor = () => {
  const handleSubmit = (content) => {
    console.log('Editor content:', content);
  };

  return (
    
    <div style={{ padding: '20px' }}>
     <LexicalEditor submitButtonText='done' hideSubmitButton={false}/>
    </div>
  );
};

export default RichEditor;