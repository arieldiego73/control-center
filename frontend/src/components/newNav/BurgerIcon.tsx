import * as React from 'react';

const BurgerIconHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #checkbox {
        display: none;
      }

      .toggle {
        position: relative;
        width: 40px;
        cursor: pointer;
        margin: auto;
        display: block;
        height: calc(4px * 3 + 11px * 2);
      }

      .bar {
        position: absolute;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: calc(4px / 2);
        background: blue;
        color: white;
        opacity: 1;
        transition: none 0.35s cubic-bezier(0.5, -0.35, 0.35, 1.5) 0s;
      }

      /***** Spin Animation *****/

      .bar--top {
        bottom: calc(50% + 11px + 4px / 2);
        transition-property: bottom, transform;
        transition-delay: calc(0s + 0.35s), 0s;
      }

      .bar--middle {
        top: calc(50% - 4px / 2);
        transition-property: opacity;
        transition-delay: calc(0s + 0.35s);
      }

      .bar--bottom {
        top: calc(50% + 11px + 4px / 2);
        transition-property: top, transform;
        transition-delay: calc(0s + 0.35s), 0s;
      }

      #checkbox:checked + .toggle .bar--top {
        bottom: calc(50% - 4px / 2);
        transform: rotate(135deg);
        transition-delay: 0s, calc(0s + 0.35s);
      }

      #checkbox:checked + .toggle .bar--middle {
        opacity: 0;
        transition-duration: 0s;
        transition-delay: calc(0s + 0.35s);
      }

      #checkbox:checked + .toggle .bar--bottom {
        top: calc(50% - 4px / 2);
        transform: rotate(225deg);
        transition-delay: 0s, calc(0s + 0.35s);
      }
    </style>
  </head>
  <body>
    <input type="checkbox" id="checkbox" />
    <label for="checkbox" class="toggle">
      <div class="bar bar--top"></div>
      <div class="bar bar--middle"></div>
      <div class="bar bar--bottom"></div>
    </label>

    <script>
      const checkbox = document.getElementById('checkbox');
      const toggle = document.querySelector('.toggle');

      document.addEventListener('click', (event) => {
        if (
          event.target !== checkbox &&
          event.target !== toggle &&
          !toggle.contains(event.target)
        ) {
          checkbox.checked = false;
        }
      });
    </script>
  </body>
</html>
`;

export default function BurgerIcon() {
  return (
    <div dangerouslySetInnerHTML={{ __html: BurgerIconHtml }} />
  );
}
