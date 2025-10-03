import type { ITransaksiResponse } from '@/interface/transaksi/response';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { format } from 'date-fns';
import { IconButton } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import { useNavigate } from 'react-router';

interface IDataTransaksiProps {
  data: ITransaksiResponse[];
  page: number;
  per_page: number;
  total_page: number;
  onPageChange: (newPage: number) => void;
}
const DataTransaksi = ({ data, page, per_page, total_page, onPageChange }: IDataTransaksiProps) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto flex flex-col gap-2 min-h-[67vh] max-h-[67vh] justify-between bg-white rounded-md">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="bg-gray-200 w-1.5">No</TableHeadCell>
            <TableHeadCell className="bg-gray-200">Nama</TableHeadCell>
            <TableHeadCell className="bg-gray-200">Domisili</TableHeadCell>
            <TableHeadCell className="bg-gray-200">Tanggal</TableHeadCell>
            <TableHeadCell className="bg-gray-200 w-2.5">status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {data.map((item, index) => (
            <TableRow
              className="cursor-pointer"
              key={index}
              onClick={() => navigate(`/home/detail-transaksi/${item.id}`)}
            >
              <TableCell>{index + 1 + (page - 1) * per_page}</TableCell>
              <TableCell>{item.pasien.nama}</TableCell>
              <TableCell>{item.pasien.domisili}</TableCell>
              <TableCell>{format(item.created_at, 'dd MMMM yyyy, HH:mm')}</TableCell>
              <TableCell>
                <Badge
                  className="w-fit"
                  color={
                    item.status === 'sukses'
                      ? 'success'
                      : item.status === 'gagal'
                        ? 'failure'
                        : 'warning'
                  }
                >
                  {item.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center py-2 gap-1">
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          size="sm"
        >
          First
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
          Previous
        </Button>

        {(() => {
          const maxVisiblePages = 10;
          let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
          let endPage = Math.min(total_page, startPage + maxVisiblePages - 1);

          // Adjust start page if we're near the end
          if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
          }

          return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNumber = startPage + i;
            return (
              <IconButton
                className="cursor-pointer"
                key={pageNumber}
                variant={page === pageNumber ? 'solid' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </IconButton>
            );
          });
        })()}

        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === total_page}
          size="sm"
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
        </Button>
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === total_page}
          onClick={() => onPageChange(total_page)}
          size="sm"
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default DataTransaksi;
