import { getComputedStyles } from "@/utils/test-utils";
import { hexToRgb } from "@/utils/utils";
import { test, expect } from "@playwright/test";

const TEST_URL = "/test-ds";

const TOKENS = {
  primary: "#ff5c00",
  success: "#22c55e",
  danger: "#ef4444",
  muted: "#6b6b70",
  subtle: "#8b8b90",
  placeholder: "#4a4a4e",
  textPrimary: "#ffffff",
  bgMuted: "#1a1a1d",
  disabled: 0.5,
  iconXs: 14,
  iconSm: 16,
  iconMd: 18,
  iconLg: 20,
  iconXl: 32,
} as const;

test.describe("Feature: Icon (BDD Source)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
  });

  // ============================================================
  // PRIMEIROS 3 TESTES - CÓDIGO COMPLETO
  // ============================================================

  test.skip("Icon renderiza com tamanho md 18px padrao", async ({ page }) => {
    const icon = page.locator('[data-testid="icon-md"]');
    await expect(icon).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="icon-md"]');
    expect(styles?.width).toBe(TOKENS.iconMd);
    expect(styles?.height).toBe(TOKENS.iconMd);
  });

  test.skip("Icon renderiza com tamanho xs 14px", async ({ page }) => {
    const icon = page.locator('[data-testid="icon-xs"]');
    await expect(icon).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="icon-xs"]');
    expect(styles?.width).toBe(TOKENS.iconXs);
    expect(styles?.height).toBe(TOKENS.iconXs);
  });

  test.skip("Icon com role presentation padrao nao precisa de label", async ({
    page,
  }) => {
    const icon = page.locator('[data-testid="icon-presentation"]');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("role", "presentation");
  });

  // ============================================================
  // DEMAIS CENÁRIOS - APENAS ASSINATURA (placeholder)
  // Implementar baseado no .spec.docs.md
  // ============================================================

  test.skip(
    "Icon renderiza com tamanho sm 16px",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza com tamanho lg 20px",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza com tamanho xl 32px",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de navegacao layout-dashboard",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de navegacao chart-line",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de navegacao users",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de acao download",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de acao plus",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de indicacao trending-up",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de indicacao trending-down",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de navegacao chevron-left",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone de navegacao chevron-right",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon renderiza icone dismiss x",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon herda cor do contexto via currentColor",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon aceita cor via CSS className",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon standalone com aria-label",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon aceita role customizado",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon em Button herda cor do texto",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon em Navigation Item exibe corretamente",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon funciona em tema claro",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon funciona em tema escuro",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon em elemento desabilitado exibe opacity reduzida",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );

  test.skip(
    "Icon em elemento com hover herda comportamento",
    async ({ page }) => {
      // TODO: implementar baseado no .spec.docs.md
    }
  );
});
