import { AddRawMaterial } from "./AddRawMaterial";

export default {
  title: "Components/Molecules/AddRawMaterial",
  component: AddRawMaterial,
  tags: ["autodocs", "molecules"],
  argsTypes: {
    categoryOption: {
        control: {
            type: "select",
            options: ["option1", "option2"],
        },
        },
        unitOption: {
        control: {
            type: "select",
            options: ["option1", "option2"],
        },
        },
    },
};

const Template = {
    args: {
        categoryOption: "option1",
        unitOption: "option1",
    },
    component: AddRawMaterial,
    
}

export const Default = Template;