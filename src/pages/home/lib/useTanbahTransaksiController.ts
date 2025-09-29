import { useNavigate } from "react-router";

const useTambahTransaksiController = () => {
    const navigate = useNavigate();
    const onClose = () => {
        navigate('/');
    };
  return {
    onClose,
  };
};

export default useTambahTransaksiController;