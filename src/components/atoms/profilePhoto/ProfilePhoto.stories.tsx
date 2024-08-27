import { ProfilePhoto } from "./ProfilePhoto";
import ProfileIcon from '../../../assets/user.png';

export default {
  title: "ProfilePhoto",
  component: ProfilePhoto,
};
 

const Template = {
    args: { 
        src: ProfileIcon,
        alt: 'John Smith'
    }, 
    component: ProfilePhoto,
}  

export const Default = Template;