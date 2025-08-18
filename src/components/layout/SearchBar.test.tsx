import SearchBar from "@/components/layout/SearchBar";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock React Router dependencies
jest.mock("react-router-dom", () => ({
  ...jest.requireActual<typeof import("react-router-dom")>("react-router-dom"),
  Form: ({
    children,
    onSubmit,
    ...props
  }: {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent) => void;
    [key: string]: unknown;
  }) => (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  ),
  useNavigate: () => jest.fn(),
}));

jest.mock("@/lib/api/indivPokeData", () => ({
  getPokemonURLByName: jest.fn().mockResolvedValue({ id: 1 }),
  getPokemonURLByID: jest.fn().mockResolvedValue({ id: 1 }),
}));

// Mock timers for debouncing
jest.useFakeTimers();

describe("SearchBar", () => {
  const mockSuggestions = [
    "Bulbasaur",
    "Charmander",
    "Squirtle",
    "Pikachu",
    "Charizard",
  ];

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders the SearchBar component with input field", async () => {
    render(<SearchBar suggestions={mockSuggestions} />);

    expect(screen.getByPlaceholderText(/Name or/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows filtered suggestions when typing", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Type "char" to filter suggestions
    await user.type(input, "char");

    // Fast-forward the debounce timer (500ms) wrapped in act
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Charmander")).toBeInTheDocument();
      expect(screen.getByText("Charizard")).toBeInTheDocument();
    });

    // Bulbasaur, Squirtle and Pikachu should not be visible as they don't contain "char"
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("Squirtle")).not.toBeInTheDocument();
    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
  });

  it("shows no suggestions for empty input", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Focus the input but don't type anything
    await user.click(input);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // No suggestions should appear
    await waitFor(() => {
      expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
      expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
      expect(screen.queryByText("Squirtle")).not.toBeInTheDocument();
      expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
      expect(screen.queryByText("Charizard")).not.toBeInTheDocument();
    });
  });

  it("filters suggestions case-insensitively", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Type uppercase letters
    await user.type(input, "PIKA");
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Pikachu")).toBeInTheDocument();
    });

    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("Charizard")).not.toBeInTheDocument();
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
    expect(screen.queryByText("Squirtle")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation through suggestions", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Type to show suggestions
    await user.type(input, "char");
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Charmander")).toBeInTheDocument();
      expect(screen.getByText("Charizard")).toBeInTheDocument();
    });

    // Use arrow down to navigate
    fireEvent.keyDown(input, { key: "ArrowDown" });

    // The input value should change to the first suggestion
    expect(input).toHaveValue("Charmander");

    // Arrow down again should move to next suggestion
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue("Charizard");
  });

  it("selects suggestion when clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Type to show suggestions
    await user.type(input, "char");
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Charmander")).toBeInTheDocument();
      expect(screen.getByText("Charizard")).toBeInTheDocument();
    });

    // Click on suggestion
    await user.click(screen.getByText("Charmander"));

    // Input should be updated and suggestions should disappear
    expect(input).toHaveValue("Charmander");
    expect(screen.queryByText("Charizard")).not.toBeInTheDocument();
  });

  it("clears suggestions when pressing Escape", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Type to show suggestions
    await user.type(input, "char");
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText("Charmander")).toBeInTheDocument();
      expect(screen.getByText("Charizard")).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(input, { key: "Escape" });

    // Suggestions should disappear and input should revert to original
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
    expect(screen.queryByText("Charizard")).not.toBeInTheDocument();
    expect(input).toHaveValue("char"); // Original input restored
  });

  it("handles debounced input correctly", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar suggestions={mockSuggestions} />);

    const input = screen.getByPlaceholderText(/Name or/);

    // Type quickly
    await user.type(input, "c");
    await user.type(input, "h");
    await user.type(input, "a");

    // Don't advance timer yet - suggestions shouldn't appear
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
    expect(screen.queryByText("Charizard")).not.toBeInTheDocument();

    // Now advance the debounce timer
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Charmander")).toBeInTheDocument();
      expect(screen.getByText("Charizard")).toBeInTheDocument();
    });
  });
});
