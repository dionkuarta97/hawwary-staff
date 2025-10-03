import { useState } from "react";


const useOpenClose = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen };
};

export default useOpenClose;