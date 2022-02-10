'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'select-next-multiline-comment:next': () => this.next()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    
  },

  next() {

    const editor = atom.workspace.getActiveTextEditor();
    const buffer = editor.getBuffer();

    var doSelect = function(match) {    /*    hello      */
      editor.setCursorBufferPosition(match.range.start);
      editor.selectToBufferPosition(match.range.end);
    };

    let re = /\/\*.*?\*\//g
    const curpos = editor.getCursorBufferPosition();
    const endpos = buffer.getEndPosition();
    buffer.scanInRange(re, [curpos, endpos], doSelect);

  }

};
