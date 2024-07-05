"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Activity, CreditCard, icons, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export type Organization = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
};

interface NavItemProps {
  organization: Organization;
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  organization,
  isActive,
  isExpanded,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const route = [
    {
      label: "Boards",
      icons: <Layout className="size-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icons: <Activity className="size-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icons: <Settings className="size-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icons: <CreditCard className="size-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => {
          onExpand(organization.id);
        }}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700  rounded-md hover:bg-neutral-500/10  transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="size-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt={organization.name}
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-md text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {route.map((item, index) => (
          <Button
            key={index}
            size="sm"
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === item.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
            onClick={() => onClick(item.href)}
          >
            {item.icons}
            <span className="font-md text-sm">{item.label}</span>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
