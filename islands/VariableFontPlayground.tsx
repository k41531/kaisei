import { useState } from "preact/hooks";

export default function VariableFontPlayground() {
  const [weight, setWeight] = useState(300);
  const [opsz, setOpsz] = useState(16);
  const [size, setSize] = useState(48);

  return (
    <>
      <h2 class="text-xl">Font</h2>
      <span class="text-3xl">Source Serif 4</span>

      <h2 class="text-xl mt-6">Optical Sizing</h2>
      <div class="flex gap-4 items-end">
        <span>
          fontOpticalSizing:<br />none
        </span>
        <p
          class="text-6xl"
          style={{
            fontSize: size,
            fontOpticalSizing: "none",
            fontVariationSettings: `"wght" ${weight}`,
          }}
        >
          Variable
        </p>
      </div>
      <div class="flex gap-4 items-end">
        <span>
          fontOpticalSizing:<br />auto
        </span>
        <p
          class="text-6xl"
          style={{
            fontSize: size,
            fontOpticalSizing: "auto",
            fontVariationSettings: `"wght" ${weight}`,
          }}
        >
          Variable
        </p>
      </div>
      <div class="flex gap-4 items-end">
        <span>
          fontOpticalSizing:
          <div>{opsz}</div>
          <input
            id="opsz"
            type="range"
            min="8"
            max="144"
            value={opsz}
            onInput={(e) =>
              setOpsz((e.target as HTMLInputElement).valueAsNumber)}
          />
        </span>
        <p
          class="text-6xl"
          style={{
            fontSize: size,
            fontVariationSettings: `"opsz" ${opsz}, "wght" ${weight}`,
          }}
        >
          Variable
        </p>
      </div>

      <label for="weight">Font Weight {weight}</label>
      <input
        id="weight"
        type="range"
        min="100"
        max="900"
        step="100"
        value={weight}
        onInput={(e) => setWeight((e.target as HTMLInputElement).valueAsNumber)}
      />

      <label for="size">Font Size {size}</label>
      <input
        id="size"
        type="range"
        min="8"
        max="100"
        value={size}
        onInput={(e) => setSize((e.target as HTMLInputElement).valueAsNumber)}
      />

      <h2 class="text-xl mt-6">Other Variation Axis</h2>
      <p>
        There are two types of variation axes in variable fonts: registered axes
        and custom axes. Registered axes include five variations:{" "}
        <code>wght</code>, <code>wdth</code>, <code>opsz</code>,{" "}
        <code>ital</code>, and{" "}
        <code>slnt</code>, while custom axes are defined by the font designer.
      </p>
      <p>
        Source Serif 4 has 2 variations <b>Optical Sizing(opsz)</b> and{" "}
        <b>Wight(wght)</b>
      </p>
      <div>
        <h6>References</h6>
        <ul>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide">
              Variable fonts guide - CSS: Cascading Style Sheets | MDN
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
