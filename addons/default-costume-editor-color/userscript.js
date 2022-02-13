export default async function ({ addon, global, console, msg }) {
  // We don"t *need* to wait for the costume editor to be opened, but redux updates take a non-zero
  // amount of CPU time so let's delay that for as long as possible.
  await addon.tab.traps.getPaper();

  if (!("colorIndex" in addon.tab.redux.state.scratchPaint.fillMode)) {
    console.error("Detected new paint editor; this will be supported in future versions.");
    return;
  }

  // Scratch rejects colors that contain transparency
  const parseColor = (color) => color.substring(0, 7);

  // Special value Scratch uses as color when objects with different colors are selected
  // https://github.com/LLK/scratch-paint/blob/6733e20b56f52d139f9885952a57c7da012a542f/src/helper/style-path.js#L10
  const MIXED = "scratch-paint/style-path/mixed";

  const applyFillColor = () => {
    if (addon.self.disabled) return;
    addon.tab.redux.dispatch({
      type: "scratch-paint/fill-style/CHANGE_FILL_COLOR",
      color: parseColor(addon.settings.get("fill"))
    });
  };
  const applyStrokeColor = () => {
    if (addon.self.disabled) return;
    addon.tab.redux.dispatch({
      type: "scratch-paint/stroke-style/CHANGE_STROKE_COLOR",
      color: parseColor(addon.settings.get("stroke"))
    });
  };
  const applyAll = () => {
    if (addon.self.disabled) return;
    applyFillColor();
    applyStrokeColor();
    addon.tab.redux.dispatch({
      type: "scratch-paint/stroke-width/CHANGE_STROKE_WIDTH",
      strokeWidth: addon.settings.get("strokeSize")
    });
  };

  applyAll();

  addon.tab.redux.initialize();
  addon.tab.redux.addEventListener("statechanged", ({detail}) => {
    const action = detail.action;
    if (action.type === "scratch-paint/modes/CHANGE_MODE") {
      // Activating certain tools can cause the selected colors to change from transparent or MIXED to the default colors.
      // Example: https://github.com/LLK/scratch-paint/blob/6733e20b56f52d139f9885952a57c7da012a542f/src/containers/bit-brush-mode.jsx#L55-L59
      // We have to do this weird redux trick because we can't modify these constants:
      // https://github.com/LLK/scratch-paint/blob/6733e20b56f52d139f9885952a57c7da012a542f/src/reducers/fill-style.js#L7
      // https://github.com/LLK/scratch-paint/blob/6733e20b56f52d139f9885952a57c7da012a542f/src/reducers/stroke-style.js#L7
      const initialFillColor = addon.tab.redux.state.scratchPaint.color.fillColor.primary;
      const initialStrokeColor = addon.tab.redux.state.scratchPaint.color.strokeColor.primary;
      const fillColorMightChange = !initialFillColor || initialFillColor === MIXED;
      const strokeColorMightChange = !initialStrokeColor || initialStrokeColor === MIXED;
      if (fillColorMightChange || strokeColorMightChange) {
        queueMicrotask(() => {
          if (fillColorMightChange) {
            const finalFillColor = addon.tab.redux.state.scratchPaint.color.fillColor.primary;
            if (finalFillColor === "#9966FF") {
              applyFillColor();
            }
          }
          if (strokeColorMightChange) {
            const finalStrokeColor = addon.tab.redux.state.scratchPaint.color.strokeColor.primary;
            if (finalStrokeColor === "#000000") {
              applyStrokeColor();
            }
          }
        });
      }
    }
  });
}
