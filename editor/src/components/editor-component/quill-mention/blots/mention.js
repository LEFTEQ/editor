import Quill from 'quill';

const Embed = Quill.import('blots/embed');


class MentionBlot extends Embed {
  static create(data) {
    console.log(data);

    const node = super.create();
    const denotationChar = document.createElement('span');
    denotationChar.className = 'ql-mention-denotation-char';
    denotationChar.innerHTML = data.denotationChar;
    node.appendChild(denotationChar);
    node.innerHTML += data.value;
    node.dataset.id = data.id;
    node.dataset.value = data.value;
    node.dataset.denotationChar = data.denotationChar;
    return node;
  }

  static value(domNode) {
    return {
      id: domNode.dataset.id,
      value: domNode.dataset.value,
      denotationChar: domNode.dataset.denotationChar,
    };
  }
}

MentionBlot.blotName = 'mention';
MentionBlot.tagName = 'span';
MentionBlot.className = 'mention';

Quill.register(MentionBlot);
