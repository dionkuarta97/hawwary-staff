import useGetDetailOperational from "@/hooks/operational/useGetDetailOperational";
import { useParams, useNavigate } from "react-router";
import useOpenClose from "@/hooks/useOpenClose";
import { useState } from "react";
import useMutationUpdateOperational from "@/hooks/operational/useMutationUpdateOperational";
import { toast } from "@/components/toast";
import { useQueryClient } from "@tanstack/react-query";

const useDetailOperationalController = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const onClose = () => {
        navigate('/operasional');
    };
    const { updateOperational,  } = useMutationUpdateOperational();
    const { data, isLoading } = useGetDetailOperational(Number(id));
    const { isOpen, setIsOpen } = useOpenClose();
    const[updateStatus, setUpdateStatus] = useState({
        title: '',
        message: '',
        onAccept: () => {},
        onDecline: () => {},
    });

    const handleUpdateStatus = async (status: 'success' | 'failed') => {
        await updateOperational({ id: Number(id), status }, {
            onSuccess: () => {
                setIsOpen(false);
                toast.success('Berhasil', 'Status operasional berhasil diubah');
                // Invalidate dengan query key yang konsisten
                queryClient.invalidateQueries({ queryKey: ['operational'] });
                // Force refetch data
                queryClient.refetchQueries({ queryKey: ['operational-detail', Number(id)] });
            },  
            onError: () => {
                setIsOpen(false);
                toast.error('Gagal', 'Status operasional gagal diubah');
            },
        });
    };
    return { data, isLoading, onClose, navigate, isOpen, setIsOpen, updateStatus, setUpdateStatus, handleUpdateStatus };
};

export default useDetailOperationalController;