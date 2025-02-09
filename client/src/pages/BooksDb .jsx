import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Book,
  Numbers as NumbersIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  LibraryBooks as StatusIcon,
  FormatListNumbered as QuantityIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import BackgroundImage from "../assets/homebg.jpg";
import { useNavigate } from "react-router-dom";

export default function BooksDb() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookToRemove, setBookToRemove] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
        setFilteredBooks(response.data); // Initially set filteredBooks to all books
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleRemoveBook = async () => {
    if (!bookToRemove) return;
    try {
      await api.delete(`/books/${bookToRemove.id}`);
      setBooks(books.filter((book) => book.id !== bookToRemove.id));
      setFilteredBooks(
        filteredBooks.filter((book) => book.id !== bookToRemove.id)
      ); // Also update filteredBooks
      setDialogOpen(false);
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  const handleEditBook = (id) => {
    navigate(`/books/edit/${id}`);
  };

  // Handle search
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.id.toString().includes(term)
    );
    setFilteredBooks(filtered);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          pt: 8,
          pb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Book /> Books Database
              </Typography>

              {/* Search Bar */}
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                <TextField
                  label="Search by Title, Author or ID"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearch} // Use handleSearch
                  sx={{ maxWidth: 500 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Loading Spinner */}
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                // Books Table
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <NumbersIcon /> ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Book /> Title
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PersonIcon /> Author
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CategoryIcon /> Genre
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <StatusIcon /> Status
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <QuantityIcon /> Quantity
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.genre}</TableCell>
                          <TableCell>{book.status}</TableCell>
                          <TableCell>{book.quantity}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <IconButton
                                color="primary"
                                onClick={() => handleEditBook(book.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                sx={{ color: "red" }}
                                onClick={() => {
                                  setBookToRemove(book);
                                  setDialogOpen(true);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the book `{bookToRemove?.title}`?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              "&:hover": {
                backgroundColor: "#ccc", // Customize hover color for Cancel button
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemoveBook}
            color="error"
            autoFocus
            sx={{
              "&:hover": {
                backgroundColor: "#ccc", // Customize hover color for Delete button
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
