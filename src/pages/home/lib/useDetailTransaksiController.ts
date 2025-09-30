import useGetDetailTransaksi from "@/hooks/transaksi/useGetDetailTransaksi";
import { useNavigate, useParams } from "react-router";   

const useDetailTransaksiController = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading } = useGetDetailTransaksi(Number(id));
    const onClose = () => {
        navigate('/');
    };
    return { data, isLoading, onClose };
    
};

export default useDetailTransaksiController;