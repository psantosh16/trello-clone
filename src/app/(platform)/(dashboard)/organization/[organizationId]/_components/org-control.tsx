"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams();
  const { setActive, isLoaded } = useOrganizationList();
  useEffect(() => {
    if (isLoaded) {
      if (!setActive) {
        return;
      }
      setActive({ organization: params.organizationId as string });
    }
  }, [setActive, params.organizationId, isLoaded]);
  return null;
};
