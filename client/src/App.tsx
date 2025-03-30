import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import ProjectStructure from "./pages/project-structure";
import { AppProvider } from "./providers/app-provider";
import ProjectAbout from "./pages/project-about";

function Router() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">ابزار تحلیل پروژه ارز دیجیتال</h1>
          <nav className="flex space-x-4 space-x-reverse">
            <Link href="/">
              <span className="px-3 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer">ساختار پروژه</span>
            </Link>
            <Link href="/about">
              <span className="px-3 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer">درباره پروژه</span>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow bg-gray-50">
        <Switch>
          <Route path="/" component={ProjectStructure} />
          <Route path="/about" component={ProjectAbout} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <footer className="bg-blue-600 text-white p-4 text-center text-sm">
        <p>تمامی حقوق محفوظ است &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
