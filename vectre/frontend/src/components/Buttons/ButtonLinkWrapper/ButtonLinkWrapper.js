import { Link } from '@chakra-ui/react'

const ButtonLinkWrapper = ({
    href,
    ...otherProps
}) => {
    return (
        <Link
            href={href ? href : '/'}
            _hover={{ textDecoration: "none" }}>
            {otherProps.children}
        </Link>
    );
};

export default ButtonLinkWrapper;
