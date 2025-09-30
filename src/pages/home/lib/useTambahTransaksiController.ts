import { useNavigate } from "react-router";
import useGetPasien from "@/hooks/transaksi/useGetPasien";
import useGetDetailPasien from "@/hooks/transaksi/useGetDetailPasien";
import { useState } from "react";

const useTambahTransaksiController = () => {
    const navigate = useNavigate();
    const onClose = () => {
        navigate('/');
    };
    const [action, setAction] = useState<'tambah' | 'edit' | null>(null);
    const [no_rm, setNo_rm] = useState<number | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [id, setId] = useState<number | null>(null);  
    const { data: pasienDetail, isLoading: isLoadingDetail } = useGetDetailPasien(id);
    const { data: pasien, isLoading } = useGetPasien({
        no_rm: no_rm,
        search: search,
    });
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if(Number(value) > 0) {
        setNo_rm(Number(value));
        setSearch(null);
      } else {
        setNo_rm(null); 
        setSearch(value);
      }
    };
  return {
    onClose,
    handleSearch,
    pasien,
    isLoading,
    no_rm,
    setNo_rm,
    action,
    setAction,
    pasienDetail,
    isLoadingDetail,
    setId,
    id,
    search,
    setSearch,
  };
};

export default useTambahTransaksiController;