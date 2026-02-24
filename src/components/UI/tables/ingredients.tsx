import { UNIT_OPTIONS } from "@/src/constants/select-options";
import { CATEGORY_OPTIONS } from "@/src/constants/select-options";
import { useAuthStore } from "@/src/store/auth.store";
import { useIngredientStore } from "@/src/store/ingredient.store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: string) => {
    await removeIngredient(id);
  };
  const getCategoryLabel = (value: string) => {
    const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };
  const getUnitLabel = (value: string) => {
    const option = UNIT_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };
  if (!isAuth) {
    return <p>"Not authorized"</p>;
  }
  return !isLoading && isAuth ? (
    <Table
      aria-label="Ingredients list"
      classNames={{
        wrapper: "mt-4 mb-4",
        table: "w-[300px] sm:w-full",
        th: "text-black",
        td: "text-black",
      }}
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn className="hidden sm:table-cell">Category</TableColumn>
        <TableColumn>Unit</TableColumn>
        <TableColumn className="hidden sm:table-cell">Price</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell className="hidden sm:table-cell">
              {getCategoryLabel(ingredient.category)}
            </TableCell>
            <TableCell>{getUnitLabel(ingredient.unit)}</TableCell>
            <TableCell className="hidden sm:table-cell">
              {ingredient.pricePerUnit !== null
                ? `${ingredient.pricePerUnit} $`
                : "-"}
            </TableCell>
            <TableCell>{ingredient.description || "-"}</TableCell>
            <TableCell>
              <Button
                // color="danger"
                radius="full"
                variant="faded"
                size="sm"
                onPress={() => handleDelete(ingredient.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="mt-4">Loading...</p>
  );
};
export default IngredientsTable;
