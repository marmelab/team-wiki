import React, { forwardRef, useEffect, useRef } from "react";
import { MarkdownInput, MarkdownInputProps } from "@react-admin/ra-markdown";
import { Editor } from "@react-admin/ra-markdown/lib/src/toast-ui";
import {
  DefaultContent,
  SearchResultDataItem,
  SearchResultsPanel,
  SearchWithResult,
} from "@react-admin/ra-search";
import {
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from "@mui/material";

import "./PageMarkdownInput.css";

function PageSearchResultItem<
  RecordType extends DefaultContent = DefaultContent,
>({
  data,
  onClick,
  onItemClick,
  ...props
}: {
  data?: SearchResultDataItem<RecordType>;
  onItemClick?: (data: SearchResultDataItem<RecordType>) => void;
} & ListItemButtonProps) {
  return (
    <ListItem>
      <ListItemButton
        onClick={(event) => {
          onClick?.(event);
          onItemClick?.(data!);
        }}
        {...props}
      >
        <ListItemText
          className="highlight"
          primary={data?.content?.label}
          secondary={data?.content?.description}
        />
      </ListItemButton>
    </ListItem>
  );
}

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
          <SearchWithResult
            options={{ targets: ["pages"] }}
            sx={{
              ["& .MuiFilledInput-root"]: {
                padding: "0.5em",
                ["& input.MuiFilledInput-input"]: {
                  border: "none",
                  ["&:focus"]: {
                    outline: "none",
                  },
                },
              },
            }}
          >
            <SearchResultsPanel>
              <PageSearchResultItem
                onItemClick={({ url, content: { label } }) => {
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
                    .insertText(`[${label}](#${url})\n`);

                  if (!markdownMode)
                    editorRef.current!.getInstance().changeMode("wysiwyg");

                  editorRef
                    .current!.getInstance()
                    .eventEmitter.emit("closePopup");
                }}
              />
            </SearchResultsPanel>
          </SearchWithResult>
        </div>
      </>
    );
  },
);
