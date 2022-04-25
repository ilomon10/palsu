import { useUser } from "@auth0/nextjs-auth0";
import { Avatar, Button, Divider, Menu, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconLogout } from "@tabler/icons";

export const HeaderProfile = () => {
  const { isLoading, user, error } = useUser();
  if (error) return (<div>{error.message}</div>)
  return (
    <div>
      {user ?
        <Menu
          // size="lg"
          transition="pop-top-right"
          position="bottom"
          placement="end"
          control={<Avatar radius="xl" src={user.picture} />}
        >
          <Menu.Item >Signed as <Text component="span" weight="bold">{user.nickname}</Text></Menu.Item>

          <Divider />

          <Menu.Item
            href="/api/auth/logout"
            color="red"
            component={NextLink}
            icon={<IconLogout size={16} />}>Logout</Menu.Item>
        </Menu> :
        <Button
          loading={isLoading}
          component={NextLink}
          href="/api/auth/login"
          variant="outline">
          Login
        </Button>}
    </div>
  )
}