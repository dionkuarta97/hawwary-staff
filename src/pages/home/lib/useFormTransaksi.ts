import useGetDocter from "@/hooks/transaksi/useGetDocter";
import { useEffect, useMemo, useState } from "react";
import type { IGetDantelResponse, IGetDokterResponse } from "@/interface/transaksi/response";
import useGetDantel from "@/hooks/transaksi/useGetDantel";
import type { ICreateTransaksiRequestBody } from "@/interface/transaksi/request";
import useMutationCreateTransaksi from "@/hooks/transaksi/useMutationCreateTransaksi";
import { toast } from "@/components/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const useFormTransaksi = (pasien_id: number) => {
    const queryClient = useQueryClient();
    const [searchDocter, setSearchDocter] = useState<string | null>(null);
    const [selectedDocter, setSelectedDocter] = useState<IGetDokterResponse | null>(null);
    const { data: docter, isLoading: isLoadingDocter } = useGetDocter({
        search: searchDocter,
    });
    const [searchDantel, setSearchDantel] = useState<string | null>(null);
    const [selectedDantel, setSelectedDantel] = useState<IGetDantelResponse | null>(null);
    const { data: dantel, isLoading: isLoadingDantel } = useGetDantel({
        search: searchDantel,
    });
    const { createTransaksi, isPending: isPendingCreateTransaksi } = useMutationCreateTransaksi();
    const [modal, setModal] = useState<ICreateTransaksiRequestBody['modal'] | null>(null);
    const navigate = useNavigate();
    const [form, setForm] = useState<ICreateTransaksiRequestBody>({
        pasien_id: pasien_id,
        docter_id: 0,
        dantel_id: 0,
        total_amount: 0,
        net_amount: 0,
        description: '',
        modal: modal,
    });
    const clearForm = () => {
        setForm({
            pasien_id: pasien_id,
            docter_id: 0,
            dantel_id: 0,
            total_amount: 0,
            net_amount: 0,
            description: '',
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

    const handleCreateTransaksi = () => {
        createTransaksi(form, {
            onSuccess: () => {
                clearForm();
                toast.success('Berhasil', 'Transaksi berhasil dibuat');
                queryClient.invalidateQueries({ queryKey: ['transaksi'] });
                navigate('/');
            },
            onError: () => {
                toast.error('Gagal', 'Transaksi gagal dibuat');
            }
        });
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