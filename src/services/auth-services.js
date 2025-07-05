import axios from "axios";
import toast from "react-hot-toast";

export const loginHandler = async ({
  e,
  setBtnLoader,
  email,
  password,
  setUserData,
}) => {
  e.preventDefault();
  try {
    setBtnLoader(true);
    const { data, status } = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: { email, password },
    });
    if (status === 200) {
      setBtnLoader(false);
      const userData = { token: data.encodedToken, user: data.foundUser };
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
      toast.success("Successfully Logged in!");
    }
  } catch (error) {
    console.error(error);
    const { status } = error.response;
    if (status === 401) {
      setBtnLoader(false);
      toast.error("Wrong Credentials. Please try again");
    } else if (status === 404) {
      setBtnLoader(false);
      toast.error("User not found. Create new account");
    }
  }
};

export const singupHandler = async ({ e, formData, setUserData }) => {
  e.preventDefault();
  try {
    const { data, status } = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: { ...formData },
    });
    if (status === 201) {
      const userData = { token: data.encodedToken, user: data.createdUser };
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
      toast.success("Successfully Singed up!");
    }
  } catch (e) {
    console.error(e);
    if (e.response.status === 422) {
      toast.error("Account already exist with this email");
    }
  }
};

export const logoutHandler = ({ navigate, setUserData }) => {
  const logoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Logged out successfully!");
    }, 1200);
  });

  logoutPromise.then(() => {
    setUserData({});
    localStorage.removeItem("userData");
    navigate("/videos");
  });

  toast.promise(logoutPromise, {
    loading: "Logging out",
    success: (msg) => msg,
  });
};
