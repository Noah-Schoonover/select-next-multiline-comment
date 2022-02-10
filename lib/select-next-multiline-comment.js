'use babel';

import SelectNextMultilineCommentView from './select-next-multiline-comment-view';
import { CompositeDisposable } from 'atom';

export default {

  selectNextMultilineCommentView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.selectNextMultilineCommentView = new SelectNextMultilineCommentView(state.selectNextMultilineCommentViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.selectNextMultilineCommentView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'select-next-multiline-comment:next': () => this.next()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.selectNextMultilineCommentView.destroy();
  },

  serialize() {
    return {
      selectNextMultilineCommentViewState: this.selectNextMultilineCommentView.serialize()
    };
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
