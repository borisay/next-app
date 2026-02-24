"use client";

import CustomModal from "../../common/modal";
import RegistrationForm from "@/src/forms/registration.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Create account">
      <RegistrationForm onClose={onClose} />
    </CustomModal>
  );
};
export default RegistrationModal;
