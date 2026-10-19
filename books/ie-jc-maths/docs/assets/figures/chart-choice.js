// One set of data drawn three ways, so the reader can see which chart answers which
// question.
//
// Section 22.4 gives a frequency table, a bar chart, a line plot and a histogram, and
// the difference between them is the question each one answers: every value, the count
// at each value, or the count in each class. Prose states that and a table lists it.
// The figure lets the reader draw the same twenty sleep answers as each chart in turn,
// and the readout names the question that chart answers. The touching bars of the
// histogram and the gaps of the bar chart are visible side by side.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import {
  axes,
  chooser,
  fmt,
  label,
  line,
  panel,
  quantity,
  react,
  rect,
  SIZE,
} from "./kit.js";

// The twenty sleep answers from the chapter problem, as a frequency table.
const HOURS = [5, 6, 7, 8, 9, 10];
const FREQUENCY = [3, 3, 4, 5, 3, 2];

// The same answers grouped into three classes, for the histogram.
const CLASSES = [
  { from: 5, to: 7, frequency: 6 },
  { from: 7, to: 9, frequency: 9 },
  { from: 9, to: 11, frequency: 5 },
];

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The same sleep data drawn as a bar chart, a line plot or a histogram",
    description:
      "A grid with the number of hours slept along the bottom and a frequency up the side. " +
      "The same twenty answers are drawn as a bar chart with gaps between the bars, as a " +
      "line plot with one cross for each student, or as a histogram whose bars touch. The " +
      "chart is chosen with the control below.",
    prompt: "Predict whether the bars of a histogram touch each other. Then choose the histogram and check.",
    width: 560,
    height: 320,
  });

  const chart = chooser(el, {
    id: "chart",
    label: "Chart",
    name: "The chart to draw the sleep data as",
    choices: [
      { value: "bar", label: "bar chart" },
      { value: "line", label: "line plot" },
      { value: "hist", label: "histogram" },
    ],
    value: "bar",
  });

  function update() {
    const kind = chart.value;
    const histogram = kind === "hist";

    const { draw, x, y } = axes({
      width: 560,
      height: 320,
      pad: { left: 52, right: 22, top: 26, bottom: 48 },
      x: histogram
        ? { domain: [5, 11], ticks: 7, label: "hours" }
        : { domain: [4.5, 10.5], ticks: 7, label: "hours" },
      y: histogram ? { domain: [0, 10], ticks: 6 } : { domain: [0, 6], ticks: 7 },
    });

    let drawing = draw;

    if (histogram) {
      for (const item of CLASSES) {
        const left = x(item.from);
        const width = x(item.to) - left;
        const height = y(0) - y(item.frequency);
        drawing += rect({ x: left, y: y(item.frequency), width, height, class: "fig-accent", opacity: 0.4 });
        drawing += rect({ x: left, y: y(item.frequency), width, height, class: "fig-ink", opacity: 0.35 });
        drawing += label({
          x: left + width / 2,
          y: y(item.frequency) - 8,
          text: fmt(item.frequency, 0),
          size: SIZE.tick,
          class: "text-ink",
        });
      }
    } else {
      for (let i = 0; i < HOURS.length; i += 1) {
        const left = x(HOURS[i] - 0.35);
        const width = x(HOURS[i] + 0.35) - left;
        if (kind === "bar") {
          const height = y(0) - y(FREQUENCY[i]);
          drawing += rect({ x: left, y: y(FREQUENCY[i]), width, height, class: "fig-accent", opacity: 0.4 });
          drawing += rect({ x: left, y: y(FREQUENCY[i]), width, height, class: "fig-ink", opacity: 0.35 });
          drawing += label({
            x: x(HOURS[i]),
            y: y(FREQUENCY[i]) - 8,
            text: fmt(FREQUENCY[i], 0),
            size: SIZE.tick,
            class: "text-ink",
          });
        } else {
          // A line plot stacks one cross for each student, so the height of the
          // stack is the frequency.
          for (let j = 0; j < FREQUENCY[i]; j += 1) {
            const cx = x(HOURS[i]);
            const cy = y(j + 1);
            drawing += line({ x1: cx - 6, y1: cy - 6, x2: cx + 6, y2: cy + 6, class: "fig-accent", width: 2 });
            drawing += line({ x1: cx - 6, y1: cy + 6, x2: cx + 6, y2: cy - 6, class: "fig-accent", width: 2 });
          }
        }
      }
    }

    svg.innerHTML = drawing;

    if (kind === "bar") {
      readout.textContent =
        `A bar chart gives each number of hours its own bar, with a gap between the bars because the values are separate. ` +
        `The tallest bar is at ${quantity(8, "hours", 0)}, where ${fmt(5, 0)} students slept. ` +
        `A bar chart answers how many students chose each value.`;
    } else if (kind === "line") {
      readout.textContent =
        `A line plot puts one cross above a value for every student, so all ${fmt(20, 0)} answers are visible. ` +
        `The value ${quantity(8, "hours", 0)} has ${fmt(5, 0)} crosses, so ${fmt(5, 0)} students slept for eight hours. ` +
        `A line plot answers which values appeared, and how often.`;
    } else {
      readout.textContent =
        `A histogram groups the hours into class intervals, and the bars touch because the classes join up. ` +
        `The class ${fmt(7, 0)} to ${quantity(9, "hours", 0)} holds ${fmt(9, 0)} students, which is the tallest bar. ` +
        `A histogram answers how many students fall in each class.`;
    }
  }

  react(chart, update);
}
