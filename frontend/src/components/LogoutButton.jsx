import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
	const setUser = useSetRecoilState(userAtom);
	const showToast = useShowToast();

	
	return (
		<Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} >
			<FiLogOut size={20} />
		</Button>
	);
};

export default LogoutButton;
