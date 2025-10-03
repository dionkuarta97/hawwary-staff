import useGetDocter from "@/hooks/transaksi/useGetDocter";
import { useEffect, useMemo, useState } from "react";
import type { IGetDantelResponse, IGetDokterResponse, ITransaksiResponse } from "@/interface/transaksi/response";
import useGetDantel from "@/hooks/transaksi/useGetDantel";
import type { ICreateTransaksiRequestBody } from "@/interface/transaksi/request";
import useMutationCreateTransaksi from "@/hooks/transaksi/useMutationCreateTransaksi";
import { toast } from "@/components/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useMutationUpdateTransaksi from "@/hooks/transaksi/useMutationUpdateTransaksi";

const useFormTransaksi = (pasien_id: number, transaksiDetail?: ITransaksiResponse,goBack?: () => void) => {
    const queryClient = useQueryClient();
    const [searchDocter, setSearchDocter] = useState<string | null>(null);
    const [selectedDocter, setSelectedDocter] = useState<IGetDokterResponse | null>(transaksiDetail?.docter ? {
        id: transaksiDetail.docter.id,
        name: transaksiDetail.docter.name,
    } : null);
    useEffect(() => {
        if(transaksiDetail?.docter) {
            setSelectedDocter({
                id: transaksiDetail.docter.id,
                name: transaksiDetail.docter.name,
            });
        }
    }, [transaksiDetail?.docter]);
    const { data: docter, isLoading: isLoadingDocter } = useGetDocter({
        search: searchDocter,
    });
    const [searchDantel, setSearchDantel] = useState<string | null>(null);
    const [selectedDantel, setSelectedDantel] = useState<IGetDantelResponse | null>(transaksiDetail?.dantel ? {
        id: transaksiDetail.dantel.id,
        name: transaksiDetail.dantel.name,
    } : null);
    useEffect(() => {
        if(transaksiDetail?.dantel) {
            setSelectedDantel({
                id: transaksiDetail.dantel.id,
                name: transaksiDetail.dantel.name,
            });
        }
    }, [transaksiDetail?.dantel]);
    const { data: dantel, isLoading: isLoadingDantel } = useGetDantel({
        search: searchDantel,
    });
    const { updateTransaksi } = useMutationUpdateTransaksi();
    const { createTransaksi, isPending: isPendingCreateTransaksi } = useMutationCreateTransaksi();
    const [modal, setModal] = useState<ICreateTransaksiRequestBody['modal'] | null>(
        transaksiDetail?.operational ? {
            name: transaksiDetail.operational.name,
            amount: Number(transaksiDetail.operational.amount),
            description: transaksiDetail.operational.description
        } : null
    );
    const navigate = useNavigate();
    const [form, setForm] = useState<ICreateTransaksiRequestBody>({
        pasien_id: transaksiDetail?.pasien_id || pasien_id,
        docter_id: transaksiDetail?.docter_id || 0,
        dantel_id: transaksiDetail?.dantel_id || 0,
        total_amount: Number(transaksiDetail?.total_amount) || 0,
        net_amount: Number(transaksiDetail?.net_amount) || 0,
        description: transaksiDetail?.description || '',
        modal: modal,
    });
    const clearForm = () => {
        setForm({
            pasien_id: transaksiDetail?.pasien_id || pasien_id,
            docter_id: transaksiDetail?.docter_id || 0,
            dantel_id: transaksiDetail?.dantel_id || 0,
            total_amount: Number(transaksiDetail?.total_amount) || 0,
            net_amount: Number(transaksiDetail?.net_amount) || 0,
            description: transaksiDetail?.description || '',
            modal: modal,
        });
    };
    useEffect(() => {
        setForm({ ...form, modal: modal });
      
    }, [modal]);
    const disableButton = useMemo(() => {
        if(modal) {
            return form.total_amount === 0 || form.docter_id === 0 || form.dantel_id === 0 || form.modal === null || form.modal.amount === 0 || form.modal.name === '' || form.modal.description === '';
        }
        return form.total_amount === 0 || form.docter_id === 0 || form.dantel_id === 0;
    }, [form]);
    console.log(form);
    const handleCreateTransaksi = () => {
        if(transaksiDetail) {
            updateTransaksi({ ...form, net_amount: form.modal ? form.total_amount - form.modal.amount : form.total_amount, id: transaksiDetail.id }, {
                onSuccess: () => {
                    clearForm();
                    toast.success('Berhasil', 'Transaksi berhasil diupdate');
                    queryClient.invalidateQueries({ queryKey: ['transaksi'] });
                    queryClient.invalidateQueries({ queryKey: ['transaksi-detail', transaksiDetail.id] });
                    if(goBack) {
                        goBack();
                    } else {
                        navigate(`/home/detail-transaksi/${transaksiDetail.id}`);
                    }
                },
                onError: () => {
                    toast.error('Gagal', 'Transaksi gagal diupdate');
                }
            });
        } else {
        createTransaksi({
            ...form,
            net_amount: form.modal ? form.total_amount - form.modal.amount : form.total_amount,
        }, {
            onSuccess: (data) => {
                clearForm();
                toast.success('Berhasil', 'Transaksi berhasil dibuat');
                queryClient.invalidateQueries({ queryKey: ['transaksi'] });
                queryClient.invalidateQueries({ queryKey: ['transaksi-detail', data.data.id] });
                navigate(`/home/detail-transaksi/${data.data.tranksaksi.id}`);
            },
            onError: () => {
                toast.error('Gagal', 'Transaksi gagal dibuat');
            }
        });
        }
    };
  return {
    searchDocter,
    setSearchDocter,    
    docter,
    isLoadingDocter,
    selectedDocter,
    setSelectedDocter,
    searchDantel,
    setSearchDantel,
    dantel,
    isLoadingDantel,
    selectedDantel,
    setSelectedDantel,
    modal,
    setModal,
    form,
    setForm,
    clearForm,
    disableButton,
    handleCreateTransaksi,
    isPendingCreateTransaksi,
  };
};

export default useFormTransaksi;