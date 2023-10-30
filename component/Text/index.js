import { Text as TextView } from "react-native";
import React from "react";
import { Fonts } from "../../assets/style";

const Text = ({
  children,
  fontSize = 14,
  color = '#1E2131',
  fontFamily = 'Barlow-Regular',
  BarlowRegular = false,
  BarlowBold = false,
  BarlowMedium = false,
  BarlowSemiBold = false,
  BarlowCondensedRegular = false,
  BarlowCondensedBold = false,
  BarlowCondensedMedium = false,
  BarlowCondensedSemiBold = false,
  GildaDisplay = true,
  style,
  ...props
}) => {
  return (
    <TextView
      {...props}
      style={[
        style,
        { fontSize: fontSize, color: color, lineHeight: fontSize * 1.5 },
        BarlowRegular && { fontFamily: Fonts.Barlow.Regular },
        BarlowBold && { fontFamily: Fonts.Barlow.Bold },
        BarlowMedium && { fontFamily: Fonts.Barlow.Medium },
        BarlowSemiBold && { fontFamily: Fonts.Barlow.SemiBold },
        BarlowCondensedRegular && { fontFamily: Fonts.BarlowCondensed.Regular },
        BarlowCondensedBold && { fontFamily: Fonts.BarlowCondensed.Bold },
        BarlowCondensedMedium && { fontFamily: Fonts.BarlowCondensed.Medium },
        BarlowCondensedSemiBold && { fontFamily: Fonts.BarlowCondensed.SemiBold },
        GildaDisplay && { fontFamily: Fonts.GildaDisplay.Regular },
      ]}
    >
      {children}
    </TextView>
  );
};

export default Text;
