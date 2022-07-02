import React from "react"
import {
   useBoolean,
   Image
} from "@chakra-ui/react"
import { TOAST_STATUSES } from "../../../redux/constants/toast";
import { showToast } from "../../../redux/actions/toast";
import { useDispatch } from "react-redux";

const NFTImage = ({
   handleSelectAdd,
   handleSelectDelete,
   selectedList,
   setSelectedList,
   nftItem,
}) => {
   var [selected, setSelected] = useBoolean();
   const dispatch = useDispatch();

   return (
      <Image
         cursor={'pointer'}
         src={nftItem.imageURL}
         fit={'cover'}
         overflow={'hidden'}
         borderRadius={'6px'}
         width={'200px'}
         height={'200px'}
         border={selected ? '5px var(--chakra-colors-primary-400) solid' : '2px rgba(200, 200, 200, 0.6) solid'}
         onClick={() => {
            if (selectedList.length < 3 || (selectedList.length == 3 && selected == true)) {
               setSelected.toggle();
               console.log(!selected);
               if (!selected == true) {
                  console.log("added item: " + nftItem.tokenID)
                  handleSelectAdd(selectedList, nftItem, setSelectedList);
               }
               else {
                  console.log("removed item: " + nftItem.tokenID)
                  handleSelectDelete(selectedList, nftItem, setSelectedList);
               }
            }
            if (selectedList.length == 3 && selected == false) {
               dispatch(showToast(TOAST_STATUSES.ERROR, "Select a Maximum of 3 NFTs"));
            }
         }}
      />
   )
}

export default NFTImage;