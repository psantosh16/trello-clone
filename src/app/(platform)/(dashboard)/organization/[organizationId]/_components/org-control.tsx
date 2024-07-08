"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  /* To check wether the url matches the organization selected */
  const params = useParams();
  const { setActive, isLoaded } = useOrganizationList();
  useEffect(() => {
    if (isLoaded) {
      if (!setActive) {
        return;
      }
      setActive({ organization: params.organizationId as string });
    }
  }, [setActive, params.organizationId]);
  return null;
};
