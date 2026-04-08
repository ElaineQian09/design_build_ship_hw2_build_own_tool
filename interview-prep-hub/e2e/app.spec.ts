import { test, expect } from "@playwright/test";

// ---------- Navigation ----------

test.describe("Navigation", () => {
  test("navbar links navigate to correct pages", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Questions", { exact: true }).click();
    await expect(page).toHaveURL("/questions");

    await page.getByText("Add Question").click();
    await expect(page).toHaveURL("/questions/new");

    await page.getByText("Companies").click();
    await expect(page).toHaveURL("/companies");

    await page.getByText("Checklist").click();
    await expect(page).toHaveURL("/checklist");

    await page.getByText("Home").click();
    await expect(page).toHaveURL("/");
  });

  test("logo navigates to home", async ({ page }) => {
    await page.goto("/questions");
    await page.getByText("IP Hub").click();
    await expect(page).toHaveURL("/");
  });
});

// ---------- Home Page ----------

test.describe("Home Page", () => {
  test("renders dashboard heading and stat cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Your Interview Dashboard")).toBeVisible();
    await expect(page.getByText("Total Questions")).toBeVisible();
    await expect(page.getByText("Mastered")).toBeVisible();
    await expect(page.getByRole("main").getByText("Companies", { exact: true })).toBeVisible();
  });

  test("quick action cards link to correct pages", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Browse Questions").click();
    await expect(page).toHaveURL("/questions");

    await page.goto("/");
    await page.getByText("Add a Question").click();
    await expect(page).toHaveURL("/questions/new");

    await page.goto("/");
    await page.getByText("Prep Checklist").click();
    await expect(page).toHaveURL("/checklist");
  });

  test("recent questions section shows questions", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Recent Questions")).toBeVisible();
  });
});

// ---------- Questions Page ----------

test.describe("Questions Page", () => {
  test("renders question list with cards", async ({ page }) => {
    await page.goto("/questions");
    await expect(page.getByText("Question Bank")).toBeVisible();
    await expect(page.getByPlaceholder("Search questions...")).toBeVisible();
    await expect(page.getByText(/\d+ questions? found/)).toBeVisible();
  });

  test("category filter buttons work", async ({ page }) => {
    await page.goto("/questions");

    // Click Behavioral filter
    await page.getByRole("button", { name: "Behavioral" }).click();
    await expect(page.getByText(/\d+ questions? found/)).toBeVisible();

    // Click Technical filter
    await page.getByRole("button", { name: "Technical" }).click();
    await expect(page.getByText(/\d+ questions? found/)).toBeVisible();

    // Reset with All
    await page.getByRole("button", { name: "All" }).click();
    await expect(page.getByText(/\d+ questions? found/)).toBeVisible();
  });

  test("search filters questions", async ({ page }) => {
    await page.goto("/questions");
    await page.getByPlaceholder("Search questions...").fill("linked list");
    await expect(page.getByText(/\d+ questions? found/)).toBeVisible();
  });

  test("clicking a question navigates to detail page", async ({ page }) => {
    await page.goto("/questions");
    // Click the first question link
    // Skip the /questions/new link by matching only numeric IDs
    const questionLink = page.locator('a[href^="/questions/"]').filter({ hasNotText: /Add|new/ }).first();
    await questionLink.click();
    await expect(page).toHaveURL(/\/questions\/\d+/);
  });
});

// ---------- Question Detail Page ----------

test.describe("Question Detail Page", () => {
  test("displays question details", async ({ page }) => {
    await page.goto("/questions/1");
    // Should show the question title
    await expect(
      page.getByText("Tell me about a time you led a project under a tight deadline.")
    ).toBeVisible();
    // Should show company
    await expect(page.getByText("Amazon")).toBeVisible();
    // Should show notes section
    await expect(page.getByText("Notes")).toBeVisible();
    // Should show answer outline section
    await expect(page.getByText("Answer Outline")).toBeVisible();
  });

  test("back link returns to questions list", async ({ page }) => {
    await page.goto("/questions/1");
    await page.getByText("All Questions").click();
    await expect(page).toHaveURL("/questions");
  });

  test("shows 404 for invalid question id", async ({ page }) => {
    await page.goto("/questions/999");
    await expect(page.getByText("Question not found")).toBeVisible();
  });
});

// ---------- Companies Page ----------

test.describe("Companies Page", () => {
  test("renders company tracker with summary stats", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.getByText("Company Tracker")).toBeVisible();
    await expect(page.getByText("Active")).toBeVisible();
    await expect(page.getByText("Offers")).toBeVisible();
    await expect(page.getByText("High Priority")).toBeVisible();
  });

  test("displays company cards with details", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.getByText("Amazon")).toBeVisible();
    await expect(page.getByText("Google")).toBeVisible();
  });
});

// ---------- Checklist Page ----------

test.describe("Checklist Page", () => {
  test("renders checklist with progress", async ({ page }) => {
    await page.goto("/checklist");
    await expect(page.getByText("Prep Checklist")).toBeVisible();
    // Progress percentage
    await expect(page.getByText(/\d+%/)).toBeVisible();
    // Category sections
    await expect(page.getByText("Resume & Applications")).toBeVisible();
    await expect(page.getByText("Technical Prep")).toBeVisible();
    await expect(page.getByText("Behavioral Prep")).toBeVisible();
    await expect(page.getByText("Logistics")).toBeVisible();
  });
});

// ---------- Add Question Page ----------

test.describe("Add Question Page", () => {
  test("renders form with all fields", async ({ page }) => {
    await page.goto("/questions/new");
    await expect(page.getByText("Add a New Question")).toBeVisible();
    await expect(
      page.getByPlaceholder(
        "Tell me about a time you disagreed with your manager."
      )
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Add Question" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  });

  test("shows validation errors when submitting empty form", async ({
    page,
  }) => {
    await page.goto("/questions/new");
    await page.getByRole("button", { name: "Add Question" }).click();
    await expect(page.getByText("Title is required")).toBeVisible();
  });
});

// ---------- Responsive Layout ----------

test.describe("Responsive Layout", () => {
  test("pages render at mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.getByText("Your Interview Dashboard")).toBeVisible();

    await page.goto("/questions");
    await expect(page.getByText("Question Bank")).toBeVisible();
  });

  test("pages render at desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.getByText("Your Interview Dashboard")).toBeVisible();

    await page.goto("/questions");
    await expect(page.getByText("Question Bank")).toBeVisible();
  });
});

// ---------- No Console Errors ----------

test("no console errors on page load", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  for (const path of [
    "/",
    "/questions",
    "/questions/1",
    "/companies",
    "/checklist",
    "/questions/new",
  ]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }

  // Filter out Next.js dev mode noise
  const realErrors = errors.filter(
    (e) => !e.includes("Download the React DevTools")
  );
  expect(realErrors).toEqual([]);
});
