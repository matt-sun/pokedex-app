import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

// Mock matchMedia for useMediaQuery hook
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollIntoView since it's not available in jsdom
Element.prototype.scrollIntoView = jest.fn();

// Suppress React act() warnings in tests (expected behavior for async debounced operations)
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = (...args) => {
    if (
      (typeof args[0] === "string" &&
        args[0].includes("An update to") &&
        args[0].includes("inside a test was not wrapped in act")) ||
      args[0].includes("Error checking favorite status:")
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
});
