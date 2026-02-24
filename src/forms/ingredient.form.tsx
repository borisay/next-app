"use client";
import { useState, useTransition } from "react";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "../constants/select-options";
import { useIngredientStore } from "../store/ingredient.store";

const initialState = {
  name: "",
  category: "",
  unit: "",
  pricePerUnit: null as number | null,
  description: "",
};
const IngredientForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialState);
  // feetback after create ingredient
  const [isPending, startTransition] = useTransition();
  const { addIngredient } = useIngredientStore();

  // const handleSubmit = async (e: React.FormEvent) => {
  const handleSubmit = async (formData: FormData) => {
    // e.preventDefault();
    startTransition(async () => {
      // Reset form if OK
      // const result = await createIngredient(formData);
      const storeError = useIngredientStore.getState().error;
      await addIngredient(formData);
      if (storeError) {
        setError(storeError); //?
        // alert("Error creating ingredient");
      } else {
        setError(null);
        setFormData(initialState);
        // alert("Successful creating ingredient!");
      }
    });
  };
  return (
    <Form className="w-full items-center" action={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Input
        isRequired
        name="name"
        aria-label="Name"
        placeholder="Enter ingredient name"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => {
          if (!value) return "It is mandatary";
          return null;
        }}
      />
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            aria-label="Category"
            placeholder="Category "
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            aria-label="Unit"
            placeholder="Unit "
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Input
            // isRequired
            name="pricePerUnit"
            placeholder="Price "
            type="number
            "
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ""
            }
            classNames={{
              inputWrapper: "bg-default-100 text-sm",
              input: "text-sm focus:outline-none",
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            endContent={
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "gray" }}
              >
                $
              </span>
            }
            validate={(value) => {
              // if (!value) return "It is mandatary";

              const num = parseFloat(value);
              // if (isNaN(num) || num < 0) return "Price cannot be negative";
              if (num < 0) return "Price cannot be negative";
              return null;
            }}
          />
        </div>
      </div>
      <Input
        name="description"
        aria-label="Description"
        placeholder="Enter description (optional)"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Button color="primary" type="submit" className="" isLoading={isPending}>
        Add ingredient
      </Button>
    </Form>
  );
};
export default IngredientForm;
