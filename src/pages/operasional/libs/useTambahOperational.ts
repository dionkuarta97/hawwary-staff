import { useLocation, useNavigate } from "react-router";
import useMutationCreateOperational from "@/hooks/operational/useMutationCreateOperational";
import type { ICreateOperationalRequestBody } from "@/interface/operational/request";
import type { IGetOperationalResponse } from "@/interface/operational/response";
import { useEffect, useState } from "react";
import { toast } from "@/components/toast";
import { useQueryClient } from "@tanstack/react-query";
import useMutationUpdateOperational from "@/hooks/operational/useMutationUpdateOperational";

const useTambahOperational = () => {
    const queryClient = useQueryClient();
    const {state} = useLocation();
   
    const operationalDetail = state?.operationalDetail as IGetOperationalResponse;
    const navigate = useNavigate();
    const onClose = () => {
        if(operationalDetail) {
            navigate(`/operasional/detail-operational/${operationalDetail.id}`);
        } else {
            navigate('/operasional');
        }
    };
    const { createOperational, isPending } = useMutationCreateOperational();
    const { updateOperational, isPending: isPendingUpdateOperational } = useMutationUpdateOperational();
    const [operationalForm, setOperationalForm] = useState<ICreateOperationalRequestBody>({
        name: '',
        amount: 0,
        description: ''
    });
    const clearForm = () => {
        setOperationalForm({
            name: '',
            amount: 0,
            description: ''
        });
    };

    const handleCreateOperational = async () => {
        if(operationalDetail) {
            await updateOperational({...operationalForm, id: operationalDetail.id}, {
                onSuccess: () => {
                    toast.success('Berhasil', 'Operasional berhasil diubah');
                    queryClient.invalidateQueries({ queryKey: ['operational-detail' , operationalDetail.id] });
                    queryClient.invalidateQueries({ queryKey: ['operational'] });
                  navigate(`/operasional/detail-operational/${operationalDetail.id}`);
                },
                onError: () => {
                    toast.error('Gagal', 'Operasional gagal diubah');
                }
            });
        } else {
        createOperational(operationalForm, {
            onSuccess: (data) => {
                clearForm();
                toast.success('Berhasil', 'Operasional berhasil dibuat');
                queryClient.invalidateQueries({ queryKey: ['operational'] });
       
                navigate(`/operasional/detail-operational/${data.data.id}`);
            },
            onError: () => {
                toast.error('Gagal', 'Operasional gagal dibuat');
                }
            });
        }
    };
    useEffect(() => {
        if(operationalDetail) {
            setOperationalForm({...operationalForm, name: operationalDetail.name, amount: Number(operationalDetail.amount), description: operationalDetail.description});
        }
    }, [operationalDetail]);
  return {
    onClose,
    operationalForm,
    setOperationalForm,
    clearForm,
    isPending,
    isPendingUpdateOperational,
    handleCreateOperational,
    operationalDetail,
  };
};

export default useTambahOperational;