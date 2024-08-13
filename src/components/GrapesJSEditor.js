import React, { useEffect, useRef } from "react";
import gjsPluginBasics from "grapesjs-blocks-basic";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsPluginCKEditor from "grapesjs-plugin-ckeditor";
import gjsPluginForms from "grapesjs-plugin-forms";

const GrapesJSEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // if (!editorRef.current) {
    editorRef.current = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "auto",
      storageManager: false,
      plugins: [
        gjsPluginCKEditor,
        gjsPluginBasics,
        gjsPluginForms,
        gjsPresetWebpage,
      ],
      pluginsOpts: {
        gjsPresetWebpage: {
          blocks: [],
        },
        gjsPluginCKEditor: {
          position: "left",
          toolbar: {
            items: [
              "heading",
              "fontColor",
              "fontSize",
              "fontFamily",
              "fontBackgroundColor",
              "alignment",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "link",
              "bulletedList",
              "numberedList",
              "horizontalLine",
              "undo",
              "redo",
            ],
          },
          language: "en",
        },
        gjsPluginBasics: {
          blocks: ["text", "image", "button"],
        },
        gjsPluginForms: {
          blocks: ["button"],
        },
      },
    });
    // }
    editorRef.current.BlockManager.add("image-block", {
      label: "Image",
      content: '<img src="" alt="image" class="img-block" />',
      category: "Media",
    });
    editorRef.current.BlockManager.add("text-block", {
      label: "Text Block",
      content: `
        <div class="text-block">
          <p>This is an editable text block. You can change this text.</p>
        </div>
      `,
      category: "Basic",
      attributes: { class: "gjs-block-section" },
    });
    editorRef.current.BlockManager.add("button-block", {
      label: "Button",
      content: '<button class="button-component">Click Me</button>',
      category: "Basic",
      attributes: { class: "gjs-fonts gjs-f-button" },
    });

    editorRef.current.DomComponents.addType("button-component", {
      isComponent: (el) => el.tagName === "BUTTON",
      model: {
        defaults: {
          tagName: "button",
          draggable: true,
          droppable: true,
          editable: true,
          highlightable: true,
          stylable: true,
          components: "Click Me",
          traits: [
            {
              type: "text",
              label: "Text",
              name: "text",
              changeProp: 1,
            },
          ],
        },

        init() {
          this.listenTo(this, "change:text", this.handleTextChange);
        },

        handleTextChange() {
          const newText = this.get("text");
          this.components(newText);
        },
      },

      view: {
        onRender() {
          const comps = this.model.get("components");
          this.$el.html(comps.length ? comps.at(0).get("content") : "Click Me");
        },
      },
    });

    editorRef.current.addComponents(`
      <style>
      .img-block {
          width: 100%;
          height: auto;
        }
        .text-block p {
          color: #666;
          font-size: 16px;
        }
        .button-component {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
        }
        .button-component:hover {
          background-color: #0056b3;
        }
      </style>
    `);
  }, []);

  return <div id="gjs" style={{ height: "100vh", width: "100%" }} />;
};

export default GrapesJSEditor;
