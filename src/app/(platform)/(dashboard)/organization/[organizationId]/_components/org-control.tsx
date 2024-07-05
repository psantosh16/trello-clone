"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  /* To check wether the url matches the organization selected */
  const params = useParams();
  const { setActive, isLoaded } = useOrganizationList();
  useEffect(() => {
    console.log("🟢 OrganizationList loaded");
    if (isLoaded) {
      if (!setActive) {
        console.error("🔴 OrganizationList not found");
        return;
      }
      console.log("🔥🔥🔥ordId from params: ", params.organizationId);
      console.log("🟢 setActive setting");
      setActive({ organization: params.organizationId as string });
    }
  }, [setActive, params.organizationId]);
  return null;
};
