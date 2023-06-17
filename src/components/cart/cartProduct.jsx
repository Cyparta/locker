import { Box, Typography } from "@mui/material";
import trash from "../../assets/cart/trash.png";
import productImg from "../../assets/cart/product.png";
import { deleteCart } from "../../store/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import QuantityCart from "./quantityCart";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/foramtPrice";

const CartProduct = ({ id, quantity, product, subtotal_price }) => {
  const { is_wholesale } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { image, product_name, id: productID } = product;
  return (
    <Box sx={{ display: "flex", gap: "19px", mb: "16px" }} key={productID}>
      <Link
        to={`/product/${productID}`}
        aria-label={`read more about ${product_name} product`}
      >
        <Box>
          <img
            src={image || productImg}
            alt={product_name}
            className="cart-img"
          />
        </Box>
      </Link>
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography sx={{ color: "#212121", size: "24px", fontWeight: "600" }}>
          {product_name}{" "}
          <Typography
            component="span"
            variant="span"
            style={{ fontSize: "12px" }}
          >
            {" "}
            <sub>1 Kg</sub>
          </Typography>
        </Typography>
        {!is_wholesale && (
          <Typography
            sx={{
              color: "#CC8648",
              fontWeight: "600",
            }}
          >
            {formatPrice(subtotal_price)} $
          </Typography>
        )}

        <QuantityCart quantity={quantity} id={id} />
      </Box>
      <Box
        sx={{ cursor: "pointer", mt: "8px" }}
        onClick={() => dispatch(deleteCart(id))}
      >
        <img src={trash} alt="trash" />
      </Box>
    </Box>
  );
};

export default CartProduct;
