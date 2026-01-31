import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    navBg: string;
    navText: string;
    navBorder: string;
  }
}
