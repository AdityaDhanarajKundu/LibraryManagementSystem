import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import {
  CloudUpload as UploadFile,
  AddPhotoAlternate,
} from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/homebg.jpg";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    quantity: 1,
    status: "available",
  });
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const {data} = await api.get(`/books/${id}`);
        setFormData({
          title: data.title,
          author: data.author,
          genre: data.genre,
          description: data.description,
          quantity: data.quantity,
          status: data.status,
        });
      } catch (error) {
        setError("Failed to fetch book details.", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const bookData = new FormData();
    bookData.append("title", formData.title);
    bookData.append("author", formData.author);
    bookData.append("genre", formData.genre);
    bookData.append("description", formData.description);
    bookData.append("quantity", formData.quantity);
    bookData.append("status", formData.status);
    if (file) bookData.append("file", file);
    if (thumbnail) bookData.append("thumbnail", thumbnail);

    setLoading(true);

    try{
        const response = await api.put(`/books/${id}`, bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess(response.data.message);
        setTimeout(()=> navigate("/books"), 1500);
    }catch(error){
        setError(error.response?.data?.message || "Failed to update book.");
    }finally{
        setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          paddingTop: "80px",
          paddingBottom: "60px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            padding: 4,
            maxWidth: 600,
            width: "100%",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              <strong>Update Book Details</strong>
            </Typography>
            <IconButton onClick={() => navigate("/books")}>
              <CloseIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>

          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                  select
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="borrowed">Borrowed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<UploadFile />}
                >
                  Upload Book File (PDF)
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </Button>
                {file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    File: {file.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<AddPhotoAlternate />}
                >
                  Upload Thumbnail (Image)
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                </Button>
                {thumbnail && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Thumbnail: {thumbnail.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <SaveIcon />
                  }
                >
                  {loading ? "Updating..." : "Update Book"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
