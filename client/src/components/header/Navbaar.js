import React from "react";
import "./navbaar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
const navbaar = () => {
  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              <img
                src="https://economictimes.indiatimes.com/thumb/msid-59738992,width-640,height-480,resizemode-75,imgsize-25499/amazon.jpg"
                alt="logo"
              />{" "}
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" placeholder="Search Your Products" />
            <div className="search_icon">
              {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
              {/* <i className="fas fa-search" id="search"></i> */}
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">Sign in</NavLink>
          </div>

          <div className="cart_btn">
            <Badge color="secondary">
              {/* <i className="fas fa-shopping-cart" id="icon"></i> */}
              <ShoppingCartIcon id="icon" />
            </Badge>

            <p>Cart</p>
          </div>
          <Avatar className="avtar" />
        </div>
      </nav>
    </header>
  );
};

export default navbaar;

// IconButton className="hamburgur" onClick={handelopen}>
//                         <MenuIcon style={{ color: "#fff" }} />
//                     </IconButton>
//                         {/* here define the right header */}
//                     <Drawer open={dropen} onClose={handleClosedr} >
//                         <Rightheader userlog={logoutuser} logclose={handleClosedr} />
//                     </Drawer>
// {text && (
//   <List className="extrasearch" hidden={liopen}>
//     {products
//       .filter((product) =>
//         product.title.longTitle
//           .toLowerCase()
//           .includes(text.toLowerCase())
//       )
//       .map((product) => (
//         <ListItem>
//           <NavLink
//             to={`/getproductsone/${product.id}`}
//             onClick={() => setLiopen(true)}
//           >
//             {product.title.longTitle}
//           </NavLink>
//         </ListItem>
//       ))}
//   </List>
// )}

// : (
//   <NavLink to="/login">
//     <div className="cart_btn">
//       <Badge badgeContent={0} color="secondary">
//         <i className="fas fa-shopping-cart" id="icon"></i>
//       </Badge>
//       <p>Cart</p>
//     </div>
//   </NavLink>
// )

// {account ? (
//   <Avatar
//     className="avtar2"
//     onClick={handleClick}
//     title={account.fname.toUpperCase()}
//   >
//     {account.fname[0].toUpperCase()}
//   </Avatar>
// ) : (
//   <Avatar className="avtar" onClick={handleClick} />
// )}

// <div className="menu_div">
//   <Menu
//     anchorEl={open}
//     open={Boolean(open)}
//     onClose={handleClose}
//     className={classes.component}
//   >
//     <MenuItem onClick={handleClose} style={{ margin: 10 }}>
//       My account
//     </MenuItem>
//     {account ? (
//       <MenuItem
//         onClick={handleClose}
//         style={{ margin: 10 }}
//         onClick={logoutuser}
//       >
//         <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
//       </MenuItem>
//     ) : (
//       ""
//     )}
//   </Menu>
//  </div>
