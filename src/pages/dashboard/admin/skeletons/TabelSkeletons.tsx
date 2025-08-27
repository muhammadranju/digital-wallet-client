import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SkeletonTable = () => {
  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </TableHead>
            {/* <TableHead> */}
            <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Placeholder for multiple skeleton rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div>
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mt-1"></div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
              </TableCell>
              <TableCell>
                <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
              </TableCell>
              <TableCell>
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
              </TableCell>
              <TableCell>
                <div className="w-16 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
              </TableCell>
              <TableCell>
                <div className="w-16 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
              </TableCell>
              <TableCell>
                <div className="w-24 h-8 bg-gray-300 rounded animate-pulse mt-2"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex gap-2">
          <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </CardContent>
  );
};

export default SkeletonTable;
