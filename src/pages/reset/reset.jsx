import { Container, Box, Typography, InputLabel, Button } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";

import { CardSign, InputField } from "../../shared/style";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  newPassword,
} from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";

const crumbs = [
  { label: "Home", link: "/", active: false },
  { label: "reset password", link: "/reset", active: true },
];

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, uid } = useParams();
  const handleNewPassword = (e) => {
    e.preventDefault();
    dispatch(
      newPassword({ uid, token, new_password: formik.values.new_password })
    ).then((result) => {
        if (result.type === 'newPassword/fulfilled') {
            navigate("/login")
        }
    });
  };
  const formik = useFormik({
    initialValues: {
      new_password: "",
      password2:""
    },
    validationSchema: Yup.object().shape({
      new_password: Yup.string()
        .required("Please enter password")
        .min(8, "Password is too short - should be 8 chars minimum."),
        password2: Yup.string().oneOf(
        [Yup.ref("new_password"), null],
        "Passwords must match"
      ),
    }),
  });


  return (
    <Container>
      {/* hero title */}
      <Box mt="32px">
        <HeroTitle crumbs={crumbs} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "30px",
        }}
      >
        <CardSign>
          <Box>
            <form onSubmit={handleNewPassword}>
              {/* second step */}
              <>
                <Box mb="20px">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <InputLabel
                      sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                    >
                      New Password
                    </InputLabel>
                  </Box>
                  <InputField
                    label=""
                    variant="outlined"
                    id="new_password"
                    name="new_password"
                    type="password"
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.new_password && formik.errors.new_password ? (
                    <Typography
                      component="span"
                      sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                    >
                      {formik.errors.new_password}
                    </Typography>
                  ) : null}
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <InputLabel
                      sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                    >
                      Confirm Password
                    </InputLabel>
                  </Box>
                  <InputField
                    label=""
                    variant="outlined"
                    id="password"
                    name="password2"
                    type="password"
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password2 && formik.errors.password2 ? (
                    <Typography
                      component="span"
                      sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                    >
                      {formik.errors.password2}
                    </Typography>
                  ) : null}
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "center", mt: "21px" }}
                >
                  <Button
                    type="submit"
                    sx={{
                      background:
                        "linear-gradient(114.83deg, #6E2E02 -19.62%, #CC8648 100%)",
                      color: "#fff",
                      width: "80%",
                      borderRadius: "10px",
                      padding: "12px 0",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                      letterSpacing: "-0.24px",
                    }}
                  >
                    Reset Password
                  </Button>
                </Box>
              </>
            </form>
          </Box>
        </CardSign>
      </Box>
    </Container>
  );
};

export default Reset;
