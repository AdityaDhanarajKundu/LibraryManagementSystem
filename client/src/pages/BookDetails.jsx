import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/homebg.jpg";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);
  const [openPdf, setOpenPdf] = useState(false); // To control the modal
  const [pdfUrl, setPdfUrl] = useState(null); // To store the PDF URL

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await api.get(`/books/${id}`);
        setBook(data);
        const borrowedBooks = await api.get("/books/borrowed-books");
        console.log(borrowedBooks.data);
        setUserBorrowedBooks(borrowedBooks.data.borrowedBookIds);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  async function handleBorrow() {
    try {
      const { data } = await api.post("/transactions/borrow", { bookId: id });
      console.log("Borrowed Book:", data.transaction);
      setBook((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
        status: prev.quantity - 1 === 0 ? "borrowed" : "available",
      }));
      setUserBorrowedBooks((prev) => [...prev, Number(id)]);
      alert("Book borrowed successfully.");
    } catch (error) {
      console.error(
        "Error borrowing book:",
        error.response?.data || error.message
      );
    }
  }

  async function handleReturn() {
    try {
      const { data } = await api.post("/transactions/return", { bookId: id });
      setBook((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
        status: "available",
      }));
      setUserBorrowedBooks((prev) =>
        prev.filter((bookId) => bookId !== Number(id))
      );

      if (data.fine > 0) {
        alert(`Book returned successfully. Fine incurred: $${data.fine}`);
      } else {
        alert("Book returned successfully.");
      }
    } catch (error) {
      console.error(
        "Error returning book:",
        error.response?.data || error.message
      );
    }
  }

  const isBorrowedByUser = userBorrowedBooks.includes(Number(id));

  // Open the PDF modal when clicking "Read Online"
  const handleReadOnline = async () => {
    try {
      const { data } = await api.get(`/files/download/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(data);
      setPdfUrl(url); // Set the PDF blob URL
      setOpenPdf(true); // Open the modal to display PDF
    } catch (error) {
      console.error("Error opening the file:", error);
      alert("Failed to open the book. Please try again.");
    }
  };

  const closePdf = () => {
    setOpenPdf(false);
    setPdfUrl(null); // Reset the PDF URL when closing the modal
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!book) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h6" color="error">
          Book not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 900,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: 3,
            boxShadow: 3,
            padding: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Section: Book Thumbnail */}
          <CardMedia
            component="img"
            sx={{
              flex: 1,
              height: "100%",
              maxHeight: 600,
              borderRadius: 2,
            }}
            image={
              book.thumbnailPath
                ? `http://localhost:5000/uploads/thumbnails/${book.thumbnailPath
                    .split("\\")
                    .pop()}`
                : "https://via.placeholder.com/300x400"
            }
            alt={book.title}
          />

          {/* Right Section: Text Details */}
          <Box sx={{ flex: 1, padding: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <IconButton
                component={Link}
                to="/books"
                sx={{ marginRight: 1, color: "primary.main" }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" fontWeight="bold">
                Book Details
              </Typography>
            </Box>

            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Author: {book.author}
              </Typography>
              <Typography variant="body1" paragraph>
                {book.description || "No description available."}
              </Typography>
              <Typography variant="body1">
                <strong>Genre:</strong> {book.genre || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Quantity Available:</strong> {book.quantity}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: book.status === "borrowed" ? "red" : "green",
                  }}
                >
                  {book.status === "borrowed" ? "Borrowed" : "Available"}
                </span>
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {isBorrowedByUser ? (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF7043", // Custom orange color
                      "&:hover": {
                        backgroundColor: "#E64A19", // Darker shade on hover
                      },
                    }}
                    onClick={handleReturn}
                  >
                    Return Book
                  </Button>
                ) : (
                  book.status === "available" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBorrow}
                    >
                      Borrow Book
                    </Button>
                  )
                )}
                {book.filePath && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleReadOnline}
                  >
                    Read Online
                  </Button>
                )}
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>

      {/* Footer */}
      <Footer />

      {/* PDF Modal */}
      <Dialog open={openPdf} onClose={closePdf} maxWidth="lg" fullWidth>
        <DialogTitle>Read Book</DialogTitle>
        <DialogContent>
          {pdfUrl && (
            <Document file={pdfUrl}>
              <Page pageNumber={1} />
            </Document>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closePdf} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
