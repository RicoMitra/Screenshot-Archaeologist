import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { AppShell } from "@/components/app-shell";

describe("AppShell", () => {
  test("renders demo receipts, filters categories, and shows privacy limitations", async () => {
    render(<AppShell />);

    expect(screen.getByRole("heading", { name: /make screenshots answer back/i })).toBeInTheDocument();
    expect(screen.getByText(/local ocr and classification can be wrong/i)).toBeInTheDocument();
    expect(screen.getAllByText("Threadwell tools invoice").length).toBeGreaterThan(0);

    await userEvent.click(screen.getByRole("button", { name: "Filter code/error" }));

    expect(screen.getAllByText("Beacon Logs render trace").length).toBeGreaterThan(0);
    expect(screen.queryByText("Threadwell tools invoice")).not.toBeInTheDocument();
  });
});
