import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/booksq.jpg";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/books");
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Fetch the genres for filtering
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await api.get("/books/categories");
        setGenres(data.map((genreData) => genreData.genre));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch user borrowed books
  useEffect(() => {
    const fetchUserBorrowedBooks = async () => {
      try {
        const { data } = await api.get("/books/borrowed-books");
        setUserBorrowedBooks(data.borrowedBookIds);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };
    fetchUserBorrowedBooks();
  }, []);

  // Handle borrowing a book
  const handleBorrow = async (bookId) => {
    try {
      const {data} = await api.post("/transactions/borrow",{bookId});
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                quantity: book.quantity - 1,
                status: book.quantity - 1 === 0 ? "borrowed" : "available",
              }
            : book
        )
      );
      setUserBorrowedBooks((prev) => [...prev,bookId]);
      console.log("Borrowed Book:", data.transaction);
      alert("Book borrowed successfully");
    } catch (error) {
      console.error(
        "Error borrowing book:",
        error.response?.data || error.message
      );
    }
  };

  // Handle returning a book
  const handleReturn = async (bookId) => {
    try {
      const {data} = await api.post("/transactions/return",{bookId});
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? { ...book, quantity: book.quantity + 1, status: "available" }
            : book
        )
      );

      setUserBorrowedBooks((prev) => prev.filter((id) => id !== bookId));

      if (data.fine > 0) {
        alert(`Book returned successfully. Fine incurred: $${data.fine}`);
      } else {
        alert("Book returned successfully");
      }

      console.log("Return Transaction:", data.transaction);
    } catch (error) {
      console.error(
        "Error returning book:",
        error.response?.data || error.message
      );
    }
  };

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    console.log("User Borrowed Books:", userBorrowedBooks);
  }, [userBorrowedBooks]);

  useEffect(() => {
    console.log("Books:", books);
  }, [books]);

  // Filter books based on search, genre, and active tab
const filteredBooks = books.filter((book) => {
  const matchesSearch =
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase());
  const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
  const matchesTab =
    activeTab === 1
      ? userBorrowedBooks.includes(book.id)
      : true;
  return matchesSearch && matchesGenre && matchesTab;
});


  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Section */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar
          sx={{
            height: "100vh", // Ensure full height
            position: "sticky", // Make it stay fixed
            top: 0, // Start from the top
          }}
        />

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: "200px",
            marginTop: "70px",
            display: "flex",
            flexDirection: "column",
            padding: 3,
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Tabs for "All Books" and "Borrowed Books" */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
              "& .MuiTab-root": {
                fontSize: "1.4rem", // Increase tab font size
                fontWeight: "bold", // Make text bold
                color: "WHITE", // White font color
              },
              "& .Mui-selected": {
                color: "yellow", // Highlight selected tab in yellow
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "yellow", // Yellow underline for active tab
              },
            }}
          >
            <Tab label="All Books" />
            <Tab label="Borrowed Books" />
          </Tabs>

          {/* Search and Genre Filter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              p: 2,
              borderRadius: 2,
            }}
          >
            <TextField
              label="Search Books"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                label="Genre"
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => {
                setSearch("");
                setSelectedGenre("");
              }}
            >
              Reset
            </Button>
          </Box>
          {/* Books List */}
          <Grid container spacing={3} sx={{ mt: 2 }} pb={"80px"}>
            {filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} lg={3} md={4} key={book.id}>
                <Card
                  sx={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)", // Lifts and enlarges the card slightly
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)", // Soft shadow for a 3D lift effect
                    },
                    borderRadius: "16px", // Rounded corners for a modern look
                    minHeight: "350px"
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      book.thumbnailPath
                        ? `http://localhost:5000/uploads/thumbnails/${book.thumbnailPath
                            .split("\\")
                            .pop()}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={book.title}
                  />
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Genre: {book.genre || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={book.status === "borrowed" ? "error" : "primary"}
                    >
                      {book.status === "borrowed" ? "Borrowed" : "Available"}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/books/${book.id}`}
                      >
                        View Details
                      </Button>
                      {userBorrowedBooks.includes(book.id) ? (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleReturn(book.id)}
                        >
                          Return
                        </Button>
                      ) : book.status === "available" ? (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleBorrow(book.id)}
                        >
                          Borrow
                        </Button>
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer
        sx={{
          marginTop: "auto", // Push the footer to the bottom
        }}
      />
    </Box>
  );
}
