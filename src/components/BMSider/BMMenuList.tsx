import useMenu from "./useMenu"
import { List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"

const BMMenuList = ({ className }: MergeWithDefaultProps) => {
  const [current, menuList, changeMenu] = useMenu()

  const active = "linear-gradient(90deg, rgb(255,19,103), rgb(252,61,73))"

  return (
    <List className={className ?? ""}>
      {menuList.map((menu, index) => (
        <div key={menu.key}>
          {menu.isFoldable ? (
            <></>
          ) : (
            <>
              {menu.list.map((item) => (
                <ListItemButton
                  key={item.key}
                  onClick={() => changeMenu(item)}
                  selected={current === item.key}
                  sx={{
                    borderRadius: "0.5rem",
                    margin: "0.25rem 1.5rem",
                    padding: "0.25rem 0.5rem",
                    color: "rgb(100,116,139)",
                    "&:hover": {
                      bgcolor: "rgb(228,232,236)",
                    },
                    "&.Mui-selected": {
                      background: active,
                      color: "white",
                    },
                    transition: "none",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "1.5rem",
                    }}
                  ></ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      color: "inherit",
                    }}
                    primaryTypographyProps={{ fontSize: "0.875rem" }}
                  />
                </ListItemButton>
              ))}
              {index < menuList.length - 1 && (
                <Divider
                  variant="middle"
                  sx={{
                    margin: "1.5rem",
                    backgroundColor: "rgb(228,232,236)",
                  }}
                />
              )}
            </>
          )}
        </div>
      ))}
    </List>
  )
}

export default BMMenuList
