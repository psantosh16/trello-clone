import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationListPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
}
