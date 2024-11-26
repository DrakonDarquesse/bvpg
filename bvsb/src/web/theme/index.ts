import { Inter } from "next/font/google";

type SystemTheme = ReturnType<typeof systemTheme>;

const inter = Inter({ subsets: ["latin"], weight: ["700", "800", "900"] });

const systemTheme = () => {
  return {
    colors: {
      primary: {
        main: "#3A76F8",
        dark: "#563E9C",
        light: "#E7F1FF",
        darker: "#222222",
      },
    },
    typography: {
      h1: {
        fontSize: 64,
        fontFamily: inter.style.fontFamily,
        fontWeight: 900,
        lineHeight: 1.09,
      },
      h2: {
        fontSize: 48,
        fontFamily: inter.style.fontFamily,
        fontWeight: 900,
        lineHeight: 1.08,
      },
      h3: {
        fontSize: 36,
        fontFamily: inter.style.fontFamily,
        fontWeight: 800,
        lineHeight: 1.11,
      },
      h4: {
        fontSize: 28,
        fontFamily: inter.style.fontFamily,
        fontWeight: 800,
        lineHeight: 1.14,
      },
      h5: {
        fontSize: 24,
        fontFamily: inter.style.fontFamily,
        fontWeight: 700,
        lineHeight: 1.16,
      },
      h6: {
        fontSize: 20,
        fontFamily: inter.style.fontFamily,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      subtitle1: {
        fontSize: 18,
        fontFamily: "Roboto",
        letterSpacing: "0.005em",
        fontWeight: 500,
        lineHeight: 1.33,
      },
      subtitle2: {
        fontSize: 16,
        fontFamily: "Roboto",
        lineHeight: 1.5,
        letterSpacing: 1.33,
      },
      body1: {
        fontSize: 16,
        fontFamily: "Roboto",
        lineHeight: 1.5,
        letterSpacing: 0.2,
      },
      body2: {
        fontSize: 14,
        fontFamily: "Roboto",
        letterSpacing: 0.2,
        lineHeight: 1.71,
      },
    },
  } as const;
};

const typography = (typography: keyof SystemTheme["typography"]) => {
  return (
    props: Readonly<{
      theme: SystemTheme;
    }>
  ) => {
    return props.theme.typography[typography];
  };
};

export { typography };
export type { SystemTheme };
export default systemTheme;
