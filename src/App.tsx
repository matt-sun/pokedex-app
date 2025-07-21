import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Layout from "@/components/layout/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Layout />
      </div>
    </ThemeProvider>
  );
}

export default App;
