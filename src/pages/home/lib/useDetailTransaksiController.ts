import useGetDetailTransaksi from "@/hooks/transaksi/useGetDetailTransaksi";
import { useNavigate, useParams } from "react-router";   
import { useState } from "react";
import useOpenClose from "@/hooks/useOpenClose";
import useMutationUpdateStatusTransaksi from "@/hooks/transaksi/useMutationUpdateStatusTransaksi";
import { useQueryClient } from "@tanstack/react-query";

const useDetailTransaksiController = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [isEdit, setIsEdit] = useState(false);
    const { data, isLoading } = useGetDetailTransaksi(Number(id));
    const { isOpen , setIsOpen } = useOpenClose();
    const { updateStatusTransaksi, isPending: isPendingUpdateStatusTransaksi } = useMutationUpdateStatusTransaksi();
    const[updateStatus, setUpdateStatus] = useState({
        title: '',
        message: '',
        onAccept: () => {},
        onDecline: () => {},
        status: 'pending',
    });
    const onClose = () => {
        navigate('/');
    };
    return { data, isLoading, onClose, isEdit, setIsEdit, isOpen, setIsOpen, updateStatus, setUpdateStatus, updateStatusTransaksi, isPendingUpdateStatusTransaksi, queryClient };
    
};

export default useDetailTransaksiController;