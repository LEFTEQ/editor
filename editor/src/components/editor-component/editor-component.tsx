import { Component, Prop, Element } from '@stencil/core';
import Quill from 'quill';
import Mention from './quill-mention/src/quill.mention';
@Component({
  tag: 'editor-component',
  styleUrl: 'editor-component.scss',
  shadow: true
})
export class EditorComponent {
  @Element() editor: HTMLElement;
  @Prop() first: string;
  @Prop() last: string;
  atValues = [
    { id: 1, value: 'Fredrik Sundqvist' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]
  constructor() {


  }
  componentDidLoad() {
    console.log("fff", Mention);

    new Quill(this.editor.shadowRoot.querySelector("#editor"), {
      modules: {
        toolbar: this.editor.shadowRoot.querySelector("#toolbar"),
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["ba.", "#"],
          container: this.editor.shadowRoot.querySelector("#editor-wrapper"),
          source: (searchTerm, renderList, mentionChar) => {
            let values;

            if (mentionChar === "ba.") {
              values = this.atValues;
              console.log("thisvalus", values);

            } else {
              values = this.hashValues;
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
