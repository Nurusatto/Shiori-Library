import { SVGProps } from "react";

export const ShioriLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      preserveAspectRatio="xMidYMid meet"
      style={{
        height: "40px",
        width: "40px",
        display: "block",
        ...props.style,
      }}
      {...props}
    >
      <defs>
        {/* Зашиваем чистый CSS с !important прямо внутрь SVG. */}
        <style>{`
          .shiori-book {
            fill: none !important;
            stroke: #FFFFFF !important; /* Тёмный цвет для белого фона */
          }
          .shiori-bookmark-line {
            fill: none !important;
            stroke: #FF7043 !important;
          }
          .shiori-bookmark-body {
            fill: #FF7043 !important;
            stroke: none !important;
          }
          .shiori-chevron {
            fill: none !important;
            stroke: #FFFFFF !important;
          }
        `}</style>
      </defs>

      <g transform="translate(10, 10)">
        {/* Контур книги */}
        <path
          d="M 70 140 C 40 140, 10 130, 0 125 L 0 15 C 10 20, 40 30, 70 30 C 100 30, 130 20, 140 15 L 140 125 C 130 130, 100 140, 70 140 Z"
          className="shiori-book"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Центральный разделитель */}
        <line
          x1="70"
          y1="30"
          x2="70"
          y2="140"
          className="shiori-book"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Элементы закладки */}
        <g>
          {/* Веревочка */}
          <path
            d="M 70 15 C 70 -10, 110 -10, 110 25"
            className="shiori-bookmark-line"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Тело закладки */}
          <path
            d="M 95 25 L 125 25 L 125 145 C 125 145, 110 135, 110 135 C 110 135, 95 145, 95 145 L 95 25 Z"
            className="shiori-bookmark-body"
          />

          {/* Узор Шеврон */}
          <path
            d="M 102 45 L 110 52 L 118 45 M 102 65 L 110 72 L 118 65 M 102 85 L 110 92 L 118 85 M 102 105 L 110 112 L 118 105"
            className="shiori-chevron"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
