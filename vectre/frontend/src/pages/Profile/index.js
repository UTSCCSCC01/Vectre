import React from 'react'
import {ReactComponent as LandingRect} from "../../assets/icons/landing-rect.svg";
import {
    Box,
    Button,
    useDisclosure
} from "@chakra-ui/react";

import ProfileEditModal from "../../components/Modals/ProfileEditModal/ProfileEditModal";

const sampleUserData = {
  name: "Peter",
  username: "Deadly Dwarf",
  bio: "I like dragons",
  bgImageURL: "https://s3-alpha-sig.figma.com/img/92a5/e247/d09cfe74949f7e39413b504a39b8a6ab?Expires=1655683200&Signature=BONlGzYP0KMX8C9dpmEmFpEu3sFTFisvtio2I85~ARrJEM~hkOd5558FT8bNT-heKqGjIAh5jxbbnW5cL47PQzOhqMvQNz4Pwa--8-7jlltLQ3dfOMPzXrUoW0SPvaW1ppxsQw9CxEyhnjbd9shOIj1cFLwUgPV5r-HBf9eEMicaTAQ30PN3eOxNSnHXkVZYvohmQe3flMT3GlI-IrVrlcbd2dUcttpLlZKWE-ByhqzLgsFZAwP3VvLyUqSkjqAXilXuTJlQpK8Nepa9-2U6QRdhOJt8iDnwprWoL0EOmSsw-2~agz0JM5rLG5U~XDpk8~SdUf1X7CEgp7X-PZXcmg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  profilePic: "https://s3-alpha-sig.figma.com/img/a8fa/df5e/3d73d21b956a4ddcdd287a204b4ea1a0?Expires=1655683200&Signature=HU~fkoIdFxhBi0fN3DE0jROXrUgLrrcUANO7LV1MpiSGyHQntrmgUKuDu~tPHvKw2WaDY5cz0rBSg~UsSMzCGpZ4A38v4HF7~IdzHdvjBqgXkx2dDigRhMezfi6DH9p38YHJQnHJOz2eduoMR3vPZJQ4UIPm9uZOjczzZUnCx6O~CVKefcmHb8icodO0PiQcPbTUEsnSKf1U4Pu2dgT-tPqGAcPVKOpLOaa8MfyxYk4T8SfpxPjjZGKA9aeWrSdn-xt385i6xTMhR24XIqKxmc59DGbzS7H5U2Oo-g2xDDAj5YUddpKmrdHMhecdqemp3J1ObEDmp-Uv9svqFB0xhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
}

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
      <Box>
          <Box
              bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
              minHeight={'100vh'}>
              <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
                  <LandingRect />
              </Box>
              <Box>
                  <Button onClick={onOpen}>
                      Edit User Profile
                  </Button>
                  <ProfileEditModal isOpen={isOpen} onClose={onClose} userData={sampleUserData} />
              </Box>
          </Box>
      </Box>
  );
};

export default Profile;
