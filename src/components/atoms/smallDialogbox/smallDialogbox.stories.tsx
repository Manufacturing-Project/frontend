import { Smalldialogbox, SmalldialogboxProps } from "./Smalldialogbox";
import { StoryFn } from "@storybook/react";
import { action }   from "@storybook/addon-actions";

export default {
    title: "Components/Atoms/SmallDialogbox",
    component: Smalldialogbox,
    tags: ["autodocs", "dialogbox"],
    argsTypes: {
        open: {
            control: {
                type: "boolean",
                defaultValue: true,
            },
        },
        thing: {
            control: {
                type: "string",
                defaultValue: "Kg",
            },
        },
        onClose: {
            action: "onClose",
        },
        onDelete: {
            action: "onDelete",
        },
        onUpdate: {
            action: "onUpdate",
        },
    }
}

const Template: StoryFn<SmalldialogboxProps> = (args) => <Smalldialogbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    open: true,
    thing: "Kg",
    onClose: action("onClose"),
    onDelete: action("onDelete"),
    onUpdate: action("onUpdate"),
};


