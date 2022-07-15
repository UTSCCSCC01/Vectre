import { Link } from '@chakra-ui/react'

const ButtonLinkWrapper = ({
    display,
    href,
    isExternal,
    ...otherProps
}) => {
    return (
        <Link
            href={href ? href : '/'}
            display={display ? display : 'inline-flex'}
            _hover={{ textDecoration: "none" }}
            isExternal={isExternal ? isExternal : false}>
            {otherProps.children}
        </Link>
    );
};

export default ButtonLinkWrapper;
