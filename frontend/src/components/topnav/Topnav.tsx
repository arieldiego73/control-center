// import Logo from "../../Assets/logo (white).png";
// import User from "../../Assets/userImage.png";
// import TopnavStyle from "./Topnav.module.css";

// export default function TopNav() {
// 	return (
// 		<div className={TopnavStyle.topNavContainer}>
// 			<div className={TopnavStyle.logoContainer}>
// 				<img alt="" src={Logo} />
// 			</div>

// 			<div className={TopnavStyle.userContainer}>
// 				<div className={TopnavStyle.infoContainer}>
// 					<h2 className={TopnavStyle.Username}>Username</h2>
// 					<h4 className={TopnavStyle.Position}> Design Engineer Trainee </h4>
// 				</div>
// 				<div className={TopnavStyle.imageContainer}>
// 					<img alt="" src={User} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import Logo from "../../Assets/logo (white).png";
import User from "../../Assets/userImage.png";
import TopnavStyle from "./Topnav.module.css";
import * as React from "react";
import Menu from "@mui/joy/Menu";
import MenuItem, { menuItemClasses } from "@mui/joy/MenuItem";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListDivider from "@mui/joy/ListDivider";
import Typography, { typographyClasses } from "@mui/joy/Typography";
import Dropdown, { DropdownProps } from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import { Theme } from "@mui/joy";

type MenuBarButtonProps = Pick<DropdownProps, "children" | "open"> & {
  onOpen: DropdownProps["onOpenChange"];
  onKeyDown: React.KeyboardEventHandler;
  menu: JSX.Element;
  onMouseEnter: React.MouseEventHandler;
};

const MenuBarButton = React.forwardRef(
  (
    { children, menu, open, onOpen, onKeyDown, ...props }: MenuBarButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Dropdown open={open} onOpenChange={onOpen}>
        <MenuButton
          {...props}
          slots={{ root: ListItemButton }}
          ref={ref}
          role="menuitem"
          variant={open ? "soft" : "plain"}
        >
          {children}
        </MenuButton>
        {React.cloneElement(menu, {
          slotProps: {
            listbox: {
              id: `toolbar-example-menu-${children}`,
              "aria-label": children,
            },
          },
          placement: "bottom-start",
          disablePortal: false,
          variant: "soft",
         
        })}
      </Dropdown>
    );
  }
);

export default function TopNav() {
  const menus = React.useRef<Array<HTMLButtonElement>>([]);
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);

  const openNextMenu = () => {
    if (typeof menuIndex === "number") {
      if (menuIndex === menus.current.length - 1) {
        setMenuIndex(0);
      } else {
        setMenuIndex(menuIndex + 1);
      }
    }
  };

  const openPreviousMenu = () => {
    if (typeof menuIndex === "number") {
      if (menuIndex === 0) {
        setMenuIndex(menus.current.length - 1);
      } else {
        setMenuIndex(menuIndex - 1);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      openNextMenu();
    }
    if (event.key === "ArrowLeft") {
      openPreviousMenu();
    }
  };

  const createHandleButtonKeyDown =
    (index: number) => (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        if (index === menus.current.length - 1) {
          menus.current[0]?.focus();
        } else {
          menus.current[index + 1]?.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        if (index === 0) {
          menus.current[menus.current.length]?.focus();
        } else {
          menus.current[index - 1]?.focus();
        }
      }
    };

  const itemProps = {
    onClick: () => setMenuIndex(null),
    onKeyDown: handleKeyDown,
  };

  return (
    <div className={TopnavStyle.topNavContainer}>
      <div className={TopnavStyle.logoContainer}>
        <img alt="" src={Logo} />
      </div>

      <div className={TopnavStyle.userContainer}>
        <div className={TopnavStyle.infoContainer}>
          <h2 className={TopnavStyle.Username}>Username</h2>
          <h4 className={TopnavStyle.Position}> Design Engineer Trainee </h4>
        </div>

        <List
          // orientation="horizontal"
          // aria-label="Example application menu bar"
          // role="menubar"
          // data-joy-color-scheme="dark"
        //   sx={{
        //     // bgcolor: "background.body",
        //     border: "1px solid-red",
        //     borderRadius: "20px",
        //     maxWidth: "fit-content",
        //   }}
        >
          <ListItem>
            <MenuBarButton
              open={menuIndex === 2}
              onOpen={() => {
                setMenuIndex((prevMenuIndex) =>
                  prevMenuIndex === null ? 2 : null
                );
              }}
              onKeyDown={createHandleButtonKeyDown(2)}
              onMouseEnter={() => {
                if (typeof menuIndex === "number") {
                  setMenuIndex(2);
                }
              }}
              ref={(instance) => {
                menus.current[2] = instance!;
              }}
              menu={
                <Menu
                  onClose={() => {
                    menus.current[2]?.focus();
                  }}
                >
                  <MenuItem {...itemProps}>Select All</MenuItem>
                  <MenuItem {...itemProps}>Expand Selection</MenuItem>
                  <MenuItem {...itemProps}>Shrink Selection</MenuItem>
                </Menu>
              }
            >
              <div className={TopnavStyle.imageContainer}>
                <img alt="" src={User} />
              </div>
            </MenuBarButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
