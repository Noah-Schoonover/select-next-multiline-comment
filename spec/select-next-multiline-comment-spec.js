'use babel';

import SelectNextMultilineComment from '../lib/select-next-multiline-comment';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('SelectNextMultilineComment', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('select-next-multiline-comment');
  });

  describe('when the select-next-multiline-comment:next event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.select-next-multiline-comment')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'select-next-multiline-comment:next');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.select-next-multiline-comment')).toExist();

        let selectNextMultilineCommentElement = workspaceElement.querySelector('.select-next-multiline-comment');
        expect(selectNextMultilineCommentElement).toExist();

        let selectNextMultilineCommentPanel = atom.workspace.panelForItem(selectNextMultilineCommentElement);
        expect(selectNextMultilineCommentPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'select-next-multiline-comment:next');
        expect(selectNextMultilineCommentPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.select-next-multiline-comment')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'select-next-multiline-comment:next');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let selectNextMultilineCommentElement = workspaceElement.querySelector('.select-next-multiline-comment');
        expect(selectNextMultilineCommentElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'select-next-multiline-comment:next');
        expect(selectNextMultilineCommentElement).not.toBeVisible();
      });
    });
  });
});
