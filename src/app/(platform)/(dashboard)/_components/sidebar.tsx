"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !expanded[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading)
    return <Sidebar.Skeleton />;

  return (
    <>
      <div className="font-md text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="size-4" />
          </Link>
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={defaultAccordionValue}>
        {userMemberships.data.map((org) => (
          <NavItem
            key={org.id}
            isActive={activeOrganization?.id === org.organization.id}
            isExpanded={expanded[org.organization.id]}
            organization={org.organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

Sidebar.Skeleton = function SidebarSkeleton() {
  return (
    <div className="space-y-4 flex flex-col w-full">
      <div className="flex justify-between">
        <Skeleton className="w-16 h-10 bg-muted" />
        <Skeleton className="size-10 bg-muted" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
};
