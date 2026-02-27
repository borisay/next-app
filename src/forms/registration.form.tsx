"use client";
import { Form, Input, Modal } from "@heroui/react";
import { useState } from "react";
import { Button } from "@heroui/react";
import { registerUser } from "../actions/register";

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    //"use server"; // conflict server/client and will create folder actions ...
    e.preventDefault();
    const result = await registerUser(formData);
    onClose();
  };

  return (
    <Form className="w-full " onSubmit={handleSubmit}>
      <Input
        label="Email"
        labelPlacement="outside"
        aria-label="Email"
        isRequired
        name="email"
        type="email"
        value={formData.email}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return "This field required";
          if (!validateEmail(value)) return "Incorrect email";
          return null;
        }}
      />
      <Input
        label="Password"
        labelPlacement="outside"
        isRequired
        name="password"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "This field required";
          if (value.length < 6) {
            return "Password have to be more 6 symbols";
          }
          return null;
        }}
      />
      <Input
        label="Confirm Password"
        labelPlacement="outside"
        isRequired
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return "This field required";
          if (value !== formData.password) return "Passwords don't match";
          return null;
        }}
      />
      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Sign In
        </Button>
      </div>
    </Form>
  );
};
export default RegistrationForm;
