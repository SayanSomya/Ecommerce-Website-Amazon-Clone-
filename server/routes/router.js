const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
// const authenicate = require("../middleware/authenticate");

// get the productsdata api

router.get("/getproducts", async (req, res) => {
  try {
    const producstdata = await Products.find();
    // console.log(producstdata);
    res.status(201).json(producstdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// getindividual

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const individualdata = await Products.findOne({ id: id });
    console.log(individualdata);

    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(error);
    console.log("error" + error.message);
  }
});
// register data
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(420).json({ error: "fill all the required details" });
    
  }
  else{
 
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(421).json({ error: "This user already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password not matching" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // hashing done here in userSchema

      const storedata = await finalUser.save();
      console.log(storedata);
      res.status(201).json(storedata);
    }
    }
});


// login data
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
  }

  // try {
    const userlogin = await USER.findOne({ email: email });
    // console.log(userlogin);
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch + "pass match");
      const token = await userlogin.generatAuthtoken();
      console.log(token);

      res.cookie("E-Commerce", token,{
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        })

      if (!isMatch) {
        res.status(400).json({ error: "invalid crediential" });
      } else {
          res.status(201).json(userlogin);
        };
        
    } else {
      res.status(400).json({ error: "invalid crediential" });
    // }
  // } catch (error) {
    // res.status(400).json({ error: "invalid crediential passed" });
    // console.log("error occurred during login" + error.message);
  }
});


// // adding the data into cart
// router.post("/addcart/:id", authenicate, async (req, res) => {

//     try {
//         console.log("perfect 6");
//         const { id } = req.params;
//         const cart = await products.findOne({ id: id });
//         console.log(cart + "cart milta hain");

//         const Usercontact = await User.findOne({ _id: req.userID });
//         console.log(Usercontact + "user milta hain");

//         if (Usercontact) {
//             const cartData = await Usercontact.addcartdata(cart);

//             await Usercontact.save();
//             console.log(cartData + " thse save wait kr");
//             console.log(Usercontact + "userjode save");
//             res.status(201).json(Usercontact);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });

// // get data into the cart
// router.get("/cartdetails", authenicate, async (req, res) => {
//     try {
//         const buyuser = await User.findOne({ _id: req.userID });
//         console.log(buyuser + "user hain buy pr");
//         res.status(201).json(buyuser);
//     } catch (error) {
//         console.log(error + "error for buy now");
//     }
// });

// // get user is login or not
// router.get("/validuser", authenicate, async (req, res) => {
//     try {
//         const validuserone = await User.findOne({ _id: req.userID });
//         console.log(validuserone + "user hain home k header main pr");
//         res.status(201).json(validuserone);
//     } catch (error) {
//         console.log(error + "error for valid user");
//     }
// });

// // for userlogout

// router.get("/logout", authenicate, async (req, res) => {
//     try {
//         req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
//             return curelem.token !== req.token
//         });

//         res.clearCookie("eccomerce", { path: "/" });
//         req.rootUser.save();
//         res.status(201).json(req.rootUser.tokens);
//         console.log("user logout");

//     } catch (error) {
//         console.log(error + "jwt provide then logout");
//     }
// });

// // item remove ho rhi hain lekin api delete use krna batter hoga
// // remove iteam from the cart

// router.get("/remove/:id", authenicate, async (req, res) => {
//     try {
//         const { id } = req.params;

//         req.rootUser.carts = req.rootUser.carts.filter((curel) => {
//             return curel.id != id
//         });

//         req.rootUser.save();
//         res.status(201).json(req.rootUser);
//         console.log("iteam remove");

//     } catch (error) {
//         console.log(error + "jwt provide then remove");
//         res.status(400).json(error);
//     }
// });

module.exports = router;
