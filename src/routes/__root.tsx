import { Link } from "react-router-dom";

export function NotFoundComponent() {
  return (
    <div className="bg-background flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md text-center">
        <h1 className="font-bold text-7xl text-foreground">404</h1>
        <h2 className="font-semibold mt-4 text-foreground text-xl">Page not found</h2>
        <p className="mt-2 text-muted-foreground text-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-primary font-medium hover:bg-primary/90 inline-flex items-center justify-center px-4 py-2 rounded-md text-primary-foreground text-sm transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
