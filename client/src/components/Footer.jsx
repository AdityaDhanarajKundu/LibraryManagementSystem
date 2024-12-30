import { Typography, Box, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        bottom: 0,
        left: 0,
        width: "100%",
        position: "fixed",
        zIndex: 2,
        backgroundColor: "#81d4fa", // Vibrant sky blue background
        py: 2,
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body2" color="black">
        {" "}
        {/* Dark blue text */}
        &copy; 2024 Nerdy Archive - eBook Library. All rights reserved.
      </Typography>
      <Typography variant="body2" color="black">
        {" "}
        {/* Dark blue text */}
        Made by{" "}
        <Link
          href="https://github.com/AdityaDhanarajKundu"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            fontStyle: "italic",
            color: "black", 
            ":hover": {
              color: "#0288d1",
            },
          }}
        >
          Aditya Dhanaraj Kundu
        </Link>
      </Typography>
    </Box>
  );
}
