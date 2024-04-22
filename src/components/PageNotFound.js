import { useState } from "react";

export default function PageNotFound() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 5000);
  return isLoading ? (
    <div id="loading"></div>
  ) : (
    <div className="main">
      <h1>Page not found</h1>
      <p>
        It seems like you have the wrong address. This page does not exist on
        our servers.
      </p>
    </div>
  );
}
