import { AppIcon } from "./AppIcon";
import MapMarkerSVG from "../../assets/icon/map-marker.svg";
import VKSVG from "../../assets/icon/vk.svg";
import LeafSVG from "../../assets/icon/leaf.svg";
import ArrowSVG from "../../assets/icon/arrow.svg";

export default {
	title: "shared/AppIcon",
	component: AppIcon,
	tags: ["autodocs"],
};

export const Normal = {
	args: {
		Svg: MapMarkerSVG,
	},
};

export const Size_M = {
	args: {
		Svg: VKSVG,
		size: "24",
		clickable: true,
	},
};

export const Size_L = {
	args: {
		Svg: LeafSVG,
		size: "44",
		color: "primary",
	},
};

export const Other = {
	args: {
		Svg: ArrowSVG,
		color: "secondary",
	},
};
