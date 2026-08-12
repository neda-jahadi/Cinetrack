import { MoreHorizontalIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAllCompanies } from '@/features/company/api/companyQuery';
import Spinner from '@/components/ui/Spinner';
import NotFound from '@/components/layouts/NotFound';
import type { Company } from '@/features/company/types/companyTypes';
import { Button } from '@/components/ui/button/button';

export function AdminDashboardPage() {
  const { data: companies, isLoading, isError } = useAllCompanies();
  if (isLoading) <Spinner loading={true} />;
  if (isError) return <NotFound />;

  if (!companies || companies.length === 0) {
    return <NotFound />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company: Company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.status}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {company.status === 'PENDING' && (
                    <>
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Reject</DropdownMenuItem>
                    </>
                  )}
                  {company.status === 'APPROVED' && (
                    <DropdownMenuItem>Revoke Approval</DropdownMenuItem>
                  )}
                  {company.status === 'REJECTED' && (
                    <DropdownMenuItem>Approved</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
