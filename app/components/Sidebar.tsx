import React from "react";
import Drawer from "@mui/material/Drawer";


const SidebarComponent = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open={true}
      onClose={() => {}}
    >
      <DrawerHeader>Sidebar</DrawerHeader>
      <DrawerBody>
        <DrawerContent>
          <DrawerItem href="/home">Home</DrawerItem>
          <DrawerItem href="/about">About</DrawerItem>
          <DrawerItem href="/contact">Contact</DrawerItem>
        </DrawerContent>
      </DrawerBody>
      <DrawerFooter>Footer</DrawerFooter>
    </Drawer>
  );
};

export default SidebarComponent;
