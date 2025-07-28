// import React, { useState, useCallback } from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { ListNode, ListItemNode } from "@lexical/list";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

// import {
//   $getRoot,
//   $getSelection,
//   FORMAT_TEXT_COMMAND,
//   $isRangeSelection,
//   SELECTION_CHANGE_COMMAND
// } from "lexical";

// import {
//   INSERT_ORDERED_LIST_COMMAND,
//   INSERT_UNORDERED_LIST_COMMAND,
//   REMOVE_LIST_COMMAND,
//   $isListNode
// } from "@lexical/list";

// import { 
//   Box, 
//   Button, 
//   Typography,
//   Paper,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl
// } from '@mui/material';
// import { 
//   Menu as MenuIcon,
//   FormatBold,
//   FormatItalic,
//   FormatListBulleted,
//   ExpandMore
// } from '@mui/icons-material';

// // Lexical theme configuration for proper styling
// const theme = {
//   text: {
//     bold: 'editor-text-bold',
//     italic: 'editor-text-italic',
//     underline: 'editor-text-underline',
//   },
//   paragraph: 'editor-paragraph',
//   list: {
//     nested: {
//       listitem: 'editor-nested-listitem',
//     },
//     ol: 'editor-list-ol',
//     ul: 'editor-list-ul',
//     listitem: 'editor-listitem',
//   },
// };

// // Enhanced Toolbar Plugin (updated to show only formatting buttons)
// function ToolbarPlugin({ onSubmit }) {
//   const [editor] = useLexicalComposerContext();
//   const [fontSize, setFontSize] = useState('Aa');
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [activeListType, setActiveListType] = useState(null);

//   // Update toolbar state based on selection
//   const updateToolbar = useCallback(() => {
//     const selection = $getSelection();
//     if ($isRangeSelection(selection)) {
//       setIsBold(selection.hasFormat('bold'));
//       setIsItalic(selection.hasFormat('italic'));
      
//       // Check for active list type
//       const nodes = selection.getNodes();
//       let listType = null;
      
//       for (const node of nodes) {
//         const parent = node.getParent();
//         if ($isListNode(parent)) {
//           listType = parent.getListType();
//           break;
//         }
//       }
//       setActiveListType(listType);
//     }
//   }, []);

//   React.useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       editorState.read(() => {
//         updateToolbar();
//       });
//     });
//   }, [editor, updateToolbar]);

//   React.useEffect(() => {
//     return editor.registerCommand(
//       SELECTION_CHANGE_COMMAND,
//       () => {
//         updateToolbar();
//         return false;
//       },
//       1
//     );
//   }, [editor, updateToolbar]);

//   const formatBold = () => {
//     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
//   };

//   const formatItalic = () => {
//     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
//   };

//   const formatBulletList = () => {
//     if (activeListType === 'bullet') {
//       editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
//     } else {
//       editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
//     }
//   };

//   const formatNumberedList = () => {
//     if (activeListType === 'number') {
//       editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
//     } else {
//       editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
//     }
//   };

//   const handleList = (type) => {
//     if (type === 'bullet') {
//       formatBulletList();
//     } else if (type === 'numbered') {
//       formatNumberedList();
//     }
//   };

//   const handleFontSizeChange = (newSize) => {
//     setFontSize(newSize);
//     const contentEditable = document.querySelector('.editor-container');
//     if (contentEditable) {
//       const sizeMap = {
//         'Small': '12px',
//         'Medium': '16px', 
//         'Large': '18px',
//         'Aa': '14px'
//       };
//       contentEditable.style.fontSize = sizeMap[newSize] || '14px';
//     }
//   };

//   return (
//     // Only return the toolbar (no header)
//     <Box sx={{ 
//       backgroundColor: '#f5f5f5', 
//       padding: '8px 16px', 
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       borderTop: '1px solid #e0e0e0'
//     }}>
//       {/* Font Size Selector */}
//       <FormControl size="small" sx={{ minWidth: 60 }}>
//         <Select
//           value={fontSize}
//           onChange={(e) => handleFontSizeChange(e.target.value)}
//           variant="standard"
//           disableUnderline
//           IconComponent={ExpandMore}
//           sx={{
//             fontSize: '14px',
//             color: '#666',
//             '& .MuiSelect-select': {
//               padding: '4px 8px',
//               paddingRight: '24px !important'
//             },
//             '& .MuiSelect-icon': {
//               color: '#666',
//               fontSize: '16px'
//             }
//           }}
//         >
//           <MenuItem value="Aa" sx={{ fontSize: '14px' }}>Aa</MenuItem>
//           <MenuItem value="Small" sx={{ fontSize: '12px' }}>Small</MenuItem>
//           <MenuItem value="Medium" sx={{ fontSize: '16px' }}>Medium</MenuItem>
//           <MenuItem value="Large" sx={{ fontSize: '18px' }}>Large</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Bold Button */}
//       <IconButton 
//         size="small"
//         onClick={formatBold}
//         sx={{ 
//           color: isBold ? '#1976d2' : '#666',
//           backgroundColor: isBold ? 'rgba(25,118,210,0.1)' : 'transparent',
//           padding: '4px',
//           '&:hover': { 
//             backgroundColor: isBold ? 'rgba(25,118,210,0.2)' : 'rgba(0,0,0,0.04)',
//             color: isBold ? '#1976d2' : '#333'
//           }
//         }}
//       >
//         <FormatBold sx={{ fontSize: '18px', fontWeight: 'bold' }} />
//       </IconButton>

//       {/* Italic Button */}
//       <IconButton 
//         size="small"
//         onClick={formatItalic}
//         sx={{ 
//           color: isItalic ? '#1976d2' : '#666',
//           backgroundColor: isItalic ? 'rgba(25,118,210,0.1)' : 'transparent',
//           padding: '4px',
//           '&:hover': { 
//             backgroundColor: isItalic ? 'rgba(25,118,210,0.2)' : 'rgba(0,0,0,0.04)',
//             color: isItalic ? '#1976d2' : '#333'
//           }
//         }}
//       >
//         <FormatItalic sx={{ fontSize: '18px', fontStyle: 'italic' }} />
//       </IconButton>

//       {/* List Button with Dropdown */}
//       <FormControl size="small">
//         <Select
//           value=""
//           displayEmpty
//           variant="standard"
//           disableUnderline
//           IconComponent={ExpandMore}
//           onChange={(e) => handleList(e.target.value)}
//           renderValue={() => (
//             <FormatListBulleted 
//               sx={{ 
//                 fontSize: '18px', 
//                 color: activeListType ? '#1976d2' : '#666'
//               }} 
//             />
//           )}
//           sx={{
//             '& .MuiSelect-select': {
//               padding: '4px',
//               paddingRight: '20px !important'
//             },
//             '& .MuiSelect-icon': {
//               color: '#666',
//               fontSize: '14px',
//               right: '2px'
//             }
//           }}
//         >
//           <MenuItem value="bullet">• Bullet List</MenuItem>
//           <MenuItem value="numbered">1. Numbered List</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

// // Editor configuration
// const editorConfig = {
//   namespace: "MyEditor",
//   theme,
//   onError(error) {
//     console.error('Lexical editor error:', error);
//   },
//   nodes: [ListNode, ListItemNode],
// };

// // Main Editor Component
// export default function LexicalEditor({ onSubmit, placeholder = "Type your question..." }) {
//   const [editorContent, setEditorContent] = useState('');

//   const onChange = (editorState) => {
//     editorState.read(() => {
//       const root = $getRoot();
//       const content = root.getTextContent();
//       setEditorContent(content);
//     });
//   };

//   return (
//     <>
//       <style jsx global>{`
//         .editor-container {
//           background-color: #f5f5f5;
//           height: 150px; /* Fixed height */
//           max-height: 150px; /* Ensure it doesn't grow */
//           overflow-y: auto; /* Enable vertical scrolling */
//           overflow-x: hidden; /* Hide horizontal scroll */
//           padding: 16px;
//           padding-right: 80px; /* Add right padding for the Done button */
//           font-size: 14px;
//           line-height: 1.5;
//           color: #333;
//           outline: none;
//           border: none;
//           box-sizing: border-box;
//         }
        
//         /* Custom scrollbar styling for better appearance */
//         .editor-container::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .editor-container::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 3px;
//         }
        
//         .editor-container::-webkit-scrollbar-thumb {
//           background: #c1c1c1;
//           border-radius: 3px;
//         }
        
//         .editor-container::-webkit-scrollbar-thumb:hover {
//           background: #a1a1a1;
//         }
        
//         .editor-paragraph {
//           margin: 0 0 8px 0;
//         }
        
//         .editor-paragraph:last-child {
//           margin-bottom: 0;
//         }
        
//         .editor-text-bold {
//           font-weight: bold;
//         }
        
//         .editor-text-italic {
//           font-style: italic;
//         }
        
//         .editor-list-ol {
//           padding-left: 20px;
//           margin: 8px 0;
//           list-style-type: decimal;
//         }
        
//         .editor-list-ul {
//           padding-left: 20px;
//           margin: 8px 0;
//           list-style-type: disc;
//         }
        
//         .editor-listitem {
//           margin: 4px 0;
//           display: list-item;
//         }
        
//         .editor-nested-listitem {
//           list-style-type: circle;
//         }
        
//         .editor-placeholder {
//           color: #999;
//           overflow: hidden;
//           position: absolute;
//           text-overflow: ellipsis;
//           top: 16px; /* Same line as text input */
//           left: 16px;
//           right: 80px; /* Leave space for Done button */
//           user-select: none;
//           white-space: nowrap;
//           display: inline-block;
//           pointer-events: none;
//           z-index: 1;
//           line-height: 1.5;
//         }
        
//         /* Ensure the editor content area has proper positioning */
//         .editor-content-wrapper {
//           height: 150px;
//           overflow: hidden;
//           position: relative;
//         }
        
//         /* Done button positioning - overlapping on same line */
//         .done-button-container {
//           position: absolute;
//           top: 12px; /* Aligned with first line of text */
//           right: 12px;
//           z-index: 10;
//         }
//       `}</style>

//       <Paper elevation={0} sx={{ 
//         border: '1px solid #e0e0e0', 
//         borderRadius: '8px',
//         overflow: 'hidden',
//         backgroundColor: '#f5f5f5'
//       }}>
//         <LexicalComposer initialConfig={editorConfig}>
//           {/* Header - Only Description title */}
//           <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             padding: '12px 16px', 
//             borderBottom: '1px solid #e0e0e0', 
//             backgroundColor: 'white' 
//           }}>
//             <MenuIcon sx={{ fontSize: 18, color: '#666', marginRight: 1 }} />
//             <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
//               Description
//             </Typography>
//           </Box>

//           {/* Editor Content with fixed height wrapper and Done button */}
//           <Box 
//             className="editor-content-wrapper"
//             sx={{ 
//               backgroundColor: '#f5f5f5', 
//               position: 'relative',
//               height: '150px',
//               overflow: 'hidden'
//             }}
//           >
//             {/* Done Button - Overlapping on same line as text */}
//             <Box className="done-button-container">
//               <Button 
//                 variant="outlined" 
//                 size="small" 
//                 onClick={() => {
//                   if (onSubmit) {
//                     onSubmit(editorContent);
//                   }
//                 }}
//                 sx={{
//                   textTransform: 'none',
//                   color: '#666',
//                   borderColor: '#ccc',
//                   fontSize: '12px',
//                   padding: '2px 12px',
//                   backgroundColor: 'white',
//                   minHeight: '28px',
//                   '&:hover': {
//                     borderColor: '#999',
//                     backgroundColor: '#f9f9f9'
//                   }
//                 }}
//               >
//                 Done
//               </Button>
//             </Box>

//             <RichTextPlugin
//               contentEditable={
//                 <ContentEditable 
//                   className="editor-container"
//                   style={{ 
//                     resize: 'none',
//                     height: '150px',
//                     maxHeight: '150px',
//                     overflowY: 'auto',
//                     overflowX: 'hidden'
//                   }}
//                 />
//               }
//               placeholder={
//                 <div className="editor-placeholder">
//                   {placeholder}
//                 </div>
//               }
//               ErrorBoundary={LexicalErrorBoundary}
//             />
//             <HistoryPlugin />
//             <ListPlugin />
//             <AutoFocusPlugin />
//             <OnChangePlugin onChange={onChange} />
//           </Box>

//           {/* Toolbar at the bottom */}
//           <ToolbarPlugin onSubmit={onSubmit} />
//         </LexicalComposer>
//       </Paper>
//     </>
//   );
// }


import React, { useState, useCallback, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import {
  $getRoot,
  $getSelection,
  FORMAT_TEXT_COMMAND,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND
} from "lexical";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode
} from "@lexical/list";

import { 
  Box, 
  Button, 
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { 
  Menu as MenuIcon,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  ExpandMore
} from '@mui/icons-material';

// Lexical theme configuration for proper styling
const theme = {
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    underline: 'editor-text-underline',
  },
  paragraph: 'editor-paragraph',
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
};

// Enhanced Toolbar Plugin
function ToolbarPlugin({ onSubmit }) {
  const [editor] = useLexicalComposerContext();
  const [fontSize, setFontSize] = useState('Aa');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [activeListType, setActiveListType] = useState(null);

  // Update toolbar state based on selection
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      
      // Check for active list type
      const nodes = selection.getNodes();
      let listType = null;
      
      for (const node of nodes) {
        const parent = node.getParent();
        if ($isListNode(parent)) {
          listType = parent.getListType();
          break;
        }
      }
      setActiveListType(listType);
    }
  }, []);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1
    );
  }, [editor, updateToolbar]);

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const formatBulletList = () => {
    if (activeListType === 'bullet') {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (activeListType === 'number') {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const handleList = (type) => {
    if (type === 'bullet') {
      formatBulletList();
    } else if (type === 'numbered') {
      formatNumberedList();
    }
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    const contentEditable = document.querySelector('.editor-container');
    if (contentEditable) {
      const sizeMap = {
        'Small': '12px',
        'Medium': '16px', 
        'Large': '18px',
        'Aa': '14px'
      };
      contentEditable.style.fontSize = sizeMap[newSize] || '14px';
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#f5f5f5', 
      padding: '8px 16px', 
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      borderTop: '1px solid #e0e0e0'
    }}>
      {/* Font Size Selector */}
      <FormControl size="small" sx={{ minWidth: 60 }}>
        <Select
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          variant="standard"
          disableUnderline
          IconComponent={ExpandMore}
          sx={{
            fontSize: '14px',
            color: '#666',
            '& .MuiSelect-select': {
              padding: '4px 8px',
              paddingRight: '24px !important'
            },
            '& .MuiSelect-icon': {
              color: '#666',
              fontSize: '16px'
            }
          }}
        >
          <MenuItem value="Aa" sx={{ fontSize: '14px' }}>Aa</MenuItem>
          <MenuItem value="Small" sx={{ fontSize: '12px' }}>Small</MenuItem>
          <MenuItem value="Medium" sx={{ fontSize: '16px' }}>Medium</MenuItem>
          <MenuItem value="Large" sx={{ fontSize: '18px' }}>Large</MenuItem>
        </Select>
      </FormControl>

      {/* Bold Button */}
      <IconButton 
        size="small"
        onClick={formatBold}
        sx={{ 
          color: isBold ? '#1976d2' : '#666',
          backgroundColor: isBold ? 'rgba(25,118,210,0.1)' : 'transparent',
          padding: '4px',
          '&:hover': { 
            backgroundColor: isBold ? 'rgba(25,118,210,0.2)' : 'rgba(0,0,0,0.04)',
            color: isBold ? '#1976d2' : '#333'
          }
        }}
      >
        <FormatBold sx={{ fontSize: '18px', fontWeight: 'bold' }} />
      </IconButton>

      {/* Italic Button */}
      <IconButton 
        size="small"
        onClick={formatItalic}
        sx={{ 
          color: isItalic ? '#1976d2' : '#666',
          backgroundColor: isItalic ? 'rgba(25,118,210,0.1)' : 'transparent',
          padding: '4px',
          '&:hover': { 
            backgroundColor: isItalic ? 'rgba(25,118,210,0.2)' : 'rgba(0,0,0,0.04)',
            color: isItalic ? '#1976d2' : '#333'
          }
        }}
      >
        <FormatItalic sx={{ fontSize: '18px', fontStyle: 'italic' }} />
      </IconButton>

      {/* List Button with Dropdown */}
      <FormControl size="small">
        <Select
          value=""
          displayEmpty
          variant="standard"
          disableUnderline
          IconComponent={ExpandMore}
          onChange={(e) => handleList(e.target.value)}
          renderValue={() => (
            <FormatListBulleted 
              sx={{ 
                fontSize: '18px', 
                color: activeListType ? '#1976d2' : '#666'
              }} 
            />
          )}
          sx={{
            '& .MuiSelect-select': {
              padding: '4px',
              paddingRight: '20px !important'
            },
            '& .MuiSelect-icon': {
              color: '#666',
              fontSize: '14px',
              right: '2px'
            }
          }}
        >
          <MenuItem value="bullet">• Bullet List</MenuItem>
          <MenuItem value="numbered">1. Numbered List</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

// Editor configuration
const editorConfig = {
  namespace: "MyEditor",
  theme,
  onError(error) {
    console.error('Lexical editor error:', error);
  },
  nodes: [ListNode, ListItemNode],
};

// Main Editor Component with all necessary callbacks
export default function LexicalEditor({ 
  value = '',
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder = "Type your question...",
  disabled = false,
  maxLength,
  autoFocus = false,
  showWordCount = false,
  submitButtonText = "Done",
  hideSubmitButton = false,
  className,
  style,
  height = 150,
  ...props 
}) {
  const [editorContent, setEditorContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [plainTextContent, setPlainTextContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  // Update editor content when value prop changes
  useEffect(() => {
    if (value !== plainTextContent) {
      setPlainTextContent(value);
      setEditorContent(value);
    }
  }, [value]);

  // Enhanced onChange handler
  const handleEditorChange = useCallback((editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      const htmlContent = root.getTextContent(); // You can enhance this to get actual HTML
      
      // Update state
      setPlainTextContent(textContent);
      setHtmlContent(htmlContent);
      setEditorContent(textContent);
      setIsEmpty(textContent.trim() === '');
      
      // Calculate counts
      const words = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
      const characters = textContent.length;
      setWordCount(words);
      setCharacterCount(characters);
      
      // Call parent onChange with comprehensive data
      if (onChange) {
        onChange({
          plainText: textContent,
          html: htmlContent,
          isEmpty: textContent.trim() === '',
          wordCount: words,
          characterCount: characters,
          editorState
        });
      }
    });
  }, [onChange]);

  // Submit handler
  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit({
        plainText: plainTextContent,
        html: htmlContent,
        isEmpty: isEmpty,
        wordCount: wordCount,
        characterCount: characterCount
      });
    }
  }, [onSubmit, plainTextContent, htmlContent, isEmpty, wordCount, characterCount]);

  // Focus handler
  const handleFocus = useCallback((event) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  }, [onFocus]);

  // Blur handler
  const handleBlur = useCallback((event) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  }, [onBlur]);

  // Key down handler
  const handleKeyDown = useCallback((event) => {
    // Handle Ctrl+Enter or Cmd+Enter for submit
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
      return;
    }

    // Handle max length
    if (maxLength && characterCount >= maxLength && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      return;
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  }, [onKeyDown, handleSubmit, maxLength, characterCount]);

  return (
    <>
      <style jsx global>{`
        .editor-container {
          background-color: #f5f5f5;
          height: ${height}px;
          max-height: ${height}px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          padding-right: ${hideSubmitButton ? '16px' : '80px'};
          font-size: 14px;
          line-height: 1.5;
          color: #333;
          outline: none;
          border: none;
          box-sizing: border-box;
          opacity: ${disabled ? 0.6 : 1};
          pointer-events: ${disabled ? 'none' : 'auto'};
        }
        
        .editor-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .editor-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .editor-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        .editor-container::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
        
        .editor-paragraph {
          margin: 0 0 8px 0;
        }
        
        .editor-paragraph:last-child {
          margin-bottom: 0;
        }
        
        .editor-text-bold {
          font-weight: bold;
        }
        
        .editor-text-italic {
          font-style: italic;
        }
        
        .editor-list-ol {
          padding-left: 20px;
          margin: 8px 0;
          list-style-type: decimal;
        }
        
        .editor-list-ul {
          padding-left: 20px;
          margin: 8px 0;
          list-style-type: disc;
        }
        
        .editor-listitem {
          margin: 4px 0;
          display: list-item;
        }
        
        .editor-nested-listitem {
          list-style-type: circle;
        }
        
        .editor-placeholder {
          color: #999;
          overflow: hidden;
          position: absolute;
          text-overflow: ellipsis;
          top: 16px;
          left: 16px;
          right: ${hideSubmitButton ? '16px' : '80px'};
          user-select: none;
          white-space: nowrap;
          display: inline-block;
          pointer-events: none;
          z-index: 1;
          line-height: 1.5;
        }
        
        .editor-content-wrapper {
          height: ${height}px;
          overflow: hidden;
          position: relative;
        }
        
        .done-button-container {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
        }

        .editor-focused {
          border-color: #1976d2 !important;
          box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
        }

        .editor-word-count {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 12px;
          color: #999;
          background: rgba(255, 255, 255, 0.8);
          padding: 2px 6px;
          border-radius: 4px;
        }
      `}</style>

      <Paper 
        elevation={0} 
        className={`${className || ''} ${isFocused ? 'editor-focused' : ''}`}
        style={style}
        sx={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          ...props
        }}
      >
        <LexicalComposer initialConfig={editorConfig}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 16px', 
            borderBottom: '1px solid #e0e0e0', 
            backgroundColor: 'white' 
          }}>
            <MenuIcon sx={{ fontSize: 18, color: '#666', marginRight: 1 }} />
            <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
              Description
            </Typography>
            {maxLength && (
              <Typography variant="caption" sx={{ marginLeft: 'auto', color: characterCount >= maxLength ? 'red' : '#999' }}>
                {characterCount}/{maxLength}
              </Typography>
            )}
          </Box>

          {/* Editor Content */}
          <Box 
            className="editor-content-wrapper"
            sx={{ 
              backgroundColor: '#f5f5f5', 
              position: 'relative',
              height: `${height}px`,
              overflow: 'hidden'
            }}
          >
            {/* Done Button */}
            {!hideSubmitButton && (
              <Box className="done-button-container">
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleSubmit}
                  disabled={disabled || isEmpty}
                  sx={{
                    textTransform: 'none',
                    color: '#666',
                    borderColor: '#ccc',
                    fontSize: '12px',
                    padding: '2px 12px',
                    backgroundColor: 'white',
                    minHeight: '28px',
                    '&:hover': {
                      borderColor: '#999',
                      backgroundColor: '#f9f9f9'
                    },
                    '&:disabled': {
                      opacity: 0.5
                    }
                  }}
                >
                  {submitButtonText}
                </Button>
              </Box>
            )}

            {/* Word Count */}
            {showWordCount && (
              <Box className="editor-word-count">
                {wordCount} words, {characterCount} chars
              </Box>
            )}

            <RichTextPlugin
              contentEditable={
                <ContentEditable 
                  className="editor-container"
                  style={{ 
                    resize: 'none',
                    height: `${height}px`,
                    maxHeight: `${height}px`,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              }
              placeholder={
                <div className="editor-placeholder">
                  {placeholder}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            {autoFocus && <AutoFocusPlugin />}
            <OnChangePlugin onChange={handleEditorChange} />
          </Box>

          {/* Toolbar */}
          <ToolbarPlugin onSubmit={handleSubmit} />
        </LexicalComposer>
      </Paper>
    </>
  );
}

// Export additional utility functions
export const EditorUtils = {
  // Get plain text from editor content
  getPlainText: (editorState) => {
    return editorState.read(() => {
      const root = $getRoot();
      return root.getTextContent();
    });
  },

  // Check if editor is empty
  isEmpty: (editorState) => {
    return editorState.read(() => {
      const root = $getRoot();
      return root.getTextContent().trim() === '';
    });
  },

  // Get word count
  getWordCount: (editorState) => {
    return editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent().trim();
      return text ? text.split(/\s+/).length : 0;
    });
  }
};