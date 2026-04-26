import React from 'react';
import Svg, { Path, G, Rect, Circle } from 'react-native-svg';

const T = {
  bg: "rgb(248,248,250)",
  ink: "rgb(21,22,24)",
  inkDim: "rgb(187,187,188)",
  inkMuted: "rgb(119,119,119)",
  divider: "rgba(0,0,0,0.04)",
  navBg: "rgba(255,255,255,0.8)",
  navBorder: "rgba(0,0,0,0.08)",
  cashBg: "rgb(210,221,227)",
  cardBg: "rgb(227,210,215)",
  physical: "rgb(34,138,78)",
  digital: "rgb(38,111,242)",
  blue: "rgb(72,103,246)",
  verified: "rgb(38,111,242)",
  green: "rgb(0,202,72)",
  amber: "rgb(255,187,38)",
  red: "rgb(255,62,0)",
};

export const Theme = T;

const INACTIVE = "rgba(21,22,24,0.35)";

export const Icon = ({ d, size = 24, stroke = "currentColor", fill = "none", strokeWidth = 2, children }: any) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {d ? <Path d={d} /> : children}
  </Svg>
);

export const icons = {
  home: (focused?: boolean) => focused
    ? <Icon fill={T.ink} stroke="none" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/>
    : <Icon stroke={INACTIVE} fill="none" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/>,
  stack: (focused?: boolean) => <Icon fill={focused ? T.ink : "none"} stroke={focused ? T.ink : INACTIVE}>
    <G>
      <Rect x="3" y="3" width="8" height="8" rx="2"/>
      <Rect x="13" y="3" width="8" height="8" rx="2"/>
      <Rect x="3" y="13" width="8" height="8" rx="2"/>
      <Path d="M17 13v8M13 17h8"/>
    </G>
  </Icon>,
  receipt: (focused?: boolean) => <Icon stroke={focused ? T.ink : INACTIVE}>
    <G>
      <Path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z"/>
      <Path d="M9 8h6M9 12h6M9 16h4"/>
    </G>
  </Icon>,
  store: (focused?: boolean) => focused
    ? <Icon fill={T.ink} stroke="none" d="M4 6h16l-1 4a3 3 0 0 1-6 0 3 3 0 0 1-6 0L4 6zm1 6.5V21h14v-8.5a4 4 0 0 1-2 .5 4 4 0 0 1-5-2 4 4 0 0 1-5 2 4 4 0 0 1-2-.5z"/>
    : <Icon stroke={INACTIVE}>
    <G>
      <Path d="M4 6h16l-1 4a3 3 0 0 1-6 0 3 3 0 0 1-6 0L4 6z"/>
      <Path d="M5 10v11h14V10"/>
    </G>
  </Icon>,
  gear: (focused?: boolean) => <Icon stroke={focused ? T.ink : INACTIVE}>
    <G>
      <Circle cx="12" cy="12" r="3"/>
      <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </G>
  </Icon>,
  plus: () => <Icon stroke={T.ink} d="M12 5v14M5 12h14"/>,
  share: () => <Icon stroke={T.ink}>
    <G>
      <Path d="M12 3v12"/>
      <Path d="M8 7l4-4 4 4"/>
      <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>
    </G>
  </Icon>,
  magicWand: () => <Icon stroke={T.ink}>
    <G>
      <Path d="M15 4V2M15 10V8M10 7h2M18 7h2M14 13l7 7M4 20l8-8"/>
      <Path d="M3 4l1.5 1.5L3 7l-1.5-1.5zM9 4l1.5 1.5L9 7l-1.5-1.5z"/>
    </G>
  </Icon>,
  verified: () => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill={T.verified}>
      <Path d="M12 1l2.5 2.1 3.3-.5.8 3.2 2.8 1.9-1.5 3 .1 3.3-3 1.5-1.9 2.8-3.2-.8-3.3.5L5.6 19l-1.5-3-2.8-1.9 1.5-3-.1-3.3 3-1.5L7.6 3.5l3.2.8z"/>
      <Path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  ),
  shape: (color?: string) => (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.3">
      <Rect x="0.75" y="0.75" width="4" height="4" rx="0.8"/>
      <Circle cx="9" cy="3" r="2.25"/>
      <Path d="M5.25 7.25l1.8 3.1h-3.6z"/>
      <Path d="M7.5 7.5l3 3M10.5 7.5l-3 3"/>
    </Svg>
  ),
  cash: () => <Icon fill={T.ink} stroke="none">
    <G>
      <Rect x="2" y="6" width="20" height="12" rx="2.5"/>
      <Circle cx="12" cy="12" r="3" fill="#fff"/>
      <Rect x="4" y="8" width="1.5" height="8" fill="#fff" rx="0.6"/>
    </G>
  </Icon>,
  card: () => <Icon fill={T.ink} stroke="none">
    <G>
      <Rect x="2" y="5" width="20" height="14" rx="2.5"/>
      <Rect x="2" y="8.5" width="20" height="2.5" fill="#fff" opacity="0.9"/>
      <Rect x="5" y="14" width="5" height="1.5" rx="0.5" fill="#fff"/>
    </G>
  </Icon>,
  chevronRight: () => <Icon stroke={T.inkDim} d="M9 6l6 6-6 6"/>,
  chevronDown: () => <Icon stroke={T.inkDim} d="M6 9l6 6 6-6"/>,
  bell: () => <Icon stroke={T.ink}>
    <G>
      <Path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16z"/>
      <Path d="M10 21a2 2 0 0 0 4 0"/>
    </G>
  </Icon>,
  search: () => <Icon stroke={T.ink}>
    <G>
      <Circle cx="11" cy="11" r="7"/>
      <Path d="M20 20l-3.5-3.5"/>
    </G>
  </Icon>,
  live: () => <Icon fill="none" stroke="#fff" strokeWidth={1.4}>
    <G>
      <Circle cx="12" cy="12" r="3" fill="#fff" stroke="none"/>
      <Path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"/>
    </G>
  </Icon>,
  calendar: () => <Icon stroke={T.ink}>
    <G>
      <Rect x="3" y="5" width="18" height="16" rx="2"/>
      <Path d="M3 10h18M8 3v4M16 3v4"/>
    </G>
  </Icon>,
  filter: () => <Icon stroke={T.ink} d="M4 5h16l-6 8v5l-4 2v-7z"/>,
  dots: () => <Icon stroke="none">
    <G>
      <Circle cx="6" cy="12" r="1.5" fill={T.ink}/>
      <Circle cx="12" cy="12" r="1.5" fill={T.ink}/>
      <Circle cx="18" cy="12" r="1.5" fill={T.ink}/>
    </G>
  </Icon>,
  arrowLeft: () => <Icon stroke={T.ink} d="M20 12H4M10 6l-6 6 6 6"/>,
};
