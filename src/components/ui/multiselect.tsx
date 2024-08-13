import Loading from "@/app/loading";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type Control, type FieldValues, type Path } from "react-hook-form";
import { Card } from "./card";

export interface MultiselectProps<TData extends FieldValues> {
  control: Control<TData>;
  items: { id: string; label: string }[];
  label?: string;
  description?: string;
  name: Path<TData>;
  loading?: boolean;
}

export function Multiselect<TData extends FieldValues>({
  control,
  items,
  label,
  description,
  name,
  loading,
}: MultiselectProps<TData>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          {description && <FormDescription>{description}</FormDescription>}
          <div className="flex flex-wrap gap-2">
            {loading && <Loading />}
            {items.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <Card key={item.id} className="flex flex-row items-start space-x-3 space-y-0 rounded-lg p-2">
                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value: unknown) => value !== item.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    </Card>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
