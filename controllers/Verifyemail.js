const User = require("../models/User");
const verifyemail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
}
 module.exports ={verifyemail}
