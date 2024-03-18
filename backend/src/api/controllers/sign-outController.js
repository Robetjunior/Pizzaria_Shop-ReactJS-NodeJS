exports.signOut = (req, res) => {
  console.log("Signing out");
  res.clearCookie("auth", { path: "/" });
  res.status(200).json({ message: "Successfully signed out" });
};
