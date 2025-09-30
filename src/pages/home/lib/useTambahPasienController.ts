import type { ICreatePasienRequestBody } from "@/interface/transaksi/request";
import type { IGetPasienResponse } from "@/interface/transaksi/response";
import { useEffect, useState } from "react";
import useMutationCreatePasien from "@/hooks/transaksi/useMutationCreatePasien";
import { toast } from "@/components/toast";
import useMutationEditPasien from "@/hooks/transaksi/useMutataionEditPasien";
import { useQueryClient } from "@tanstack/react-query";
import useGetNoRM from "@/hooks/transaksi/useGetNoRM";


const useTambahPasienController = (pasienDetail?: IGetPasienResponse, onSuccess?: (id: number, no_rm: number) => void, onPressBack?: () => void) => {
    const queryClient = useQueryClient();
    const { data: noRM } = useGetNoRM();
    const [pasienForm, setPasienForm] = useState<ICreatePasienRequestBody>({
        no_rm: pasienDetail?.no_rm || 0,
        nama: pasienDetail?.nama || '',
        domisili: pasienDetail?.domisili || '',
        jenis_kelamin: pasienDetail?.jenis_kelamin || '',
        tanggal_lahir: pasienDetail?.tanggal_lahir || '',
        no_hp: pasienDetail?.no_hp || '',
        nik: '',
    });
    const clearForm = () => {
        setPasienForm({
            no_rm: pasienDetail?.no_rm || 0,
            nama: '',
            domisili: '',
            jenis_kelamin: '',
            tanggal_lahir: '',
            no_hp: '',
            nik: '',
        });
    };

    const { createPasien, isPending } = useMutationCreatePasien();
    const { editPasien, } = useMutationEditPasien();
        const handleCreatePasien = async () => {
        if(pasienDetail) {
            await editPasien({...pasienForm, id: pasienDetail.id}, {
                onSuccess: () => {
                    toast.success('Berhasil', 'Pasien berhasil diubah');
                    queryClient.invalidateQueries({ queryKey: ['pasien-detail' , pasienDetail?.id] });
                    onPressBack?.();
                },
            });
        } else {
        await createPasien(pasienForm, {
            onSuccess: (data) => {
                console.log(data);
                toast.success('Berhasil', 'Pasien berhasil ditambahkan');
                onSuccess?.(data.data.id, noRM?.data?.no_rm || 0);
                onPressBack?.();
               
            },
            onError: () => {
                toast.error('Gagal', 'Pasien gagal ditambahkan');
            },
        });
    };
    }
    useEffect(() => {   
        if(!pasienDetail) {
        if(noRM) {
                setPasienForm({...pasienForm, no_rm: noRM.data.no_rm});
            }
        }
    }, [noRM]);
  return {
    pasienForm,
    setPasienForm,
    clearForm,
    handleCreatePasien,
    isPending,

  };
};

export default useTambahPasienController;