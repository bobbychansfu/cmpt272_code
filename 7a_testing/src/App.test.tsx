import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TodoApp, NameForm } from "./App";


describe("TodoApp", () => {

  it("shows the empty state message when no tasks exist", () => {
    render(<TodoApp />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it("adds a task when the form is submitted", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    // Type into the labeled input
    await user.type(screen.getByLabelText(/new task/i), "Buy milk");
    // Submit via the Add button
    await user.click(screen.getByRole("button", { name: /add/i }));
    // The task should now appear in the list
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("does not add a task when input is blank", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    // Click Add without typing anything
    await user.click(screen.getByRole("button", { name: /add/i }));
    // Empty-state message should still be showing
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it("shows the correct remaining count", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(screen.getByLabelText(/new task/i), "Task A");
    await user.click(screen.getByRole("button", { name: /add/i }));
    await user.type(screen.getByLabelText(/new task/i), "Task B");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText(/2 tasks remaining/i)).toBeInTheDocument();
  });

  // -- Completing a task --
 

  // -- Deleting a task --

});



describe("NameForm", () => {
  
  it("submit button is disabled when input is empty", () => {
    render(<NameForm onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("enables the submit button once text is entered", async () => {
    const user = userEvent.setup();
    render(<NameForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/your name/i), "Bobby");
    expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
  });

  it("calls onSubmit with the typed name when submitted", async () => {
    const user       = userEvent.setup();
    const handleSubmit = vi.fn(); // spy — records calls and arguments

    render(<NameForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/your name/i), "Bobby");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Assert the callback was called exactly once with the correct value
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("Bobby");
  });

});
