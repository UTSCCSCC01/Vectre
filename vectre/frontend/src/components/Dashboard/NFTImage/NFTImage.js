import React from "react"
import {
   useBoolean,
   Image
} from "@chakra-ui/react"

const NFTImage = ({
   handleSelectAdd,
   handleSelectDelete,
   selectedList,
   setSelectedList,
   nftItem,
}) => {
   var [selected, setSelected] = useBoolean();
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
         }
      />
   )
}

export default NFTImage;