import { Form, Input, Modal } from "@heroui/react";
import { useState } from "react";
import { Button } from "@heroui/react";
import { signInWithCredentials } from "../actions/sign-in";

interface IProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    const result = await signInWithCredentials(
      formData.email,
      formData.password
    );
    console.log("Result", result);

    // because refresh does not still work for log-in but only log-out we will use 'reload'
    window.location.reload();

    onClose();
  };
  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        label="Email"
        labelPlacement="outside"
        aria-label="Email"
        isRequired
        name="email"
        // placeholder="Enter email"
        type="email"
        value={formData.email}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return "This field required";
          // if (!validateEmail(value)) return "Incorrect email";
          return null;
        }}
      />
      <Input
        label="Password"
        labelPlacement="outside"
        isRequired
        name="password"
        // placeholder="Enter password"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "This field required";
        }}
      />

      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Log In
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
