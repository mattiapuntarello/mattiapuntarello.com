import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/language-context";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import BlogList from "@/pages/blog-list";
import BlogDetail from  "@/pages/blog-detail";
import PortfolioList from "@/pages/portfolio-list";
import PortfolioDetail from "@/pages/portfolio-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/portfolio" component={PortfolioList} />
      <Route path="/portfolio/:id" component={PortfolioDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;