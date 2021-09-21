export default async function ({ addon, global, console }) {
  const ScratchBlocks = await addon.tab.traps.getBlockly();
  const originalStartDraggingBlock = ScratchBlocks.Gesture.prototype.startDraggingBlock_;
  // https://github.com/LLK/scratch-blocks/blob/e86f115457006d1cde83baa23eaaf1ee16d315f5/core/gesture.js#L454
  ScratchBlocks.Gesture.prototype.startDraggingBlock_ = function (...args) {
    if (this.mostRecentEvent_.shiftKey && !addon.self.disabled) {
      // Scratch will reset the group on its own when the drag ends
      ScratchBlocks.Events.setGroup(true);
      this.shouldDuplicateOnDrag_ = true;
    }
    return originalStartDraggingBlock.call(this, ...args);
  };
  // https://github.com/LLK/scratch-blocks/blob/e86f115457006d1cde83baa23eaaf1ee16d315f5/core/gesture.js#L983
  const originalDuplicateOnDrag = ScratchBlocks.Gesture.prototype.duplicateOnDrag_;
  ScratchBlocks.Gesture.prototype.duplicateOnDrag_ = function (...args) {
    const ret = originalDuplicateOnDrag.call(this, ...args);
    if ((this.mostRecentEvent_.ctrlKey || this.mostRecentEvent_.metaKey) && !addon.self.disabled) {
      const block = this.targetBlock_;
      const nextBlock = block.getNextBlock();
      if (nextBlock) {
        nextBlock.dispose();
      }
    }
    return ret;
  };
}
