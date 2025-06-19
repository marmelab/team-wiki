import React, { forwardRef, useEffect, useRef } from "react";
import { MarkdownInput, MarkdownInputProps } from "@react-admin/ra-markdown";
import { Editor } from "@react-admin/ra-markdown/lib/src/toast-ui";

import "./PageMarkdownInput.css";

export const PageMarkdownInput = forwardRef<Editor, MarkdownInputProps>(
  ({ source, ...props }, outerRef) => {
    // Get a local reference to the editor to use its API.
    const editorRef = useRef<Editor>(null);
    React.useImperativeHandle(outerRef, () => editorRef.current!, []);

    const pagePopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const editor = editorRef.current;
      if (editor) {
        editor.getInstance().insertToolbarItem(
          { groupIndex: 3, itemIndex: 3 },
          {
            name: "page-link",
            tooltip: "Insert link to a page",
            text: "#",
            popup: {
              body: pagePopupRef.current!,
            },
            className: "toastui-editor-toolbar-icons reference",
            style: { backgroundImage: "none" },
          },
        );
      }
    }, [editorRef]);

    return (
      <>
        <MarkdownInput ref={editorRef} source={source} {...props} />

        <div className="page-reference-popup" ref={pagePopupRef}>
          <label>
            Search
            <input type="search" />
          </label>

          <button
            type="button"
            onClick={() => {
              // To insert raw markdown in wysiwyg mode,
              // we change to markdown mode to insert the text,
              // then instantly go back to wysiwyg.
              const markdownMode = editorRef
                .current!.getInstance()
                .isMarkdownMode();

              if (!markdownMode)
                editorRef.current!.getInstance().changeMode("markdown");

              editorRef
                .current!.getInstance()
                .insertText("[Page Title](/#/pages/1/show)");

              if (!markdownMode)
                editorRef.current!.getInstance().changeMode("wysiwyg");
            }}
          >
            Insert
          </button>
        </div>
      </>
    );
  },
);
