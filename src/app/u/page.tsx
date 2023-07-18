"use client";

import supabase from "@/lib/supabase";
import React, { useEffect } from "react";

export default function UPage() {
  useEffect(() => {
    (async () => {
      const useResponse = await supabase.auth.getUser();
      const sessionResponse = await supabase.auth.getSession();

      console.log(useResponse, sessionResponse);
    })();
  }, []);
  return <div>page</div>;
}
