function Icon() {
  return (
    <div>
      <svg
        className="w-5 h-5 text-black dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="
    M3 2
    H13
    A2 2 0 0 1 15 4
    V6
    H17
    A1 1 0 0 1 18 7
    V18
    A1 1 0 0 1 17 19
    H3
    A1 1 0 0 1 2 18
    V3
    A1 1 0 0 1 3 2
    Z

    M6 6
    H10

    M6 9
    H12

    M6 12
    H9"
        />
      </svg>
      <span className="sr-only">Pokedex Icon</span>
    </div>
  );
}

export default Icon;
