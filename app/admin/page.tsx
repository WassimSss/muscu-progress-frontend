"use client";

import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";

export default function Page() {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">

    </main>
  );
}