import { Component, Prop, Element } from '@stencil/core';
import highlight from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import Quill from 'quill';
import Mention from './quill-mention/quill.mention';
import Prism from 'prismjs';

@Component({
  tag: 'editor-component',
  styleUrl: 'editor-component.scss',
  shadow: false
})
export class EditorComponent {
  @Element() editor: HTMLElement;
  @Prop() first: string;
  @Prop() last: string;
  baValues = [
    { id: 1, value: 'Fredrik Sundqvist' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  caValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]
  constructor() {
    highlight.registerLanguage('javascript', javascript);
    highlight.configure({
      languages: ['javascript']
    });


  }
  componentDidLoad() {

    const mention = Mention;



    const quill = new Quill(this.editor.querySelector("#editor"), {
      modules: {
        toolbar: [['code-block']],
        // syntax: {
        //   highlight: text => highlight.highlightAuto(text).value
        // },
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["ba.", "ca."],
          container: this.editor.querySelector("#editor-wrapper"),
          source: (searchTerm, renderList, mentionChar) => {
            let values;

            if (mentionChar === "ba.") {
              values = this.baValues;
              console.log("thisvalus", values);

            } else if (mentionChar === "ca.") {
              values = this.caValues;
            } else {

            }

            if (searchTerm.length === 0) {
              renderList(values, searchTerm);
            } else {
              const matches = [];
              for (let i = 0; i < values.length; i++)
                if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
              renderList(matches, searchTerm);
            }
          },
        },
      },
      theme: 'snow'
    });

    const ql = document.querySelector(".ql-editor p");
    quill.on("text-change", (delta, oldContents, source) => {
      Prism.highlightElement(ql);
      // return false;
    })


  }

  render() {
    return (
      <div id="editor-wrapper">
        <div id="toolbar">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
        </div>
        <div id="editor"></div>
      </div>

    );
  }
}
