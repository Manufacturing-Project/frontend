import { MaterialPage } from "./MaterialPage";
import { Provider } from "react-redux";
import { store } from "../../../store"; 
import { StoryFn} from '@storybook/react'; 

export default {
    title: "Pages/Registration/MaterialPage",
    component: MaterialPage,
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
    },
}  

const Template: StoryFn<any> = (args: any) => (
  <Provider store={store}>
    <MaterialPage {...args} />
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
  
};
