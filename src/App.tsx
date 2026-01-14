// Nota: O BrowserRouter está definido no main.tsx, então você pode usar Routes e Route diretamente aqui
import { ComponentExample } from "@/components/component-example";
import { ThemeToggle } from "@/components/theme-toggle";

export function App() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <ComponentExample />
    </div>
  );
}

export default App;