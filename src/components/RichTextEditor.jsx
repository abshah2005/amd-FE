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
  SELECTION_CHANGE_COMMAND,
  $createParagraphNode,
  $createTextNode,
} from "lexical";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from "@lexical/list";

import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  Menu as MenuIcon,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  ExpandMore,
} from "@mui/icons-material";

// Lexical theme configuration for proper styling
const theme = {
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
  paragraph: "editor-paragraph",
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
};

// Enhanced Toolbar Plugin
function ToolbarPlugin({ onSubmit }) {
  const [editor] = useLexicalComposerContext();
  const [fontSize, setFontSize] = useState("Aa");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [activeListType, setActiveListType] = useState(null);

  // Update toolbar state based on selection
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));

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
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const formatBulletList = () => {
    if (activeListType === "bullet") {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (activeListType === "number") {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const handleList = (type) => {
    if (type === "bullet") {
      formatBulletList();
    } else if (type === "numbered") {
      formatNumberedList();
    }
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    const contentEditable = document.querySelector(".editor-container");
    if (contentEditable) {
      const sizeMap = {
        Small: "12px",
        Medium: "16px",
        Large: "18px",
        Aa: "14px",
      };
      contentEditable.style.fontSize = sizeMap[newSize] || "14px";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      {/* Font Size Selector */}
      <FormControl size="small" sx={{ minWidth: 60 }}>
        <Select
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          variant="standard"
          disableUnderline
          IconComponent={ExpandMore}
          sx={{
            fontSize: "14px",
            color: "#666",
            "& .MuiSelect-select": {
              padding: "4px 8px",
              paddingRight: "24px !important",
            },
            "& .MuiSelect-icon": {
              color: "#666",
              fontSize: "16px",
            },
          }}
        >
          <MenuItem value="Aa" sx={{ fontSize: "14px" }}>
            Aa
          </MenuItem>
          <MenuItem value="Small" sx={{ fontSize: "12px" }}>
            Small
          </MenuItem>
          <MenuItem value="Medium" sx={{ fontSize: "16px" }}>
            Medium
          </MenuItem>
          <MenuItem value="Large" sx={{ fontSize: "18px" }}>
            Large
          </MenuItem>
        </Select>
      </FormControl>

      {/* Bold Button */}
      <IconButton
        size="small"
        onClick={formatBold}
        sx={{
          color: isBold ? "#1976d2" : "#666",
          backgroundColor: isBold ? "rgba(25,118,210,0.1)" : "transparent",
          padding: "4px",
          "&:hover": {
            backgroundColor: isBold
              ? "rgba(25,118,210,0.2)"
              : "rgba(0,0,0,0.04)",
            color: isBold ? "#1976d2" : "#333",
          },
        }}
      >
        <FormatBold sx={{ fontSize: "18px", fontWeight: "bold" }} />
      </IconButton>

      {/* Italic Button */}
      <IconButton
        size="small"
        onClick={formatItalic}
        sx={{
          color: isItalic ? "#1976d2" : "#666",
          backgroundColor: isItalic ? "rgba(25,118,210,0.1)" : "transparent",
          padding: "4px",
          "&:hover": {
            backgroundColor: isItalic
              ? "rgba(25,118,210,0.2)"
              : "rgba(0,0,0,0.04)",
            color: isItalic ? "#1976d2" : "#333",
          },
        }}
      >
        <FormatItalic sx={{ fontSize: "18px", fontStyle: "italic" }} />
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
                fontSize: "18px",
                color: activeListType ? "#1976d2" : "#666",
              }}
            />
          )}
          sx={{
            "& .MuiSelect-select": {
              padding: "4px",
              paddingRight: "20px !important",
            },
            "& .MuiSelect-icon": {
              color: "#666",
              fontSize: "14px",
              right: "2px",
            },
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
    console.error("Lexical editor error:", error);
  },
  nodes: [ListNode, ListItemNode],
};

// Add a component to handle initial content setting
function InitialContentPlugin({ initialContent }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialContent) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(initialContent));
        root.append(paragraph);
      });
    }
  }, []); // Only run once on mount

  return null;
}

// Enhanced value synchronization plugin
function ValueSyncPlugin({ value }) {
  const [editor] = useLexicalComposerContext();
  const [lastValue, setLastValue] = useState(value);

  useEffect(() => {
    if (value !== lastValue && typeof value === "string") {
      editor.update(() => {
        const root = $getRoot();
        const currentText = root.getTextContent();

        // Only update if the current text is different from the new value
        if (currentText !== value) {
          root.clear();
          if (value) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(value));
            root.append(paragraph);
          }
        }
      });
      setLastValue(value);
    }
  }, [value, editor, lastValue]);

  return null;
}

// Add a new plugin to handle editor state restoration
// function EditorStatePlugin({ initialEditorState }) {
//   const [editor] = useLexicalComposerContext();
//   const [hasSetInitialState, setHasSetInitialState] = useState(false);

//   // useEffect(() => {
//   //   if (initialEditorState && !hasSetInitialState) {
//   //     editor.setEditorState(initialEditorState);
//   //     setHasSetInitialState(true);
//   //   }
//   // }, [initialEditorState, editor, hasSetInitialState]);

//   useEffect(() => {
//     if (initialEditorState && !hasSetInitialState) {
//       try {
//         // If initialEditorState is a string, parse it
//         const editorStateObj = typeof initialEditorState === 'string' 
//           ? JSON.parse(initialEditorState) 
//           : initialEditorState;
          
//         editor.update(() => {
//           // Create nodes from the parsed state
//           const root = $getRoot();
//           root.clear();
          
//           // Create a paragraph node
//           const paragraph = $createParagraphNode();
//           // Add the text content
//           paragraph.append(
//             $createTextNode(
//               editorStateObj.root?.children?.[0]?.children?.[0]?.text || "")
//           );
//           root.append(paragraph);
//         });
        
//         setHasSetInitialState(true);
//       } catch (error) {
//         console.error("Failed to set initial editor state:", error);
//       }
//     }
//   }, [initialEditorState, editor, hasSetInitialState]);

//   return null;
// }


function EditorStatePlugin({ initialEditorState }) {
  const [editor] = useLexicalComposerContext();
  const [hasSetInitialState, setHasSetInitialState] = useState(false);

  useEffect(() => {
    if (initialEditorState && !hasSetInitialState) {
      try {
        const editorState =
          typeof initialEditorState === "string"
            ? editor.parseEditorState(initialEditorState) // ✅ Convert JSON/string to Lexical EditorState
            : initialEditorState;

        editor.setEditorState(editorState); // ✅ Restore full state (formatting + structure)

        setHasSetInitialState(true);
      } catch (error) {
        console.error("Failed to set initial editor state:", error);
      }
    }
  }, [initialEditorState, editor, hasSetInitialState]);

  return null;
}


// Main Editor Component - ensure proper initial value handling
export default function LexicalEditor({
  showDescription = true,
  value = "",
  initialValue = "",
  initialEditorState = null, // Add this new prop
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
  const [editorContent, setEditorContent] = useState(value || initialValue);
  const [htmlContent, setHtmlContent] = useState("");
  const [plainTextContent, setPlainTextContent] = useState(
    value || initialValue
  );
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(!(value || initialValue));
  const [isFocused, setIsFocused] = useState(false);

  // Update local state when value prop changes
  useEffect(() => {
    if (typeof value === "string" && value !== plainTextContent) {
      setPlainTextContent(value);
    }
  }, [value, plainTextContent]);

  // Enhanced onChange handler
  // const handleEditorChange = useCallback(
  //   (editorState) => {
  //     editorState.read(() => {
  //       const root = $getRoot();
  //       const textContent = root.getTextContent();

  //       // Update state
  //       setPlainTextContent(textContent);
  //       setHtmlContent(textContent);
  //       setEditorContent(textContent);
  //       setIsEmpty(textContent.trim() === "");

  //       // Calculate counts
  //       const words = textContent.trim()
  //         ? textContent.trim().split(/\s+/).length
  //         : 0;
  //       const characters = textContent.length;
  //       setWordCount(words);
  //       setCharacterCount(characters);

  //       // Call parent onChange with comprehensive data
  //       if (onChange) {
  //         onChange({
  //           plainText: textContent,
  //           html: textContent, // You can enhance this to get actual HTML
  //           isEmpty: textContent.trim() === "",
  //           wordCount: words,
  //           characterCount: characters,
  //           editorState,
  //         });
  //       }
  //     });
  //   },
  //   [onChange]
  // );
  const handleEditorChange = useCallback(
  (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();

      // Update state
      setPlainTextContent(textContent);
      setHtmlContent(textContent);
      setEditorContent(textContent);
      setIsEmpty(textContent.trim() === ""); // Check if the editor is empty

      // Calculate counts
      const words = textContent.trim()
        ? textContent.trim().split(/\s+/).length
        : 0;
      const characters = textContent.length;
      setWordCount(words);
      setCharacterCount(characters);

      // Call parent onChange with comprehensive data
      if (onChange) {
        onChange({
          plainText: textContent,
          html: textContent, // You can enhance this to get actual HTML
          isEmpty: textContent.trim() === "", // Check if the editor is empty
          wordCount: words,
          characterCount: characters,
          editorState,
        });
      }
    });
  },
  [onChange]
);

  // Submit handler
  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit({
        plainText: plainTextContent,
        html: htmlContent,
        isEmpty: isEmpty,
        wordCount: wordCount,
        characterCount: characterCount,
      });
    }
  }, [
    onSubmit,
    plainTextContent,
    htmlContent,
    isEmpty,
    wordCount,
    characterCount,
  ]);

  // Focus handler
  const handleFocus = useCallback(
    (event) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus]
  );

  // Blur handler
  const handleBlur = useCallback(
    (event) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur]
  );

  // Key down handler
  const handleKeyDown = useCallback(
    (event) => {
      // Handle Ctrl+Enter or Cmd+Enter for submit
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        if (onSubmit) {
          handleSubmit();
        }
        return;
      }

      // Handle max length
      if (
        maxLength &&
        characterCount >= maxLength &&
        ![
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
        ].includes(event.key)
      ) {
        event.preventDefault();
        return;
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [onKeyDown, handleSubmit, maxLength, characterCount, onSubmit]
  );

  return (
    <>
      <style>{`
        .editor-container {
          background-color: #f5f5f5;
          height: ${height}px;
          max-height: ${height}px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          padding-right: ${hideSubmitButton ? "16px" : "80px"};
          font-size: 14px;
          line-height: 1.5;
          color: #333;
          outline: none;
          border: none;
          box-sizing: border-box;
          opacity: ${disabled ? 0.6 : 1};
          pointer-events: ${disabled ? "none" : "auto"};
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
          right: ${hideSubmitButton ? "16px" : "80px"};
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 1px",
          backgroundColor: "white",
        }}
      >
        
        {showDescription && (

          <Typography variant="body2" sx={{ color: "black", fontWeight: 500 }}>
            <MenuIcon sx={{ fontSize: 20, color: "#666", marginRight: 1 }} />
            Description
          </Typography>
        )}

        {maxLength && (
          <Typography
            variant="caption"
            sx={{
              marginLeft: "auto",
              color: characterCount >= maxLength ? "red" : "#999",
            }}
          >
            {characterCount}/{maxLength}
          </Typography>
        )}
      </Box>

      <Paper
        elevation={0}
        className={`${className || ""} ${isFocused ? "editor-focused" : ""}`}
        style={style}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          ...props,
        }}
      >
        <LexicalComposer initialConfig={editorConfig}>
          <Box
            className="editor-content-wrapper"
            sx={{
              backgroundColor: "#f5f5f5",
              position: "relative",
              height: `${height}px`,
              overflow: "hidden",
            }}
          >
            {/* Done Button */}
            {!hideSubmitButton && onSubmit && (
              <Box className="done-button-container">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleSubmit}
                  disabled={disabled || isEmpty}
                  sx={{
                    textTransform: "none",
                    color: "#666",
                    borderColor: "#ccc",
                    fontSize: "12px",
                    padding: "2px 12px",
                    backgroundColor: "white",
                    minHeight: "28px",
                    "&:hover": {
                      borderColor: "#999",
                      backgroundColor: "#f9f9f9",
                    },
                    "&:disabled": {
                      opacity: 0.5,
                    },
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
                    resize: "none",
                    height: `${height}px`,
                    maxHeight: `${height}px`,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              }
              placeholder={
                <div className="editor-placeholder">{placeholder}</div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            {autoFocus && <AutoFocusPlugin />}
            <OnChangePlugin onChange={handleEditorChange} />

            {/* Add the new plugin for editor state restoration */}
            <EditorStatePlugin initialEditorState={initialEditorState} />

            {/* Keep existing plugins but make them conditional */}
            {!initialEditorState && (
              <InitialContentPlugin initialContent={value || initialValue} />
            )}
            {!initialEditorState && <ValueSyncPlugin value={value} />}
          </Box>

          {/* Toolbar */}
          <ToolbarPlugin onSubmit={onSubmit ? handleSubmit : undefined} />
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
      return root.getTextContent().trim() === "";
    });
  },

  // Get word count
  getWordCount: (editorState) => {
    return editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent().trim();
      return text ? text.split(/\s+/).length : 0;
    });
  },
};
