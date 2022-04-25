import { useUser } from "@auth0/nextjs-auth0"
import { Avatar, Button, Container, Divider, Menu, Text } from "@mantine/core"
import { NextLink } from "@mantine/next"
import { IconLogout } from "@tabler/icons"
import Link from "next/link"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { HeaderProfile } from "./HeaderProfile"

export const Header = () => {
  return (
    <Container>
      <Flex align={"center"} py="xs">
        <Box grow>
          <Text>PALSU</Text>
        </Box>
        <Box>
          <HeaderProfile />
        </Box>
      </Flex>
    </Container>
  )
}