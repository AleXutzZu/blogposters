"use client";

import type {ForwardedRef} from 'react';
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CreateLink,
    linkDialogPlugin,
    InsertTable, tablePlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

// Only import this to the next file
export default function InitializedMDXEditor({
                                                 editorRef,
                                                 ...props
                                             }: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            plugins={[
                // Example Plugin Usage
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                linkDialogPlugin(),
                tablePlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo/>
                            <BoldItalicUnderlineToggles/>
                            <ListsToggle/>
                            <CreateLink/>
                            <InsertTable/>
                        </>)
                })
            ]}
            {...props}
            ref={editorRef}
        />
    )
}
