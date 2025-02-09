import { Container,Typography } from "@mui/material";
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 text-center shadow-lg backdrop-blur-lg animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-14xl mx-auto">
        {/* Left Side - Brand Name */}
        <Container>
          <Typography variant="body2">
            © {new Date().getFullYear()} Nerdy Archive. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Built with ❤️ by <a href="https://github.com/AdityaDhanarajKundu">Aditya Dhanaraj Kundu</a>
          </Typography>
        </Container>
      </div>
    </footer>
  );
}
