import { Page } from "@playwright/test";

export const getComputedStyles = async (page: Page, selector: string) => {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement;
    if (!el) return null;
    const styles = window.getComputedStyle(el);
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      fontSize: parseInt(styles.fontSize),
      fontWeight: parseInt(styles.fontWeight),
      height: parseInt(styles.height),
      paddingTop: parseInt(styles.paddingTop),
      paddingBottom: parseInt(styles.paddingBottom),
      paddingLeft: parseInt(styles.paddingLeft),
      paddingRight: parseInt(styles.paddingRight),
      opacity: parseFloat(styles.opacity),
      cursor: styles.cursor,
      borderRadius: parseInt(styles.borderRadius),
      outlineWidth: parseInt(styles.outlineWidth),
      outlineColor: styles.outlineColor,
      width: styles.width,
      display: styles.display,
      border: styles.border,
      screenWidth: window.screen.width
    };
  }, selector);
}