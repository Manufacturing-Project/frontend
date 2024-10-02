import { AddRawMaterial } from "./AddRawMaterial";
import { Provider } from "react-redux";
import { store } from "../../../store"; // Adjust the path as needed
import { Meta, StoryFn} from '@storybook/react'; // Import StoryFn and Meta

export default {
    title: "Components/Molecules/AddRawMaterial",
    component: AddRawMaterial,
    tags: ["autodocs", "molecules"],
    argTypes: {
        categoryoption: {
            control: {
                type: "array",
            },
        },
        unitoption: {
            control: {
                type: "array",
            },
        },
        onsubmit: { action: "submitted" },
    },
}  

const Template: StoryFn<any> = (args: any) => (
  <Provider store={store}>
    <AddRawMaterial {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {
  categoryoption: [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
  ],
  unitoption: [
    { id: "1", name: "Unit 1" },
    { id: "2", name: "Unit 2" },
  ],
  onsubmit: (m_name: any, m_code: any, category: any, unit: any, reorderlevel: any, description: any) => {
    console.log("Form submitted with values:", {
      m_name,
      m_code,
      category,
      unit,
      reorderlevel,
      description,
    });
  },
};
