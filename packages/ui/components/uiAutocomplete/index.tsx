import React, { FC } from "react";
import { IAutocompleteData } from "@repo/core/types/autocomplete-data.types";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps
} from "@heroui/autocomplete";

interface Props
  extends Omit<
    AutocompleteProps<any>,
    "onChange" | "children" | "defaultItems" | "selectedKey"
  > {
  onChange: (value: any) => void;
  defaultItems: IAutocompleteData[];
}

export const UiAutocomplete: FC<Props> = ({
  defaultItems,
  onChange,
  value,
  ...rest
}) => {
  return (
    <Autocomplete
      onSelectionChange={val => {
        onChange(val);
      }}
      defaultItems={defaultItems}
      {...rest}
    >
      {defaultItems.map(item => (
        <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
};
